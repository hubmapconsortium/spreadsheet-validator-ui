import { styled, Table, TableContainer } from '@mui/material';
import Card from '../../styles/Card';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import { REPAIR_INCOMPLETENESS_HEADER_DATA, SPREADSHEET_DATA, SPREADSHEET_METADATA } from '../../constants/TestData';
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
  maxWidth: '72vw',
  margin: '30px',
});

const RepairIncompletnessEditor = () => (
  <EditorCard>
    <EditorContainer>
      <EditorTable stickyHeader>
        <SheetHeader
          metadata={SPREADSHEET_METADATA}
          data={REPAIR_INCOMPLETENESS_HEADER_DATA}
        />
        <SheetBody
          metadata={SPREADSHEET_METADATA}
          data={SPREADSHEET_DATA}
        />
      </EditorTable>
    </EditorContainer>
  </EditorCard>
);

export default RepairIncompletnessEditor;
