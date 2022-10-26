import { useContext } from 'react';
import { FormControl, OutlinedInput, MenuItem, Select, styled, TableBody, TableRow, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import AppContext from '../../../pages/AppContext';
import SheetCell from '../SheetCell';
import { getDataTypeForColumn, getPermissibleValuesForColumn, getTableValue } from '../../../helpers/data-utils';
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
    {Object.keys(options).map((option) => (
      <MenuItem key={option} value={option}>{option}</MenuItem>
    ))}
  </Select>
);

const TextField = ({ value, type, onChange }) => (
  <OutlinedInput
    hiddenlabel="true"
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

// eslint-disable-next-line react/prop-types
const SheetBody = ({ metadata, data, columnOrder, rowFilter, userInput, setUserInput }) => {
  const { managePatches } = useContext(AppContext);
  return (
    <TableBody>
      {rowFilter.map((rowIndex) => (
        <TableRow>
          {columnOrder.map((columnName, columnIndex) => {
            const permissibleValues = getPermissibleValuesForColumn(columnName, metadata);
            const columnType = getDataTypeForColumn(columnName, metadata);
            const handleInputChange = (event) => {
              const currInput = event.target.value;
              managePatches({
                command: 'CREATE_PATCH',
                patchOp: 'ADD',
                value: currInput,
                target: { row: rowIndex, column: columnName },
              });
              setUserInput((prevUserInput) => {
                // eslint-disable-next-line no-param-reassign
                prevUserInput[rowIndex] = currInput;
              });
              event.preventDefault();
            };
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
                        <TextField
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
      ))}
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

TextField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]).isRequired,
  onChange: PropTypes.func.isRequired,
};

TextField.defaultProps = {
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
