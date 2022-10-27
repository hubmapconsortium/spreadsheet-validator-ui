import { useContext, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FormControl, OutlinedInput, styled, TableBody, TableRow, Tooltip, Typography, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import SheetCell from '../SheetCell';
import AppContext from '../../../pages/AppContext';
import { getDataTypeForColumn, getPatchValue, getPermissibleValuesForColumn, getTableValue } from '../../../helpers/data-utils';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME, URL } from '../../../constants/ValueType';
import { LIGHT_RED, WHITE } from '../../../constants/Color';

const CellValue = styled(Typography)({
  fontSize: '17px',
});

const DropDownSelector = ({ value, options, onChange }) => (
  <Select
    id="test"
    value={value}
    sx={{
      height: '40px',
      backgroundColor: value === '' ? LIGHT_RED : WHITE,
    }}
    onChange={onChange}
  >
    {options.map((option) => (
      <MenuItem key={option.label} value={option.label}>
        {option.label}
      </MenuItem>
    ))}
  </Select>
);

const InputField = ({ value, type, onChange }) => (
  <OutlinedInput
    hiddenLabel
    variant="standard"
    size="small"
    value={value}
    type={type}
    onChange={onChange}
    sx={{ backgroundColor: value === '' ? LIGHT_RED : WHITE }}
  />
);

const WrappedText = ({ text }) => (
  <Tooltip
    arrow
    title={<Typography fontSize={16}>{text}</Typography>}
    placement="right"
    enterDelay={1000}
  >
    <CellValue noWrap>{text}</CellValue>
  </Tooltip>
);

// eslint-disable-next-line react/prop-types, max-len
const SheetBody = ({ metadata, data, columnOrder, rowFilter, batchInput, userInput, setUserInput }) => {
  const { patches } = useContext(AppContext);
  const { column } = useParams();
  const existingUserInput = useMemo(
    () => rowFilter
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
      rowFilter.forEach((rowIndex) => { prevUserInput[rowIndex] = batchValue; });
    });
  }
  return (
    <TableBody>
      {rowFilter.map((rowIndex) => {
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
                            value={userInput[rowIndex]}
                            options={permissibleValues}
                            onChange={handleInputChange}
                          />
                        )}
                      {!permissibleValues
                        && (
                          <InputField
                            value={userInput[rowIndex]}
                            type={columnType}
                            onChange={handleInputChange}
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

DropDownSelector.propTypes = {
  value: PropTypes.string,
  options: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

DropDownSelector.defaultProps = {
  value: '',
};

InputField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]).isRequired,
  onChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  value: '',
};

WrappedText.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

WrappedText.defaultProps = {
  text: '',
};

SheetBody.propTypes = {
  metadata: PropTypes.shape({
    spreadsheet: PropTypes.shape({
      label: PropTypes.string.isRequired,
      columns: PropTypes.objectOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]).isRequired,
          permissibleValues: PropTypes.objectOf(PropTypes.string),
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any),
  ).isRequired,
  columnOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  rowFilter: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default SheetBody;
