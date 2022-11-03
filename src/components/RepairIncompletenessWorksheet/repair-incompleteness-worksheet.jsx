import { useContext, useEffect, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import { useNavigate, useParams } from 'react-router-dom';
import { TableRow } from '@mui/material';
import AppContext from '../../pages/AppContext';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import SheetCell from '../DataSheet/SheetCell';
import WrappedText from '../DataSheet/WrappedText';
import SheetPagination from '../DataSheet/SheetPagination';
import { moveItemToFront, extractItems } from '../../helpers/array-utils';
import { getMissingRequiredRows, getRows } from '../../helpers/data-utils';
import HeaderWithBatchInput from './header-with-batch-input';
import HeaderWithFilter from './header-with-filter';
import EditableCell from './editable-cell';
import { ButtonBox, CancelButton, DataSheetCard, SaveButton, SheetTable, SheetTableContainer } from './styled';
import { getFilteredData, getPagedData, initUserInput } from './function';
import { REPAIR_INCOMPLENESS_PATH } from '../../constants/Router';

const RepairIncompletnessWorksheet = () => {
  const navigate = useNavigate();
  const { appData, patches, managePatches } = useContext(AppContext);
  const { schema, data, reporting } = appData;
  const { incompleteColumn } = useParams();

  const [userInput, setUserInput] = useImmer({});
  const [batchInput, setBatchInput] = useState('');
  const [staleBatch, setStaleBatch] = useState(false);
  const [columnFilters, setColumnFilters] = useImmer([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const columns = Object.keys(schema.columns);
  const columnOrder = useMemo(
    () => moveItemToFront(incompleteColumn, columns),
    [incompleteColumn],
  );

  const missingRequiredRows = useMemo(
    () => getMissingRequiredRows(incompleteColumn, reporting),
    [incompleteColumn],
  );
  const tableData = useMemo(
    () => extractItems(missingRequiredRows, data),
    [missingRequiredRows],
  );
  useEffect(
    () => {
      const existingUserInput = initUserInput(missingRequiredRows, incompleteColumn, patches);
      setUserInput(existingUserInput);
      return () => setColumnFilters([]);
    },
    [tableData],
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
                      column={column}
                      schema={schema}
                      setBatchInput={setBatchInput}
                      setStaleBatch={setStaleBatch}
                    />
                  );
                } else {
                  component = (
                    <HeaderWithFilter
                      column={column}
                      schema={schema}
                      setColumnFilters={setColumnFilters}
                      setStaleBatch={setStaleBatch}
                    />
                  );
                }
                return component;
              })}
            </SheetHeader>
            <SheetBody>
              {pagedData.map((rowData) => (
                <TableRow>
                  {columnOrder.map((column, index) => {
                    let component;
                    if (index === 0) {
                      component = (
                        <EditableCell
                          // eslint-disable-next-line dot-notation
                          row={rowData['_id']}
                          column={column}
                          schema={schema}
                          userInput={userInput}
                          setUserInput={setUserInput}
                        />
                      );
                    } else {
                      component = (
                        <SheetCell align="right">
                          <WrappedText text={rowData[column]} />
                        </SheetCell>
                      );
                    }
                    return component;
                  })}
                </TableRow>
              ))}
            </SheetBody>
          </SheetTable>
        </SheetTableContainer>
        <SheetPagination
          data={filteredData}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
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
          onClick={() => Object.keys(userInput)
            .filter((row) => userInput[row] && userInput[row] !== '' && true)
            .map(
              (row) => managePatches({
                command: 'CREATE_PATCH',
                patchOp: 'ADD',
                value: userInput[row],
                target: { row, column: incompleteColumn },
              }),
            )}
        >
          Save
        </SaveButton>
      </ButtonBox>
    </>
  );
};

export default RepairIncompletnessWorksheet;
