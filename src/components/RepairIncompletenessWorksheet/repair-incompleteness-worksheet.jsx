import { useContext, useEffect, useMemo } from 'react';
import { useImmer } from 'use-immer';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, styled, Table, TableContainer } from '@mui/material';
import AppContext from '../../pages/AppContext';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import BaseButton from '../../styles/BaseButton';
import Card from '../../styles/Card';
import moveToFront from '../../helpers/array-utils';
import { getMissingRequiredForColumn } from '../../helpers/data-utils';
import { LIGHT_GRAY, WHITE } from '../../constants/Color';
import { REPAIR_INCOMPLENESS_PATH } from '../../constants/Router';

const EditorCard = styled(Card)({
  display: 'flex',
  width: '90%',
  justifyContent: 'center',
  marginBottom: '25px',
});

const EditorTable = styled(Table)({
  borderRadius: '5px',
});

const EditorContainer = styled(TableContainer)({
  border: '2px solid',
  borderColor: LIGHT_GRAY,
  borderRadius: '5px',
  maxHeight: '800px',
  maxWidth: '70vw',
  margin: '30px',
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
  const [userInput, setUserInput] = useImmer({});
  const [batchInput, setBatchInput] = useImmer({});
  const navigate = useNavigate();
  const { appData, managePatches } = useContext(AppContext);
  const { metadata, data, errorReport } = appData;
  const { column } = useParams();
  const columns = Object.keys(metadata.spreadsheet.columns);
  const columnOrder = useMemo(
    () => moveToFront(column, columns),
    [column],
  );
  const rowOrder = useMemo(
    () => getMissingRequiredForColumn(column, errorReport),
    [column],
  );
  useEffect(
    () => setBatchInput((prevBatchInput) => {
      // eslint-disable-next-line no-param-reassign
      delete prevBatchInput[column];
    }),
    [column],
  );
  return (
    <>
      <EditorCard>
        <EditorContainer>
          <EditorTable stickyHeader>
            <SheetHeader
              metadata={metadata}
              columnOrder={columnOrder}
              setBatchInput={setBatchInput}
            />
            <SheetBody
              metadata={metadata}
              data={data}
              columnOrder={columnOrder}
              rowOrder={rowOrder}
              batchInput={batchInput}
              userInput={userInput}
              setUserInput={setUserInput}
            />
          </EditorTable>
        </EditorContainer>
      </EditorCard>
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
