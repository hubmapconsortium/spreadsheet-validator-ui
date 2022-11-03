import { FormControl, TableBody, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import SheetCell from '../SheetCell';
import DropDownSelector from '../DropDownSelector';
import InputField from '../InputField';
import WrappedText from '../WrappedText/wrapped-text';
import { getDataTypeForColumn, getPermissibleValues } from '../../../helpers/data-utils';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME, URL } from '../../../constants/ValueType';
import { LIGHT_RED } from '../../../constants/Color';

const SheetBody = ({ schema, data, columnOrder, userInput, setUserInput }) => (
  <TableBody>
    {data.map((row) => (
      <TableRow>
        {columnOrder.map((columnName, columnIndex) => {
          const permissibleValues = getPermissibleValues(columnName, schema);
          const columnType = getDataTypeForColumn(columnName, schema);
          let component;
          if (columnIndex === 0) {
            // eslint-disable-next-line dot-notation
            const rowIndex = row['_id'];
            const handleUserInput = (event) => {
              setUserInput((currentUserInput) => {
                // eslint-disable-next-line no-param-reassign
                currentUserInput[rowIndex] = event.target.value;
              });
            };
            component = (
              <SheetCell sx={{ zIndex: 998 }} sticky>
                <FormControl fullWidth>
                  {permissibleValues
                    && (
                      <DropDownSelector
                        value={userInput[rowIndex] || ''}
                        options={permissibleValues}
                        onChange={handleUserInput}
                        colorOnEmpty={LIGHT_RED}
                      />
                    )}
                  {!permissibleValues
                    && (
                      <InputField
                        value={userInput[rowIndex] || ''}
                        type={columnType}
                        onChange={handleUserInput}
                        colorOnEmpty={LIGHT_RED}
                      />
                    )}
                </FormControl>
              </SheetCell>
            );
          } else {
            component = (
              <SheetCell align="right">
                <WrappedText text={row[columnName]} />
              </SheetCell>
            );
          }
          return component;
        })}
      </TableRow>
    ))}
  </TableBody>
);

SheetBody.propTypes = {
  schema: PropTypes.shape({
    title: PropTypes.string.isRequired,
    columns: PropTypes.objectOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]).isRequired,
        permissibleValues: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
      }),
    ).isRequired,
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any),
  ).isRequired,
  columnOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  userInput: PropTypes.objectOf(
    PropTypes.oneOf([PropTypes.string, PropTypes.number, PropTypes.bool]),
  ).isRequired,
  setUserInput: PropTypes.func.isRequired,
};

export default SheetBody;
