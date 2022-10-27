import { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FormControl, TableBody, TableRow } from '@mui/material';
import PropTypes from 'prop-types';
import SheetCell from '../SheetCell';
import DropDownSelector from '../DropDownSelector';
import InputField from '../InputField';
import WrappedText from '../WrappedText/wrapped-text';
import AppContext from '../../../pages/AppContext';
import { getDataTypeForColumn, getPatchValue, getPermissibleValuesForColumn, getTableValue } from '../../../helpers/data-utils';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME, URL } from '../../../constants/ValueType';
import { LIGHT_RED } from '../../../constants/Color';

// eslint-disable-next-line react/prop-types, max-len
const SheetBody = ({ metadata, data, columnOrder, rowOrder, batchInput, userInput, setUserInput }) => {
  const { patches } = useContext(AppContext);
  const { column } = useParams();
  const existingUserInput = useMemo(
    () => rowOrder
      .reduce((result, rowIndex) => (
        { ...result, [rowIndex]: getPatchValue(rowIndex, column, patches) }
      ), {}),
    [column],
  );
  const batchValue = batchInput[column];
  useEffect(
    () => {
      setUserInput(existingUserInput);
    },
    [column, batchValue],
  );
  if (typeof batchValue !== 'undefined') {
    setUserInput((prevUserInput) => {
      // eslint-disable-next-line no-param-reassign
      rowOrder.forEach((rowIndex) => { prevUserInput[rowIndex] = batchValue; });
    });
  }
  return (
    <TableBody>
      {rowOrder.map((rowIndex) => {
        const handleInputChange = (event) => {
          setUserInput((prevUserInput) => {
            // eslint-disable-next-line no-param-reassign
            prevUserInput[rowIndex] = event.target.value;
          });
        };
        return (
          <TableRow>
            {columnOrder.map((columnName, columnIndex) => {
              const permissibleValues = getPermissibleValuesForColumn(columnName, metadata);
              const columnType = getDataTypeForColumn(columnName, metadata);
              let component;
              if (columnIndex === 0) {
                component = (
                  <SheetCell sx={{ zIndex: 998 }} sticky>
                    <FormControl fullWidth>
                      {permissibleValues
                        && (
                          <DropDownSelector
                            value={userInput[rowIndex] || ''}
                            options={permissibleValues}
                            onChange={handleInputChange}
                            colorOnEmpty={LIGHT_RED}
                          />
                        )}
                      {!permissibleValues
                        && (
                          <InputField
                            value={userInput[rowIndex] || ''}
                            type={columnType}
                            onChange={handleInputChange}
                            colorOnEmpty={LIGHT_RED}
                          />
                        )}
                    </FormControl>
                  </SheetCell>
                );
              } else {
                component = (
                  <SheetCell align="right">
                    <WrappedText text={getTableValue(rowIndex, columnName, data)} />
                  </SheetCell>
                );
              }
              return component;
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

SheetBody.propTypes = {
  metadata: PropTypes.shape({
    spreadsheet: PropTypes.shape({
      label: PropTypes.string.isRequired,
      columns: PropTypes.objectOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]).isRequired,
          permissibleValues: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any),
  ).isRequired,
  columnOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowOrder: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SheetBody;
