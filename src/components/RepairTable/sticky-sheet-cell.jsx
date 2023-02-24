import { FormControl } from '@mui/material';
import PropTypes from 'prop-types';
import SheetCell from '../DataSheet/SheetCell';
import InputField from '../DataSheet/InputField';
import SearchableSelector from '../DataSheet/SearchableSelector';
import { nullOnEmpty } from '../../helpers/string-utils';
import { LIGHT_RED } from '../../constants/Color';
import { DATE, EMAIL, NUMBER, PHONE, STRING, TIME } from '../../constants/ValueType';

const StickySheetCell = ({ id, row, value, type, permissibleValues, inputRef, setUserInput }) => (
  <SheetCell key={id} sx={{ zIndex: 998 }} sticky>
    <FormControl fullWidth>
      {permissibleValues && permissibleValues.length > 0
        ? (
          <SearchableSelector
            value={value}
            options={permissibleValues}
            onChange={(event, newValue) => {
              setUserInput((currentUserInput) => {
                // eslint-disable-next-line no-param-reassign
                currentUserInput[row] = nullOnEmpty(newValue);
              });
            }}
            colorOnEmpty={LIGHT_RED}
          />
        )
        : (
          <InputField
            required
            value={value}
            type={type}
            inputRef={inputRef}
            onChange={(event) => {
              const newValue = event.target.value;
              setUserInput((currentUserInput) => {
                // eslint-disable-next-line no-param-reassign
                currentUserInput[row] = nullOnEmpty(newValue);
              });
            }}
            colorOnEmpty={LIGHT_RED}
          />
        )}
    </FormControl>
  </SheetCell>
);

StickySheetCell.propTypes = {
  id: PropTypes.string,
  row: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.oneOf([STRING, NUMBER, DATE, TIME, EMAIL, URL, PHONE]),
  permissibleValues: PropTypes.arrayOf(PropTypes.string),
  // eslint-disable-next-line react/forbid-prop-types
  inputRef: PropTypes.object.isRequired,
  setUserInput: PropTypes.func.isRequired,
};

StickySheetCell.defaultProps = {
  id: undefined,
  type: STRING,
  permissibleValues: undefined,
};

export default StickySheetCell;
