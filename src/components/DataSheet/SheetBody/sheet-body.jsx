import { FormControl, OutlinedInput, MenuItem, Select, styled, TableBody, TableRow, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import SheetCell from '../SheetCell';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME, URL } from '../../../constants/ValueType';
import { LIGHT_RED } from '../../../constants/Color';

const CellValue = styled(Typography)({
  fontSize: '17px',
});

const DropDownSelector = ({ options }) => (
  <Select
    id="test"
    // onChange={handleChange}
    sx={{ backgroundColor: LIGHT_RED }}
  >
    {Object.keys(options).map((option) => (
      <MenuItem value={option}>{option}</MenuItem>
    ))}
  </Select>
);

const TextField = ({ value, type }) => (
  <OutlinedInput
    hiddenLabel
    variant="standard"
    size="small"
    value={value != null ? value : ''}
    type={type}
    sx={{ backgroundColor: LIGHT_RED }}
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

const getPermissibleValues = (column, metadata) => (
  metadata.spreadsheet.columns[column].permissibleValue
);

const getColumnType = (column, metadata) => (
  metadata.spreadsheet.columns[column].type
);

const SheetBody = ({ metadata, data, columnOrder }) => (
  <TableBody>
    {data.map((row) => (
      <TableRow>
        {columnOrder.map((column, index) => (
          <>
            {index === 0
              && (
                <SheetCell sx={{ zIndex: 998 }} sticky>
                  <FormControl fullWidth>
                    {getPermissibleValues(column, metadata)
                      && <DropDownSelector options={getPermissibleValues(column, metadata)} />}
                    {!getPermissibleValues(column, metadata)
                      && <TextField value={row[column]} type={getColumnType(column, metadata)} />}
                  </FormControl>
                </SheetCell>
              )}
            {index !== 0
              && (
                <SheetCell align="right">
                  <WrappedText text={row[column]} />
                </SheetCell>
              )}
          </>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

DropDownSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.object),
  ).isRequired,
};

TextField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.oneOf([TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE]).isRequired,
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
};

export default SheetBody;
