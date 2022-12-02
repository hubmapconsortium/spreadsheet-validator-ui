import { Box, Card, styled, Table, TableContainer, Typography } from '@mui/material';
import BaseButton from '../../styles/BaseButton';
import { LIGHT_GRAY, WHITE } from '../../constants/Color';

export const DataSheetCard = styled(Card)({
  display: 'block',
  width: '65vw',
  padding: '30px 30px 5px 30px',
  marginBottom: '25px',
  overflow: 'hidden',
});

export const SheetTableContainer = styled(TableContainer)({
  border: '2px solid',
  borderColor: LIGHT_GRAY,
  borderRadius: '5px',
  maxHeight: '800px',
});

export const SheetTable = styled(Table)({
  borderRadius: '5px',
});

export const HeaderLabel = styled(Typography)({
  fontSize: '18px',
  fontWeight: 'bold',
  paddingBottom: '10px',
});

export const ButtonBox = styled(Box)({
  display: 'flex',
  width: '90%',
  justifyContent: 'right',
});

export const FooterBox = styled(Box)({
  display: 'flex',
});

export const CancelButton = styled(BaseButton)({
  backgroundColor: WHITE,
});

export const SaveButton = styled(BaseButton)({
});
