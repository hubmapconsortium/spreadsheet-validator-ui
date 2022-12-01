import { useState } from 'react';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PropTypes from 'prop-types';
import FilterInputField from '../DataSheet/FilterInputField';
import SheetCell from '../DataSheet/SheetCell';
import { HeaderLabel } from './styled';
import WrappedTooltip from './wrapped-tooltip';

const HeaderWithFilter = ({ id, label, description, setColumnFilters, setStaleBatch }) => {
  const [filterEnabled, setFilterEnabled] = useState(true);
  const handleFilterChange = (event) => {
    const enteredValue = event.target.value;
    setColumnFilters((currentFilters) => {
      const foundFilter = currentFilters.filter(
        (filter) => filter.column === label,
      );
      if (foundFilter.length === 0) {
        currentFilters.push({
          column: label,
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
  const handleFilterInconClick = (event) => {
    setFilterEnabled(!filterEnabled);
    setColumnFilters((currentFilters) => {
      const foundFilter = currentFilters.filter(
        (filter) => filter.column === label,
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
    <SheetCell align="center">
      <Stack direction="row" gap={1}>
        <HeaderLabel>{label}</HeaderLabel>
        <WrappedTooltip title={description}>
          <InfoOutlinedIcon fontSize="small" />
        </WrappedTooltip>
      </Stack>
      <FilterInputField
        id={`${id}-column-filter-field`}
        onChange={handleFilterChange}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleFilterInconClick}>
              {filterEnabled ? <FilterAltIcon /> : <FilterAltOffIcon />}
            </IconButton>
          </InputAdornment>
        )}
      />
    </SheetCell>
  );
};

HeaderWithFilter.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  setColumnFilters: PropTypes.func.isRequired,
  setStaleBatch: PropTypes.func.isRequired,
};

HeaderWithFilter.defaultProps = {
  id: undefined,
  description: undefined,
};

export default HeaderWithFilter;