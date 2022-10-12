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

const SheetHeader = ({ metadata, data }) => (
  <TableHead>
    <TableRow>
      {data.headers.map((header, index) => (
        <SheetCell align="center" sticky={index === 0}>
          <HeaderLabel>{header.label}</HeaderLabel>
          {header.enableFilter
            && <FilterTextField type={metadata.columns[index].type} />}
          {header.enableEditByColumn
            && <TextField type={metadata.columns[index].type} />}
        </SheetCell>
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
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.oneOf(TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE).isRequired,
        categorical: PropTypes.bool.isRequired,
        possibleValues: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
      }),
    ),
  }).isRequired,
  data: PropTypes.shape({
    headers: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        enableFilter: PropTypes.bool.isRequired,
        enableEditByColumn: PropTypes.bool.isRequired,
      }),
    ),
  }).isRequired,
};

export default SheetHeader;
