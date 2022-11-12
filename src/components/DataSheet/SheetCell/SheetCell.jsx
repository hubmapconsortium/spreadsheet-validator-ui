import { styled, TableCell } from '@mui/material';
import { WHITE } from '../../../constants/Color';

const SheetCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== 'sticky',
})(({ sticky }) => ({
  ...(sticky && {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 999,
    minWidth: '180px',
  }),
  background: WHITE,
  maxWidth: '300px',
}));

export default SheetCell;
