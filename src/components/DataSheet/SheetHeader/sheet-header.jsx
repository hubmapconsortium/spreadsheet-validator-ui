import { useParams } from 'react-router-dom';
import { FormControl, OutlinedInput, IconButton, InputAdornment, styled, TableHead, TableRow, TextField, Typography, Autocomplete } from '@mui/material';
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

const FilterInputField = ({ type }) => (
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

const SearchableSelector = ({ options, onChange, onKeyPress }) => (
  <Autocomplete
    options={options}
    onChange={onChange}
    onKeyPress={onKeyPress}
    sx={{ height: '40px' }}
    getOptionLabel={(option) => option.label}
    // eslint-disable-next-line react/jsx-props-no-spreading
    renderInput={(params) => <TextField {...params} size="small" />}
  />
);

const InputField = ({ type, onChange, onKeyPress }) => (
  <OutlinedInput
    hiddenLabel
    type={type}
    size="small"
    placeholder="Enter value..."
    onChange={onChange}
    onKeyPress={onKeyPress}
  />
);

const SheetHeader = ({ metadata, columnOrder, setBatchInput }) => {
  const { column } = useParams();
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setBatchInput((prevBatchInput) => {
        // eslint-disable-next-line no-param-reassign
        prevBatchInput[column] = event.target.value;
      });
      event.preventDefault();
    }
  };
  return (
    <TableHead>
      <TableRow>
        {columnOrder.map((columnItem, index) => {
          const columnLabel = getLabelForColumn(columnItem, metadata);
          const columnType = getDataTypeForColumn(columnItem, metadata);
          const permissibleValues = getPermissibleValuesForColumn(columnItem, metadata);
          return (
            <>
              {index === 0
                && (
                  <SheetCell align="center" sticky>
                    <HeaderLabel>{columnLabel}</HeaderLabel>
                    <FormControl fullWidth>
                      {permissibleValues
                        && (
                          <SearchableSelector
                            options={permissibleValues}
                            onKeyPress={handleKeyPress}
                          />
                        )}
                      {!permissibleValues
                        && (
                          <InputField
                            type={columnType}
                            onKeyPress={handleKeyPress}
                          />
                        )}
                    </FormControl>
                  </SheetCell>
                )}
              {index !== 0
                && (
                  <SheetCell align="center">
                    <HeaderLabel>{columnLabel}</HeaderLabel>
                    <FilterInputField type={columnType} />
                  </SheetCell>
                )}
            </>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

FilterInputField.propTypes = {
  type: PropTypes.string.isRequired,
};

SearchableSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string),
  ).isRequired,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
};

SearchableSelector.defaultProps = {
  onChange: undefined,
  onKeyPress: undefined,
};

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
};

InputField.defaultProps = {
  onChange: undefined,
  onKeyPress: undefined,
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
