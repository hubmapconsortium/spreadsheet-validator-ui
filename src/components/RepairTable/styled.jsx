import { styled, Table, TableContainer, Typography } from '@mui/material';
import BaseButton from '../../styles/BaseButton';
import { LIGHT_GRAY, WHITE } from '../../constants/Color';
import SheetCell from '../DataSheet/SheetCell';
import Card from '../../styles/Card';
import Flex from '../../styles/Panel';

export const DataSheetCard = styled(Card)({
  display: 'block',
  padding: '30px 30px 5px 30px',
  marginBottom: '25px',
  overflow: 'hidden',
});

export const SheetTableContainer = styled(TableContainer)({
  border: '2px solid',
  borderColor: LIGHT_GRAY,
  borderRadius: '5px',
});

export const SheetTable = styled(Table)({
  borderRadius: '5px',
});

export const HeaderCell = styled(SheetCell)({
  verticalAlign: 'bottom',
  borderBottom: '1px solid black',
});

export const HeaderLabel = styled(Typography)({
  fontSize: '18px',
  fontWeight: 'bold',
  paddingBottom: '10px',
});

export const ButtonPanel = styled(Flex)({
  justifyContent: 'right',
});

export const FooterPanel = styled(Flex)({
});

export const CancelButton = styled(BaseButton)({
  backgroundColor: WHITE,
  width: '150px',
});

export const SaveButton = styled(BaseButton)({
  width: '150px',
});
