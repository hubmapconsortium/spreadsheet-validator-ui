import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useHotkeys } from 'react-hotkeys-hook';
import AppContext from '../../../pages/AppContext';
import SheetHeader from '../../DataSheet/SheetHeader';
import SheetBody from '../../DataSheet/SheetBody';
import SheetPagination from '../../DataSheet/SheetPagination';
import Flex from '../../../styles/Panel';
import { isColumnRequired } from '../../../helpers/data-utils';
import { createReplaceOperationPatch, getPagedData } from '../../../helpers/app-utils';
import HeaderWithCheckbox from '../header-with-checkbox';
import CollapsibleTableRow from '../collapsible-table-row';
import InfoTooltip from '../info-tooltip';
import { initUserInput } from './function';
import { ButtonPanel, CancelButton, DataSheetCard, FooterPanel, HeaderCell, HeaderLabel, SaveAndRepairNextButton, SaveButton, SheetTable, SheetTableContainer } from '../styled';
import { ADHERENCE_ERROR_PATH } from '../../../constants/Router';

const AdherenceErrorRepairTable = ({ errorType, tableData }) => {
  const navigate = useNavigate();
  const { appData, patches, updatePatches } = useContext(AppContext);
  const { schema, paths } = appData;

  const [userInput, updateUserInput] = useImmer({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(
    () => {
      const existingUserInput = initUserInput(tableData, patches);
      updateUserInput(existingUserInput);
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
          if (isColumnRequired(column, schema)) {
            if (value !== null) {
              const patch = createReplaceOperationPatch(row, column, value);
              updatePatches((existingPatches) => {
                // eslint-disable-next-line no-param-reassign
                existingPatches[row][column] = patch;
              });
            } else {
              updatePatches((existingPatches) => {
                // eslint-disable-next-line no-param-reassign
                delete existingPatches[row][column];
              });
            }
          } else {
            const patch = createReplaceOperationPatch(row, column, value);
            updatePatches((existingPatches) => {
              // eslint-disable-next-line no-param-reassign
              existingPatches[row][column] = patch;
            });
          }
        });
      });
    enqueueSnackbar('Changes are saved!', { variant: 'success' });
  };

  const getNextRepair = () => {
    const types = paths.adherenceErrorTypes;
    const index = types.indexOf(errorType);
    const nextIndex = (index + 1 === types.length) ? 0 : index + 1;
    return types[nextIndex];
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
              <HeaderCell align="center" width="30%">
                <HeaderLabel>Column name</HeaderLabel>
              </HeaderCell>
              <HeaderCell align="center" width="30%">
                <HeaderLabel>Original value</HeaderLabel>
              </HeaderCell>
              <HeaderCell align="center" width="30%">
                <HeaderLabel>New value</HeaderLabel>
              </HeaderCell>
              <HeaderWithCheckbox
                id={`checkbox-${errorType}`}
                label="Accept?"
                handleCheckAll={(event) => {
                  updateUserInput((currentUserInput) => {
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
              {pagedData.map((rowData) => (
                <CollapsibleTableRow
                  key={`collapsible-row-${rowData.id}`}
                  id={`collapsible-row-${rowData.id}`}
                  rowData={rowData}
                  schema={schema}
                  inputRef={saveChanges}
                  userInput={userInput}
                  updateUserInput={updateUserInput}
                />
              ))}
            </SheetBody>
          </SheetTable>
        </SheetTableContainer>
        <FooterPanel>
          <Flex sx={{ width: '400px', paddingLeft: '5px' }}>
            <Stack direction="row" gap={1}>
              <InfoTooltip
                title="The table shows all the values from users that are not correctly entered
                according to the metadata specification. Use the available input field to enter
                the correct value, or use the check box to approve the suggested value given
                by the application."
                placement="right"
                arrow
              >
                <HelpIcon color="primary" fontSize="medium" />
              </InfoTooltip>
              <Typography>How to Use the Table</Typography>
            </Stack>
          </Flex>
          <SheetPagination
            data={tableData}
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
          onClick={() => navigate(`../${ADHERENCE_ERROR_PATH}`)}
        >
          Back to Overview
        </CancelButton>
        <SaveButton
          variant="contained"
          onClick={handleSaveChanges}
        >
          Save
        </SaveButton>
        <SaveAndRepairNextButton
          variant="contained"
          onClick={() => {
            handleSaveChanges();
            navigate(`../${ADHERENCE_ERROR_PATH}/${getNextRepair()}`);
          }}
        >
          Save and Repair Next
        </SaveAndRepairNextButton>
      </ButtonPanel>
    </>
  );
};

AdherenceErrorRepairTable.propTypes = {
  errorType: PropTypes.string.isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object]),
  ).isRequired,
};

export default AdherenceErrorRepairTable;
