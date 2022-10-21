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

const DropDownSelector = ({ options }) => (
  <Select
    id="test"
    // onChange={handleChange}
    sx={{ height: '40px' }}
  >
    {Object.keys(options).map((option) => (
      <MenuItem value={option}>{option}</MenuItem>
    ))}
  </Select>
);

const TextField = ({ type }) => (
  <OutlinedInput
    hiddenLabel
    type={type}
    size="small"
    placeholder="Enter value..."
  />
);

const SheetHeader = ({ metadata, columnOrder }) => (
  <TableHead>
    <TableRow>
      {columnOrder.map((column, index) => {
        const columnLabel = getLabelForColumn(column, metadata);
        const columnType = getDataTypeForColumn(column, metadata);
        const permissibleValues = getPermissibleValuesForColumn(column, metadata);
        return (
          <>
            {index === 0
              && (
                <SheetCell align="center" sticky>
                  <HeaderLabel>{columnLabel}</HeaderLabel>
                  <FormControl fullWidth>
                    {permissibleValues && <DropDownSelector options={permissibleValues} />}
                    {!permissibleValues && <TextField type={columnType} />}
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
  options: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.object),
  ).isRequired,
};

TextField.propTypes = {
  type: PropTypes.string.isRequired,
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
};

export default SheetHeader;
