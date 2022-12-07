import { useContext, useEffect, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormControl, Stack, TableRow, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useHotkeys } from 'react-hotkeys-hook';
import AppContext from '../../../pages/AppContext';
import SheetHeader from '../../DataSheet/SheetHeader';
import SheetBody from '../../DataSheet/SheetBody';
import SheetCell from '../../DataSheet/SheetCell';
import WrappedText from '../../DataSheet/WrappedText';
import SheetPagination from '../../DataSheet/SheetPagination';
import Block from '../../../styles/Block';
import { createAddOperationPatch, getPagedData } from '../../../helpers/app-utils';
import { moveItemToFront } from '../../../helpers/array-utils';
import { getRows, getEffectiveValue, getColumnLabel, getColumnType, getPermissibleValues, getColumnDescription, getColumnName, hasPermissibleValues } from '../../../helpers/data-utils';
import HeaderWithBatchInput from '../header-with-batch-input';
import HeaderWithFilter from '../header-with-filter';
import InfoTooltip from '../info-tooltip';
import { ButtonBox, CancelButton, DataSheetCard, FooterBox, SaveButton, SheetTable, SheetTableContainer } from '../styled';
import { getFilteredData, initUserInput } from './function';
import { REPAIR_INCOMPLENESS_PATH } from '../../../constants/Router';
import SearchableSelector from '../../DataSheet/SearchableSelector';
import { LIGHT_RED } from '../../../constants/Color';
import InputField from '../../DataSheet/InputField';

