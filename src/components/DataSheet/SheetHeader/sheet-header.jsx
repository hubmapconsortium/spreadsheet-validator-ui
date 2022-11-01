import { FormControl, styled, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import SheetCell from '../SheetCell';
import FilterInputField from '../FilterInputField';
import InputField from '../InputField';
import SearchableSelector from '../SearchableSelector';
import { getDataTypeForColumn, getLabelForColumn, getPermissibleValuesForColumn } from '../../../helpers/data-utils';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME, URL } from '../../../constants/ValueType';

const HeaderLabel = styled(Typography)({
  fontSize: '18px',
  fontWeight: 'bold',
  paddingBottom: '10px',
});

const SheetHeader = ({ schema, columnOrder, setBatchInput, setColumnFilters, setStaleBatch }) => (
  <TableHead>
    <TableRow>
      {columnOrder.map((columnItem, columnIndex) => {
        const columnLabel = getLabelForColumn(columnItem, schema);
        const columnType = getDataTypeForColumn(columnItem, schema);
        const permissibleValues = getPermissibleValuesForColumn(columnItem, schema);
        let component;
        if (columnIndex === 0) {
          const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
              setBatchInput(event.target.value);
              setStaleBatch(false);
              event.preventDefault();
            }
          };
          component = (
            <SheetCell align="center" sticky>
              <HeaderLabel>{columnLabel}</HeaderLabel>
              <FormControl fullWidth>
                {permissibleValues
                  && (
                    <SearchableSelector
                      options={permissibleValues}
                      onKeyPress={handleKeyPress}
                    />
                  )}
                {!permissibleValues
                  && (
                    <InputField
                      type={columnType}
                      placeholder="Enter value..."
                      onKeyPress={handleKeyPress}
                    />
                  )}
              </FormControl>
            </SheetCell>
          );
        } else {
          const handleFilterChange = (event) => {
            setColumnFilters((currentFilters) => {
              const enteredValue = event.target.value;
              const foundFilter = currentFilters.filter((filter) => filter.column === columnLabel);
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
          component = (
            <SheetCell align="center">
              <HeaderLabel>{columnLabel}</HeaderLabel>
              <FilterInputField
                key={`${columnLabel}-filter-field`}
                onChange={handleFilterChange}
              />
            </SheetCell>
          );
        }
        return component;
      })}
    </TableRow>
  </TableHead>
);

SheetHeader.propTypes = {
  schema: PropTypes.shape({
    label: PropTypes.string.isRequired,
    columns: PropTypes.objectOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]).isRequired,
        permissibleValues: PropTypes.objectOf(PropTypes.string),
      }),
    ).isRequired,
  }).isRequired,
  columnOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  setBatchInput: PropTypes.func.isRequired,
  setColumnFilters: PropTypes.func.isRequired,
  setStaleBatch: PropTypes.func.isRequired,
};

export default SheetHeader;
