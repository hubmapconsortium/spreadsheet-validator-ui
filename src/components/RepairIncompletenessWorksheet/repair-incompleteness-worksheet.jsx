import { useContext, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { styled, Table, TableContainer } from '@mui/material';
import AppContext from '../../pages/AppContext';
import Card from '../../styles/Card';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import moveToFront from '../../helpers/array-utils';
import { LIGHT_GRAY } from '../../constants/Color';
import { filterRowsWithEmptyColumn } from '../../helpers/data-utils';

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
  const { metadata, data } = useContext(AppContext);
  const { column } = useParams();
  const columns = Object.keys(metadata.spreadsheet.columns);
  const getColumnOrder = useMemo(
    () => moveToFront(column, columns),
    [column, columns],
  );
  const getIncompleteRows = useMemo(
    () => filterRowsWithEmptyColumn(column, data),
    [column, data],
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
            data={getIncompleteRows}
            columnOrder={getColumnOrder}
          />
        </EditorTable>
      </EditorContainer>
    </EditorCard>
  );
};

export default RepairIncompletnessWorksheet;
