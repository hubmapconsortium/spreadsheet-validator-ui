import { Checkbox } from '@mui/material';
import PropTypes from 'prop-types';
import SheetCell from '../DataSheet/SheetCell';
import { HeaderLabel } from './styled';

const HeaderWithCheckbox = ({ key, label, handleCheckAll }) => (
  <SheetCell align="center">
    <HeaderLabel>{label}</HeaderLabel>
    <Checkbox sx={{ padding: 0 }} key={key} onChange={handleCheckAll} />
  </SheetCell>
);

HeaderWithCheckbox.propTypes = {
  key: PropTypes.string,
  label: PropTypes.string,
  handleCheckAll: PropTypes.func.isRequired,
};

HeaderWithCheckbox.defaultProps = {
  key: undefined,
  label: undefined,
};

export default HeaderWithCheckbox;
