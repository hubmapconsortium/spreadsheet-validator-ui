import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useHotkeys } from 'react-hotkeys-hook';
import AppContext from '../../pages/AppContext';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import SheetCell from '../DataSheet/SheetCell';
import SheetPagination from '../DataSheet/SheetPagination';
import { buildIncorrectnessSummaryData, createReplaceOperationPatch, getPagedData } from '../../helpers/app-utils';
import { initUserInput } from './function';
import HeaderWithCheckbox from './header-with-checkbox';
import CollapsibleTableRow from './collapsible-table-row';
import { ButtonBox, CancelButton, DataSheetCard, HeaderLabel, SaveButton, SheetTable, SheetTableContainer } from './styled';
import { REPAIR_INCORRECTNESS_PATH } from '../../constants/Router';

const RepairIncorrectnessTable = ({ incorrectnessType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: errorId } = location.state;
  const { appData, patches, setPatches } = useContext(AppContext);
  const { data, schema, reporting } = appData;

  const [userInput, setUserInput] = useImmer({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { enqueueSnackbar } = useSnackbar();

  const tableData = useMemo(
    () => buildIncorrectnessSummaryData(reporting[incorrectnessType]),
    [incorrectnessType],
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
      .filter((key) => userInput[key]?.approved)
      .forEach((key) => {
        const userInputPerKey = userInput[key];
        const { column, value } = userInputPerKey;
        userInputPerKey.rows.forEach((row) => {
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
                key={`${errorId}`}
                label="Approved?"
                handleCheckAll={(event) => {
                  setUserInput((currentUserInput) => {
                    pagedData.forEach((summaryData) => {
                      const { key } = summaryData;
                      // eslint-disable-next-line no-param-reassign
                      currentUserInput[key].approved = event.target.checked;
                    });
                  });
                }}
              />
            </SheetHeader>
            <SheetBody>
              {pagedData.map((summaryData) => (
                <CollapsibleTableRow
                  id={summaryData.key}
                  summaryData={summaryData}
                  sheetData={data}
                  schema={schema}
                  inputRef={saveChanges}
                  userInput={userInput[summaryData.key]}
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
};

export default RepairIncorrectnessTable;