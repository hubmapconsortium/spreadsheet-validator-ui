import { useParams } from 'react-router-dom';
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

const SheetHeader = ({ schema, columnOrder, setBatchInput, setColumnFilter, setStaleBatch }) => {
  const { column } = useParams();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setBatchInput(event.target.value);
      setStaleBatch(false);
      event.preventDefault();
    }
  };
  return (
    <TableHead>
      <TableRow>
        {columnOrder.map((columnItem, index) => {
          const columnLabel = getLabelForColumn(columnItem, schema);
          const columnType = getDataTypeForColumn(columnItem, schema);
          const permissibleValues = getPermissibleValuesForColumn(columnItem, schema);
          const handleFilterChange = (event) => {
            setColumnFilter((prevColumnFilter) => {
              const enteredValue = event.target.value;
              if (!(column in prevColumnFilter)) {
                // eslint-disable-next-line no-param-reassign
                prevColumnFilter[column] = [];
              }
              const filterGroup = prevColumnFilter[column];
              const foundFilter = filterGroup.filter((filter) => filter.column === columnLabel);
              if (foundFilter.length === 0) {
                const filterSpec = { column: columnLabel, value: enteredValue };
                filterGroup.push(filterSpec);
              } else {
                const filterSpec = foundFilter[0];
                filterSpec.value = enteredValue;
              }
            });
            setStaleBatch(true);
          };
          return (
            <>
              {index === 0
                && (
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
                )}
              {index !== 0
                && (
                  <SheetCell align="center">
                    <HeaderLabel>{columnLabel}</HeaderLabel>
                    <FilterInputField
                      key={`${columnLabel}-on-${column}-incompleteness`}
                      onChange={handleFilterChange}
                    />
                  </SheetCell>
                )}
            </>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

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
  setColumnFilter: PropTypes.func.isRequired,
  setStaleBatch: PropTypes.func.isRequired,
};

export default SheetHeader;
