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
    value={value}
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
    <CellValue noWrap="true">{text}</CellValue>
  </Tooltip>
);

const SheetBody = ({ metadata, data }) => (
  <TableBody>
    {data.rows.map((row) => (
      <TableRow>
        {Object.values(row).map((value, index) => {
          const columnMetadata = metadata.columns[index];
          const cellComponent = (index === 0)
            ? (
              <SheetCell sx={{ zIndex: 998 }} sticky>
                <FormControl fullWidth>
                  {metadata.columns[index].categorical
                    && <DropDownSelector options={columnMetadata.possibleValues} />}
                  {!metadata.columns[index].categorical
                    && <TextField value={value} type={columnMetadata.type} />}
                </FormControl>
              </SheetCell>
            ) : (
              <SheetCell align="right">
                <WrappedText text={value} />
              </SheetCell>
            );
          return cellComponent;
        })}
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
  value: PropTypes.oneOfType(PropTypes.string, PropTypes.number).isRequired,
  type: PropTypes.oneOf(TEXT, NUMBER, DATE, TIME, EMAIL, URL, PHONE).isRequired,
};

WrappedText.propTypes = {
  text: PropTypes.oneOfType(PropTypes.string, PropTypes.number).isRequired,
};

SheetBody.propTypes = {
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
    rows: PropTypes.arrayOf(
      PropTypes.objectOf(PropTypes.object),
    ),
  }).isRequired,
};

export default SheetBody;
