import { Checkbox } from '@mui/material';
import PropTypes from 'prop-types';
import SheetCell from '../DataSheet/SheetCell';
import { HeaderLabel } from './styled';

const HeaderWithCheckbox = ({ id, label, handleCheckAll }) => (
  <SheetCell align="center">
    <HeaderLabel>{label}</HeaderLabel>
    <Checkbox sx={{ padding: 0 }} key={id} onChange={handleCheckAll} />
  </SheetCell>
);

HeaderWithCheckbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  handleCheckAll: PropTypes.func.isRequired,
};

HeaderWithCheckbox.defaultProps = {
  id: undefined,
  label: undefined,
};

export default HeaderWithCheckbox;
