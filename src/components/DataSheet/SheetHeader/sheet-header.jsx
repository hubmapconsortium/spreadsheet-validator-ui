import { FormControl, OutlinedInput, IconButton, InputAdornment, styled, TableHead, TableRow, Typography, Select, MenuItem } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PropTypes from 'prop-types';
import SheetCell from '../SheetCell';
import { getDataTypeForColumn, getLabelForColumn, getPermissibleValuesForColumn } from '../../../helpers/data-utils';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME, URL } from '../../../constants/ValueType';

const HeaderLabel = styled(Typography)({
  fontSize: '18px',
  fontWeight: 'bold',
  paddingBottom: '10px',
});

const FilterTextField = ({ type }) => (
  <FormControl fullWidth>
    <OutlinedInput
      hiddenLabel
      type={type}
      size="small"
      placeholder="Filter text..."
      // onChange={}
      endAdornment={(
        <InputAdornment position="end">
          <IconButton
            // onClick={ }
            edge="end"
          >
            <FilterAltIcon />
          </IconButton>
        </InputAdornment>
      )}
    />
  </FormControl>
);

const DropDownSelector = ({ options, onChange }) => (
  <Select
    id="test"
    onChange={onChange}
    sx={{ height: '40px' }}
  >
    {Object.keys(options).map((option) => (
      <MenuItem value={option}>{option}</MenuItem>
    ))}
  </Select>
);

const TextField = ({ type, onChange }) => (
  <OutlinedInput
    hiddenLabel
    type={type}
    size="small"
    placeholder="Enter value..."
    onChange={onChange}
  />
);

const SheetHeader = ({ metadata, columnOrder, setBatchInput }) => (
  <TableHead>
    <TableRow>
      {columnOrder.map((column, index) => {
        const columnLabel = getLabelForColumn(column, metadata);
        const columnType = getDataTypeForColumn(column, metadata);
        const permissibleValues = getPermissibleValuesForColumn(column, metadata);
        const handleInputChange = (event) => {
          const userInput = event.target.value;
          setBatchInput(userInput);
          event.preventDefault();
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
                        <DropDownSelector
                          options={permissibleValues}
                          onChange={handleInputChange}
                        />
                      )}
                    {!permissibleValues
                      && (
                        <TextField
                          type={columnType}
                          onChange={handleInputChange}
                        />
                      )}
                  </FormControl>
                </SheetCell>
              )}
            {index !== 0
              && (
                <SheetCell align="center">
                  <HeaderLabel>{columnLabel}</HeaderLabel>
                  <FilterTextField type={columnType} />
                </SheetCell>
              )}
          </>
        );
      })}
    </TableRow>
  </TableHead>
);

FilterTextField.propTypes = {
  type: PropTypes.string.isRequired,
};

DropDownSelector.propTypes = {
  options: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

TextField.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

SheetHeader.propTypes = {
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
  columnOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  setBatchInput: PropTypes.func.isRequired,
};

export default SheetHeader;
