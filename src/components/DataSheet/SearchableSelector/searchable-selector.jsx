import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

const SearchableSelector = ({ options, onChange, onKeyPress }) => (
  <Autocomplete
    forcePopupIcon={false}
    autoHighlight
    options={options}
    onChange={onChange}
    onKeyPress={onKeyPress}
    sx={{ height: '40px' }}
    getOptionLabel={(option) => option.label}
    renderInput={(params) => (
      <TextField
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...params}
        size="small"
        InputProps={{
          ...params.InputProps,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>),
          disableUnderline: true,
        }}
      />
    )}
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
