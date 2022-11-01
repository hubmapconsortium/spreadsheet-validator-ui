import { useContext, useEffect, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, styled, Table, TableContainer } from '@mui/material';
import AppContext from '../../pages/AppContext';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import BaseButton from '../../styles/BaseButton';
import Card from '../../styles/Card';
import moveToFront from '../../helpers/array-utils';
import { getMissingRequiredForColumn, getPatchValue } from '../../helpers/data-utils';
import { LIGHT_GRAY, WHITE } from '../../constants/Color';
import { REPAIR_INCOMPLENESS_PATH } from '../../constants/Router';
import SheetPagination from '../DataSheet/SheetPagination';

const DataSheetCard = styled(Card)({
  display: 'block',
  width: '65vw',
  padding: '30px 30px 5px 30px',
  marginBottom: '25px',
  overflow: 'hidden',
});

const SheetTableContainer = styled(TableContainer)({
  border: '2px solid',
  borderColor: LIGHT_GRAY,
  borderRadius: '5px',
  maxHeight: '800px',
});

const SheetTable = styled(Table)({
  borderRadius: '5px',
});

const ButtonBox = styled(Box)({
  display: 'flex',
  width: '90%',
  justifyContent: 'right',
});

const CancelButton = styled(BaseButton)({
  backgroundColor: WHITE,
});

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
    () => moveToFront(column, columns),
    [column],
  );

  const badIndexes = useMemo(
    () => getMissingRequiredForColumn(column, reporting),
    [column],
  );
  const tableData = useMemo(
    () => badIndexes.map((index) => data[index]),
    [badIndexes],
  );
  useEffect(
    () => {
      const existingUserInput = badIndexes
        .reduce((result, rowIndex) => (
          { ...result, [rowIndex]: getPatchValue(rowIndex, column, patches) }
        ), {});
      setUserInput(existingUserInput);
      return () => setColumnFilters([]);
    },
    [tableData],
  );

  const filteredData = useMemo(
    () => tableData.filter(
      (row) => columnFilters.every(
        (filter) => {
          const cellValue = row[filter.column] || '';
          const cellValueString = cellValue.toString();
          return cellValueString.toLowerCase().includes(filter.value.toLowerCase());
        },
      ),
    ),
    [tableData, columnFilters],
  );

  useEffect(
    () => {
      if (batchInput !== '' && !staleBatch) {
        // eslint-disable-next-line dot-notation
        const rowIndexes = filteredData.map((row) => row['_id']);
        setUserInput((prevUserInput) => {
          // eslint-disable-next-line no-param-reassign
          rowIndexes.forEach((rowIndex) => { prevUserInput[rowIndex] = batchInput; });
        });
      }
      return () => setStaleBatch(true);
    },
    [filteredData, batchInput, staleBatch],
  );

  const pagedData = useMemo(
    () => (rowsPerPage > 0
      ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : filteredData),
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
        <BaseButton
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
        </BaseButton>
      </ButtonBox>
    </>
  );
};

export default RepairIncompletnessWorksheet;