const RepairIncompletnessTable = ({ targetColumn, incompletenessReporting }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { key } = location.state;
  const { appData, patches, setPatches } = useContext(AppContext);
  const { schema, data } = appData;

  const [userInput, setUserInput] = useImmer({});
  const [batchInput, setBatchInput] = useState('');
  const [staleBatch, setStaleBatch] = useState(false);
  const [columnFilters, setColumnFilters] = useImmer([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { enqueueSnackbar } = useSnackbar();

  const columns = Object.keys(schema.columns);
  const columnOrder = useMemo(
    () => moveItemToFront(targetColumn, columns),
    [targetColumn],
  );

  const badRows = useMemo(
    () => incompletenessReporting.map(
      (reportItem) => reportItem.row,
    ),
    [incompletenessReporting],
  );
  const tableData = useMemo(
    () => badRows.map(
      (row) => data[row],
    ),
    [badRows, data],
  );
  useEffect(
    () => {
      const existingUserInput = initUserInput(badRows, targetColumn, patches);
      setUserInput(existingUserInput);
      return () => setColumnFilters([]);
    },
    [tableData, patches],
  );

  const filteredData = useMemo(
    () => getFilteredData(tableData, columnFilters),
    [tableData, columnFilters],
  );

  useEffect(
    () => {
      if (batchInput !== '' && !staleBatch) {
        const rows = getRows(filteredData);
        setUserInput((prevUserInput) => {
          // eslint-disable-next-line no-param-reassign
          rows.forEach((row) => { prevUserInput[row] = batchInput; });
        });
      }
      return () => setStaleBatch(true);
    },
    [filteredData, batchInput, staleBatch],
  );

  const pagedData = useMemo(
    () => getPagedData(filteredData, page, rowsPerPage),
    [filteredData, page, rowsPerPage],
  );

  const handleSaveChanges = () => {
    Object.keys(userInput)
      .forEach((row) => {
        const value = userInput[row];
        if (typeof value !== 'undefined') {
          const patch = createAddOperationPatch(row, targetColumn, value);
          setPatches((existingPatches) => {
            // eslint-disable-next-line no-param-reassign
            existingPatches[row][targetColumn] = patch;
          });
        }
      });
    enqueueSnackbar('Changes are saved!', { variant: 'success' });
  };
  const saveChanges = useHotkeys(
    ['ctrl+s', 'meta+s'],
    () => handleSaveChanges(),
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
    [userInput],
  );
  return (
    <>
      <DataSheetCard>
        <SheetTableContainer>
          <SheetTable stickyHeader>
            <SheetHeader>
              {columnOrder.map((column, index) => {
                let component;
                if (index === 0) {
                  component = (
                    <HeaderWithBatchInput
                      key={`batch-input-${key}-${column}`}
                      id={`batch-input-${key}-${column}`}
                      label={getColumnLabel(column, schema)}
                      description={getColumnDescription(column, schema)}
                      type={getColumnType(column, schema)}
                      permissibleValues={getPermissibleValues(column, schema)}
                      setBatchInput={setBatchInput}
                      setStaleBatch={setStaleBatch}
                    />
                  );
                } else {
                  component = (
                    <HeaderWithFilter
                      key={`filter-${key}-${column}`}
                      id={`filter-${key}-${column}`}
                      name={getColumnName(column, schema)}
                      label={getColumnLabel(column, schema)}
                      description={getColumnDescription(column, schema)}
                      setColumnFilters={setColumnFilters}
                      setStaleBatch={setStaleBatch}
                    />
                  );
                }
                return component;
              })}
            </SheetHeader>
            <SheetBody>
              {pagedData.map((rowData) => {
                // eslint-disable-next-line dot-notation
                const row = rowData['_id'];
                return (
                  <TableRow key={`row-${row}`}>
                    {columnOrder.map((column, index) => {
                      let component;
                      if (index === 0) {
                        component = (
                          <SheetCell key={`cell-${key}-${column}`} sx={{ zIndex: 998 }} sticky>
                            <FormControl fullWidth>
                              {hasPermissibleValues(column, schema)
                                ? (
                                  <SearchableSelector
                                    value={userInput[row] || ''}
                                    options={getPermissibleValues(column, schema)}
                                    onChange={(event, newValue) => {
                                      setUserInput((currentUserInput) => {
                                        // eslint-disable-next-line no-param-reassign
                                        currentUserInput[row] = newValue;
                                      });
                                    }}
                                    colorOnEmpty={LIGHT_RED}
                                  />
                                )
                                : (
                                  <InputField
                                    required
                                    value={userInput[row] || ''}
                                    type={getColumnType(column, schema)}
                                    inputRef={saveChanges}
                                    onChange={(event) => {
                                      const newValue = event.target.value;
                                      setUserInput((currentUserInput) => {
                                        // eslint-disable-next-line no-param-reassign
                                        currentUserInput[row] = newValue;
                                      });
                                    }}
                                    colorOnEmpty={LIGHT_RED}
                                  />
                                )}
                            </FormControl>
                          </SheetCell>
                        );
                      } else {
                        component = (
                          <SheetCell
                            key={`cell-${key}-${column}`}
                            id={`cell-${key}-${column}`}
                            align="right"
                          >
                            <WrappedText
                              text={getEffectiveValue(row, column, data, patches)}
                            />
                          </SheetCell>
                        );
                      }
                      return component;
                    })}
                  </TableRow>
                );
              })}
            </SheetBody>
          </SheetTable>
        </SheetTableContainer>
        <FooterBox>
          <Block sx={{ width: '400px', paddingLeft: '5px' }}>
            <Stack direction="row" gap={1}>
              <InfoTooltip
                title="INSTRUCTION: The table below shows all the metadata records with missing required
                values. Please fill out the missing value using the input field on each metadata record,
                or using the table header input field to enter in a batch mode."
                placement="right"
                arrow
              >
                <HelpIcon color="primary" fontSize="medium" />
              </InfoTooltip>
              <Typography>Help Tooltip</Typography>
            </Stack>
          </Block>
          <SheetPagination
            data={filteredData}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </FooterBox>
      </DataSheetCard>
      <ButtonBox>
        <CancelButton
          variant="outlined"
          onClick={() => navigate(`../${REPAIR_INCOMPLENESS_PATH}`)}
        >
          Cancel
        </CancelButton>
        <SaveButton
          variant="contained"
          onClick={handleSaveChanges}
        >
          Save
        </SaveButton>
      </ButtonBox>
    </>
  );
};

RepairIncompletnessTable.propTypes = {
  targetColumn: PropTypes.string.isRequired,
  incompletenessReporting: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.number.isRequired,
      column: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      suggestion: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      errorType: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default RepairIncompletnessTable;
