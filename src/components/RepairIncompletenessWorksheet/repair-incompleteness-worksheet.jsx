import { useContext, useEffect, useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import { useLocation, useNavigate } from 'react-router-dom';
import { TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useHotkeys } from 'react-hotkeys-hook';
import AppContext from '../../pages/AppContext';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import SheetCell from '../DataSheet/SheetCell';
import WrappedText from '../DataSheet/WrappedText';
import SheetPagination from '../DataSheet/SheetPagination';
import { createAddOperationPatch, getPagedData } from '../../helpers/app-utils';
import { moveItemToFront, extractItems } from '../../helpers/array-utils';
import { getMissingRequiredRows, getRows, getEffectiveValue, getColumnLabel, getColumnType, getPermissibleValues } from '../../helpers/data-utils';
import HeaderWithBatchInput from './header-with-batch-input';
import HeaderWithFilter from './header-with-filter';
import EditableCell from './editable-cell';
import { ButtonBox, CancelButton, DataSheetCard, SaveButton, SheetTable, SheetTableContainer } from './styled';
import { getFilteredData, initUserInput } from './function';
import { REPAIR_INCOMPLENESS_PATH } from '../../constants/Router';

const RepairIncompletnessWorksheet = ({ incompleteColumn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: errorId } = location.state;
  const { appData, patches, setPatches } = useContext(AppContext);
  const { schema, data, reporting } = appData;

  const [userInput, setUserInput] = useImmer({});
  const [batchInput, setBatchInput] = useState('');
  const [staleBatch, setStaleBatch] = useState(false);
  const [columnFilters, setColumnFilters] = useImmer([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { enqueueSnackbar } = useSnackbar();

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
    [incompleteColumn, patches],
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
      .filter((row) => userInput[row] && userInput[row] !== '' && true)
      .forEach((row) => {
        const patch = createAddOperationPatch(row, incompleteColumn, userInput[row]);
        setPatches((existingPatches) => {
          // eslint-disable-next-line no-param-reassign
          existingPatches[row][incompleteColumn] = patch;
        });
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
                      key={`${errorId}-${column}`}
                      label={getColumnLabel(column, schema)}
                      type={getColumnType(column, schema)}
                      permissibleValues={getPermissibleValues(column, schema)}
                      setBatchInput={setBatchInput}
                      setStaleBatch={setStaleBatch}
                    />
                  );
                } else {
                  component = (
                    <HeaderWithFilter
                      key={`${errorId}-${column}`}
                      label={getColumnLabel(column, schema)}
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
                    // eslint-disable-next-line dot-notation
                    const row = rowData['_id'];
                    if (index === 0) {
                      const handleInputChange = (event) => {
                        setUserInput((currentUserInput) => {
                          // eslint-disable-next-line no-param-reassign
                          currentUserInput[row] = event.target.value;
                        });
                      };
                      component = (
                        <EditableCell
                          value={userInput[row] || ''}
                          type={getColumnType(column, schema)}
                          inputRef={saveChanges}
                          permissibleValues={getPermissibleValues(column, schema)}
                          handleInputChange={handleInputChange}
                        />
                      );
                    } else {
                      component = (
                        <SheetCell align="right">
                          <WrappedText
                            text={getEffectiveValue(row, column, data, patches)}
                          />
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
          onClick={handleSaveChanges}
        >
          Save
        </SaveButton>
      </ButtonBox>
    </>
  );
};

RepairIncompletnessWorksheet.propTypes = {
  incompleteColumn: PropTypes.string.isRequired,
};

export default RepairIncompletnessWorksheet;
