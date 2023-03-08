import { useState } from 'react';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PropTypes from 'prop-types';
import FilterInputField from '../DataSheet/FilterInputField';
import InfoTooltip from './info-tooltip';
import { HeaderCell, HeaderLabel } from './styled';
import { RED } from '../../constants/Color';

// eslint-disable-next-line max-len
const HeaderWithFilter = ({ id, name, label, description, required, setColumnFilters, setStaleBatch }) => {
  const [filterEnabled, setFilterEnabled] = useState(true);
  const handleFilterChange = (event) => {
    const enteredValue = event.target.value;
    setColumnFilters((currentFilters) => {
      const foundFilter = currentFilters.filter(
        (filter) => filter.column === name,
      );
      if (foundFilter.length === 0) {
        currentFilters.push({
          column: name,
          value: enteredValue,
          enabled: true,
        });
      } else if (foundFilter.length === 1) {
        const filter = foundFilter[0];
        filter.value = enteredValue;
      }
    });
    setStaleBatch(true);
    event.preventDefault();
  };
  const handleFilterIconClick = (event) => {
    setFilterEnabled(!filterEnabled);
    setColumnFilters((currentFilters) => {
      const foundFilter = currentFilters.filter(
        (filter) => filter.column === name,
      );
      if (foundFilter.length === 1) {
        const filter = foundFilter[0];
        filter.enabled = !filterEnabled;
      }
    });
    setStaleBatch(true);
    event.preventDefault();
  };
  return (
    <HeaderCell>
      <Stack direction="row" gap={1}>
        <HeaderLabel>
          {label}
          {required ? <span style={{ color: RED }}>*</span> : ''}
        </HeaderLabel>
        <InfoTooltip title={description}>
          <InfoOutlinedIcon fontSize="small" />
        </InfoTooltip>
      </Stack>
      <FilterInputField
        id={`${id}-column-filter-field`}
        onChange={handleFilterChange}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleFilterIconClick}>
              {filterEnabled ? <FilterAltIcon /> : <FilterAltOffIcon />}
            </IconButton>
          </InputAdornment>
        )}
      />
    </HeaderCell>
  );
};

HeaderWithFilter.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  setColumnFilters: PropTypes.func.isRequired,
  setStaleBatch: PropTypes.func.isRequired,
};

HeaderWithFilter.defaultProps = {
  id: undefined,
  description: undefined,
  required: false,
};

export default HeaderWithFilter;
