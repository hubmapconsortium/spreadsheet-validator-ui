import { useContext, useState } from 'react';
import { FormControl, OutlinedInput, MenuItem, Select, styled, TableBody, TableRow, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import AppContext from '../../../pages/AppContext';
import SheetCell from '../SheetCell';
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
    {Object.keys(options).map((option) => (
      <MenuItem value={option}>{option}</MenuItem>
    ))}
  </Select>
);

const TextField = ({ value, type, onChange }) => (
  <OutlinedInput
    hiddenLabel
    variant="standard"
    size="small"
    value={value != null ? value : ''}
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

const SheetBody = ({ metadata, data, columnOrder, rowFilter }) => {
  const { patches, managePatches } = useContext(AppContext);
  return (
    <TableBody>
      {rowFilter.map((rowIndex) => (
        <TableRow>
          {columnOrder.map((columnName, index) => {
            const permissibleValues = getPermissibleValuesForColumn(columnName, metadata);
            const columnType = getDataTypeForColumn(columnName, metadata);
            const initialInput = getPatchValue(rowIndex, columnName, patches);
            const [currentInput, setCurrentInput] = useState(initialInput);
            const handleUserInput = (event) => {
              const userInput = event.target.value;
              managePatches({
                command: 'CREATE_PATCH',
                patchOp: 'ADD',
                value: userInput,
                target: { row: rowIndex, column: columnName },
              });
              setCurrentInput(userInput);
              event.preventDefault();
            };
            return (
              <>
                {index === 0
                  && (
                    <SheetCell sx={{ zIndex: 998 }} sticky>
                      <FormControl fullWidth>
                        {permissibleValues
                          && (
                            <DropDownSelector
                              value={currentInput}
                              options={permissibleValues}
                              onChange={handleUserInput}
                            />
                          )}
                        {!permissibleValues
                          && (
                            <TextField
                              value={currentInput}
                              type={columnType}
                              onChange={handleUserInput}
                            />
                          )}
                      </FormControl>
                    </SheetCell>
                  )}
                {index !== 0
                  && (
                    <SheetCell align="right">
                      <WrappedText text={getTableValue(rowIndex, columnName, data)} />
                    </SheetCell>
                  )}
              </>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};

DropDownSelector.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.any),
  ).isRequired,
  onChange: PropTypes.func.isRequired,
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
