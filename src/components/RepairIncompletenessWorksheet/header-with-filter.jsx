import PropTypes from 'prop-types';
import FilterInputField from '../DataSheet/FilterInputField';
import SheetCell from '../DataSheet/SheetCell';
import { getColumnLabel } from '../../helpers/data-utils';
import { HeaderLabel } from './styled';

const HeaderWithFilter = ({ column, schema, setColumnFilters, setStaleBatch }) => {
  const columnLabel = getColumnLabel(column, schema);
  const handleFilterChange = (event) => {
    setColumnFilters((currentFilters) => {
      const enteredValue = event.target.value;
      const foundFilter = currentFilters.filter(
        (filter) => filter.column === columnLabel,
      );
      if (foundFilter.length === 0) {
        const filter = { column: columnLabel, value: enteredValue };
        currentFilters.push(filter);
      } else if (foundFilter.length === 1) {
        const filter = foundFilter[0];
        filter.value = enteredValue;
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
