import { useContext, useEffect, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import { useNavigate, useParams } from 'react-router-dom';
import AppContext from '../../pages/AppContext';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import SheetPagination from '../DataSheet/SheetPagination';
import { moveItemToFront, extractItems } from '../../helpers/array-utils';
import { getMissingRequiredRows, getRows } from '../../helpers/data-utils';
import { ButtonBox, CancelButton, DataSheetCard, SaveButton, SheetTable, SheetTableContainer } from './styled';
import { getFilteredData, getPagedData, initUserInput } from './function';
import { REPAIR_INCOMPLENESS_PATH } from '../../constants/Router';

const RepairIncompletnessWorksheet = () => {
  const navigate = useNavigate();
  const { appData, patches, managePatches } = useContext(AppContext);
  const { schema, data, reporting } = appData;
  const { column } = useParams();

  const [userInput, setUserInput] = useImmer({});
  const [batchInput, setBatchInput] = useState('');
  const [staleBatch, setStaleBatch] = useState(false);
  const [columnFilters, setColumnFilters] = useImmer([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const columns = Object.keys(schema.columns);
  const columnOrder = useMemo(
    () => moveItemToFront(column, columns),
    [column],
  );

  const missingRequiredRows = useMemo(
    () => getMissingRequiredRows(column, reporting),
    [column],
  );
  const tableData = useMemo(
    () => extractItems(missingRequiredRows, data),
    [missingRequiredRows],
  );
  useEffect(
    () => {
      const existingUserInput = initUserInput(missingRequiredRows, column, patches);
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
            <SheetHeader
              schema={schema}
              columnOrder={columnOrder}
              setBatchInput={setBatchInput}
              setStaleBatch={setStaleBatch}
              setColumnFilters={setColumnFilters}
            />
            <SheetBody
              schema={schema}
              data={pagedData}
              columnOrder={columnOrder}
              userInput={userInput}
              setUserInput={setUserInput}
            />
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
          onClick={() => Object.keys(userInput).map(
            (row) => managePatches({
              command: 'CREATE_PATCH',
              patchOp: 'ADD',
              value: userInput[row],
              target: { row, column },
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
