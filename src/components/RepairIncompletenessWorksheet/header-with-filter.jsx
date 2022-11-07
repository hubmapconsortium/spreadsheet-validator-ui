import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import PropTypes from 'prop-types';
import FilterInputField from '../DataSheet/FilterInputField';
import SheetCell from '../DataSheet/SheetCell';
import { getColumnLabel } from '../../helpers/data-utils';
import { HeaderLabel } from './styled';

const HeaderWithFilter = ({ column, schema, setColumnFilters, setStaleBatch }) => {
  const [filterEnabled, setFilterEnabled] = useState(true);
  const columnLabel = getColumnLabel(column, schema);
  const handleFilterChange = (event) => {
    setColumnFilters((currentFilters) => {
      const enteredValue = event.target.value;
      const foundFilter = currentFilters.filter(
        (filter) => filter.column === columnLabel,
      );
      if (foundFilter.length === 0) {
        currentFilters.push({
          column: columnLabel,
          value: enteredValue,
          enabled: true,
        });
      } else if (foundFilter.length === 1) {
        const filter = foundFilter[0];
        filter.value = enteredValue;
      }
    });
    setStaleBatch(true);
  };
  const handleFilterInconClick = () => {
    setFilterEnabled(!filterEnabled);
    setColumnFilters((currentFilters) => {
      const foundFilter = currentFilters.filter(
        (filter) => filter.column === columnLabel,
      );
      if (foundFilter.length === 1) {
        const filter = foundFilter[0];
        filter.enabled = !filterEnabled;
      }
    });
    setStaleBatch(true);
  };
  return (
    <SheetCell align="center">
      <HeaderLabel>{columnLabel}</HeaderLabel>
      <FilterInputField
        key={`${columnLabel}-filter-field`}
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
  column: PropTypes.string.isRequired,
  schema: PropTypes.shape({
    title: PropTypes.string.isRequired,
    columns: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
  setColumnFilters: PropTypes.func.isRequired,
  setStaleBatch: PropTypes.func.isRequired,
};

export default HeaderWithFilter;
