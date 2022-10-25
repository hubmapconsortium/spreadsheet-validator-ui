import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { styled, Table, TableContainer } from '@mui/material';
import AppContext from '../../pages/AppContext';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import Card from '../../styles/Card';
import moveToFront from '../../helpers/array-utils';
import { getMissingRequiredForColumn } from '../../helpers/data-utils';
import { LIGHT_GRAY } from '../../constants/Color';

const EditorCard = styled(Card)({
  display: 'flex',
  width: '90%',
  justifyContent: 'center',
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

const RepairIncompletnessWorksheet = () => {
  const { appData } = useContext(AppContext);
  const { metadata, data, errorReport } = appData;
  const { column } = useParams();
  const columns = Object.keys(metadata.spreadsheet.columns);
  const getColumnOrder = useMemo(
    () => moveToFront(column, columns),
    [column, columns],
  );
  const getRowFilter = useMemo(
    () => getMissingRequiredForColumn(column, errorReport),
    [column, errorReport],
  );
  return (
    <EditorCard>
      <EditorContainer>
        <EditorTable stickyHeader>
          <SheetHeader
            metadata={metadata}
            columnOrder={getColumnOrder}
          />
          <SheetBody
            metadata={metadata}
            data={data}
            columnOrder={getColumnOrder}
            rowFilter={getRowFilter}
          />
        </EditorTable>
      </EditorContainer>
    </EditorCard>
  );
};

export default RepairIncompletnessWorksheet;
