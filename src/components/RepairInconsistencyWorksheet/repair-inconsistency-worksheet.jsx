import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';
import AppContext from '../../pages/AppContext';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import SheetCell from '../DataSheet/SheetCell';
import SheetPagination from '../DataSheet/SheetPagination';
import { buildInconsistencySummaryData, createReplaceOperationPatch, getPagedData } from '../../helpers/app-utils';
import { initUserInput } from './function';
import HeaderWithCheckbox from './header-with-checkbox';
import CollapsibleTableRow from './collapsible-table-row';
import { ButtonBox, CancelButton, DataSheetCard, HeaderLabel, SaveButton, SheetTable, SheetTableContainer } from './styled';
import { REPAIR_INCONSISTENCY_PATH } from '../../constants/Router';

const RepairInconsistencyWorksheet = ({ inconsistencyType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: errorId } = location.state;
  const { appData, patches, setPatches } = useContext(AppContext);
  const { data, schema, reporting } = appData;
  const [userInput, setUserInput] = useImmer({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const tableData = useMemo(
    () => buildInconsistencySummaryData(reporting[inconsistencyType]),
    [inconsistencyType],
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
          onClick={() => navigate(`../${REPAIR_INCONSISTENCY_PATH}`)}
        >
          Cancel
        </CancelButton>
        <SaveButton
          variant="contained"
          onClick={() => {
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
          }}
        >
          Save
        </SaveButton>
      </ButtonBox>
    </>
  );
};

RepairInconsistencyWorksheet.propTypes = {
  inconsistencyType: PropTypes.string.isRequired,
};

export default RepairInconsistencyWorksheet;
