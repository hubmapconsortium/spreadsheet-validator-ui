import { useContext, useEffect, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import { useNavigate } from 'react-router-dom';
import { Stack, TableRow, Typography } from '@mui/material';
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
import Flex from '../../../styles/Panel';
import { createAddOperationPatch, generateRepairTableData, getPagedData } from '../../../helpers/app-utils';
import { moveItemToFront } from '../../../helpers/array-utils';
import { getRows, getColumnLabel, getColumnType, getPermissibleValues, getColumnDescription, getColumnName, isColumnRequired } from '../../../helpers/data-utils';
import HeaderWithBatchInput from '../header-with-batch-input';
import HeaderWithFilter from '../header-with-filter';
import StickySheetCell from '../sticky-sheet-cell';
import InfoTooltip from '../info-tooltip';
import { ButtonPanel, CancelButton, DataSheetCard, FooterPanel, SaveButton, SheetTable, SheetTableContainer } from '../styled';
import { getFilteredData, initUserInput } from './function';
import { COMPLETENESS_ERROR_PATH } from '../../../constants/Router';
import Container from '../../../styles/Container';

const CompletenessErrorRepairTable = ({ targetColumn, errorReport }) => {
  const navigate = useNavigate();
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
    () => errorReport.map(
      (reportItem) => reportItem.row,
    ),
    [errorReport],
  );
  const tableData = useMemo(
    () => generateRepairTableData(errorReport, data, patches),
    [errorReport, data, patches],
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
        if (isColumnRequired(targetColumn, schema)) {
          if (value !== null) {
            const patch = createAddOperationPatch(row, targetColumn, value);
            setPatches((existingPatches) => {
              // eslint-disable-next-line no-param-reassign
              existingPatches[row][targetColumn] = patch;
            });
          } else {
            setPatches((existingPatches) => {
              // eslint-disable-next-line no-param-reassign
              delete existingPatches[row][targetColumn];
            });
          }
        } else {
          const patch = createAddOperationPatch(row, targetColumn, value);
          setPatches((existingPatches) => {
            // eslint-disable-next-line no-param-reassign
            existingPatches[row][targetColumn] = patch;
          });
        }
      });
    enqueueSnackbar('Changes are saved!', { variant: 'success' });
  };

  const saveChangesHotKeys = useHotkeys(
    ['ctrl+s', 'meta+s'],
    () => handleSaveChanges(),
    {
      preventDefault: true,
      enableOnFormTags: true,
    },
    [userInput],
  );
  return (
    <Container>
      <DataSheetCard>
        <SheetTableContainer>
          <SheetTable stickyHeader>
            <SheetHeader>
              {columnOrder.map((column, index) => {
                let component;
                if (index === 0) {
                  component = (
                    <HeaderWithBatchInput
                      key={`header-with-batch-input-on-${column}-to-repair-${targetColumn}`}
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
                      key={`header-with-filter-on-${column}-to-repair-${targetColumn}`}
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
              {pagedData.map((record) => {
                const row = record.rowNumber;
                return (
                  <TableRow key={`table-row-on-${row}-to-repair-${targetColumn}`}>
                    {columnOrder.map((column, index) => {
                      let component;
                      if (index === 0) {
                        component = (
                          <StickySheetCell
                            id={`sheet-cell-on-${column}-${row}-to-repair-${targetColumn}`}
                            row={row}
                            value={userInput[row] || ''}
                            type={getColumnType(column, schema)}
                            permissibleValues={getPermissibleValues(column, schema)}
                            inputRef={saveChangesHotKeys}
                            setUserInput={setUserInput}
                          />
                        );
                      } else {
                        component = (
                          <SheetCell
                            key={`sheet-cell-on-${column}-${row}-to-repair-${targetColumn}`}
                            align="right"
                          >
                            <WrappedText
                              text={record[column]}
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
        <FooterPanel>
          <Flex sx={{ width: '400px', paddingLeft: '5px' }}>
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
          </Flex>
          <SheetPagination
            data={filteredData}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
          />
        </FooterPanel>
      </DataSheetCard>
      <ButtonPanel>
        <CancelButton
          variant="outlined"
          onClick={
            () => navigate(`../${COMPLETENESS_ERROR_PATH}`)
          }
        >
          Cancel
        </CancelButton>
        <SaveButton
          variant="contained"
          onClick={handleSaveChanges}
        >
          Save
        </SaveButton>
      </ButtonPanel>
    </Container>
  );
};

CompletenessErrorRepairTable.propTypes = {
  targetColumn: PropTypes.string.isRequired,
  errorReport: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.number.isRequired,
      column: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      repairSuggestion: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      errorType: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default CompletenessErrorRepairTable;
