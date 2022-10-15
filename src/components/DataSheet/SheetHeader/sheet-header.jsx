import { FormControl, OutlinedInput, IconButton, InputAdornment, styled, TableHead, TableRow, Typography } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import PropTypes from 'prop-types';
import SheetCell from '../SheetCell';
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

const TextField = ({ type }) => (
  <FormControl fullWidth>
    <OutlinedInput
      hiddenLabel
      type={type}
      size="small"
      placeholder="Enter value..."
    />
  </FormControl>
);

const getColumnLabel = (column, metadata) => (
  metadata.spreadsheet.columns[column].label
);

const getColumnType = (column, metadata) => (
  metadata.spreadsheet.columns[column].type
);

const SheetHeader = ({ metadata, columnOrder }) => (
  <TableHead>
    <TableRow>
      {columnOrder.map((column, index) => (
        <>
          {index === 0
            && (
              <SheetCell align="center" sticky>
                <HeaderLabel>{getColumnLabel(column, metadata)}</HeaderLabel>
                <TextField type={getColumnType(column, metadata)} />
              </SheetCell>
            )}
          {index !== 0
            && (
              <SheetCell align="center">
                <HeaderLabel>{getColumnLabel(column, metadata)}</HeaderLabel>
                <FilterTextField type={getColumnType(column, metadata)} />
              </SheetCell>
            )}
        </>
      ))}
    </TableRow>
  </TableHead>
);

FilterTextField.propTypes = {
  type: PropTypes.string.isRequired,
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
