import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useHotkeys } from 'react-hotkeys-hook';
import AppContext from '../../../pages/AppContext';
import SheetHeader from '../../DataSheet/SheetHeader';
import SheetBody from '../../DataSheet/SheetBody';
import SheetCell from '../../DataSheet/SheetCell';
import SheetPagination from '../../DataSheet/SheetPagination';
import { createReplaceOperationPatch, generateRepairIncorrectnessTableData, getPagedData } from '../../../helpers/app-utils';
import { initUserInput } from './function';
import HeaderWithCheckbox from '../header-with-checkbox';
import CollapsibleTableRow from '../collapsible-table-row';
import { ButtonBox, CancelButton, DataSheetCard, HeaderLabel, SaveButton, SheetTable, SheetTableContainer } from '../styled';
import { REPAIR_INCORRECTNESS_PATH } from '../../../constants/Router';

// eslint-disable-next-line no-unused-vars
const RepairIncorrectnessTable = ({ incorrectnessType, incorrectnessReporting }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { errorId } = location.state;
  const { appData, patches, setPatches } = useContext(AppContext);
  const { data, schema } = appData;

  const [userInput, setUserInput] = useImmer({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { enqueueSnackbar } = useSnackbar();

  const tableData = useMemo(
    () => generateRepairIncorrectnessTableData(incorrectnessReporting, data),
    [incorrectnessReporting],
  );
  useEffect(
    () => {
      const existingUserInput = initUserInput(tableData, patches);
      setUserInput(existingUserInput);
    },
    [tableData, patches],
  );
  const pagedData = useMemo(
    () => getPagedData(tableData, page, rowsPerPage),
    [tableData, page, rowsPerPage],
  );

  const handleSaveChanges = () => {
    Object.keys(userInput)
      .filter((key) => userInput[key].approved)
      .forEach((key) => {
        const userInputPerMatchingGroup = userInput[key];
        const { column, value } = userInputPerMatchingGroup;
        userInputPerMatchingGroup.rows.forEach((row) => {
          const patch = createReplaceOperationPatch(row, column, value);
          setPatches((currentPatches) => {
            // eslint-disable-next-line no-param-reassign
            currentPatches[row][column] = patch;
          });
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
              <SheetCell />
              <SheetCell align="center" width="30%">
                <HeaderLabel>Column name</HeaderLabel>
              </SheetCell>
              <SheetCell align="center" width="30%">
                <HeaderLabel>Cell value</HeaderLabel>
              </SheetCell>
              <SheetCell align="center" width="30%">
                <HeaderLabel>Suggested value</HeaderLabel>
              </SheetCell>
              <HeaderWithCheckbox
                id={`checkbox-${errorId}`}
                label="Approved?"
                handleCheckAll={(event) => {
                  setUserInput((currentUserInput) => {
                    pagedData.forEach((summaryData) => {
                      const { id } = summaryData;
                      // eslint-disable-next-line no-param-reassign
                      currentUserInput[id].approved = event.target.checked;
                    });
                  });
                }}
              />
            </SheetHeader>
            <SheetBody>
              {pagedData.map((rowData, index) => (
                <CollapsibleTableRow
                  // eslint-disable-next-line react/no-array-index-key
                  key={`collapsible-row-${index}`}
                  id={`collapsible-row-${index}`}
                  rowData={rowData}
                  schema={schema}
                  inputRef={saveChanges}
                  userInput={userInput}
                  setUserInput={setUserInput}
                />
              ))}
            </SheetBody>
          </SheetTable>
        </SheetTableContainer>
        <SheetPagination
          data={tableData}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </DataSheetCard>
      <ButtonBox>
        <CancelButton
          variant="outlined"
          onClick={() => navigate(`../${REPAIR_INCORRECTNESS_PATH}`)}
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

RepairIncorrectnessTable.propTypes = {
  incorrectnessType: PropTypes.string.isRequired,
  incorrectnessReporting: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.number.isRequired,
      column: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      suggestion: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      errorType: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default RepairIncorrectnessTable;
