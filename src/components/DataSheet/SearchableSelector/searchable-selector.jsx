import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { WHITE } from '../../../constants/Color';

const SearchableSelector = (
  { id, value, options, onChange, onKeyPress, colorOnEmpty, startAdornment },
) => {
  console.log(value);
  return (
    <Autocomplete
      key={id}
      value={value}
      forcePopupIcon={false}
      autoHighlight
      options={options}
      onChange={onChange}
      onKeyPress={onKeyPress}
      sx={{ height: '40px', backgroundColor: value === '' ? colorOnEmpty : WHITE }}
      renderInput={(params) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          size="small"
          disableunderline="true"
          InputProps={{
            ...params.InputProps,
            startAdornment,
          }}
        />
      )}
      noOptionsText="Please contact admin@iec.org to propose a new categorical value."
    />
  );
};

SearchableSelector.propTypes = {
  id: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object]),
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  colorOnEmpty: PropTypes.string,
  startAdornment: PropTypes.element,
};

SearchableSelector.defaultProps = {
  id: undefined,
  value: undefined,
  onChange: undefined,
  onKeyPress: undefined,
  colorOnEmpty: WHITE,
  startAdornment: undefined,
};

export default SearchableSelector;
