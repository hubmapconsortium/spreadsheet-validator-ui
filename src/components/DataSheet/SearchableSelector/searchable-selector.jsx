import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';

const SearchableSelector = ({ options, onChange, onKeyPress }) => (
  <Autocomplete
    options={options}
    onChange={onChange}
    onKeyPress={onKeyPress}
    sx={{ height: '40px' }}
    getOptionLabel={(option) => option.label}
    // eslint-disable-next-line react/jsx-props-no-spreading
    renderInput={(params) => <TextField {...params} size="small" />}
  />
);

SearchableSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ).isRequired,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
};

SearchableSelector.defaultProps = {
  onChange: undefined,
  onKeyPress: undefined,
};

export default SearchableSelector;
