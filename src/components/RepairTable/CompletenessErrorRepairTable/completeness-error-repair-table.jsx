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
import SheetPagination from '../../DataSheet/SheetPagination';
import Flex from '../../../styles/Panel';
import { createAddOperationPatch, getPagedData } from '../../../helpers/app-utils';
import { moveItemToFront } from '../../../helpers/array-utils';
import { getRows, getColumnLabel, getColumnType, getPermissibleValues, getColumnDescription, getColumnName } from '../../../helpers/data-utils';
import HeaderWithBatchInput from '../header-with-batch-input';
import HeaderWithFilter from '../header-with-filter';
import InfoTooltip from '../info-tooltip';
import { ButtonPanel, CancelButton, DataSheetCard, FooterPanel, SaveButton, SheetTable, SheetTableContainer } from '../styled';
import { getFilteredData, initUserInput } from './function';
import { COMPLETENESS_ERROR_PATH } from '../../../constants/Router';
import Container from '../../../styles/Container';
import { nullOnEmpty } from '../../../helpers/string-utils';
import EditableSheetCell from '../editable-sheet-cell';
import StaticSheetCell from '../static-sheet-cell';

const CompletenessErrorRepairTable = ({ targetColumn, tableData }) => {
  const navigate = useNavigate();
  const { appData, patches, setPatches } = useContext(AppContext);
  const { schema } = appData;

  const [userInput, setUserInput] = useImmer({});
  const [batchInput, setBatchInput] = useState('');
  const [staleBatch, setStaleBatch] = useState(false);
  const [columnFilters, setColumnFilters] = useImmer([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(
    () => {
      const existingUserInput = initUserInput(tableData, targetColumn, patches);
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

  const columnOrder = useMemo(
    () => moveItemToFront(targetColumn, schema.columnOrder),
    [targetColumn],
  );

  const handleSaveChanges = () => {
    tableData.forEach((record) => {
      const { rowNumber } = record;
      const value = userInput[rowNumber];
      if (value !== null) {
        const patch = createAddOperationPatch(rowNumber, targetColumn, value);
        setPatches((existingPatches) => {
          // eslint-disable-next-line no-param-reassign
          existingPatches[rowNumber][targetColumn] = patch;
        });
      } else {
        setPatches((existingPatches) => {
          // eslint-disable-next-line no-param-reassign
          delete existingPatches[rowNumber][targetColumn];
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
                          <EditableSheetCell
                            sticky
                            key={`sheet-cell-on-${column}-${row}-to-repair-${targetColumn}`}
                            value={userInput[row] || ''}
                            type={getColumnType(column, schema)}
                            permissibleValues={getPermissibleValues(column, schema)}
                            inputRef={saveChangesHotKeys}
                            onSave={(userValue) => {
                              setUserInput((currentUserInput) => {
                                // eslint-disable-next-line no-param-reassign
                                currentUserInput[row] = nullOnEmpty(userValue);
                              });
                            }}
                          />
                        );
                      } else {
                        component = (
                          <StaticSheetCell
                            key={`sheet-cell-on-${column}-${row}-to-repair-${targetColumn}`}
                            value={record[column]}
                          />
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
  tableData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object]),
  ).isRequired,
};

export default CompletenessErrorRepairTable;
