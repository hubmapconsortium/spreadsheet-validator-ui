import { useParams } from 'react-router-dom';
import { FormControl, styled, TableHead, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import SheetCell from '../SheetCell';
import FilterInputField from '../FilterInputField';
import InputField from '../InputField';
import SearchableSelector from '../SearchableSelector';
import { getDataTypeForColumn, getLabelForColumn, getPermissibleValuesForColumn } from '../../../helpers/data-utils';
import { DATE, EMAIL, NUMBER, PHONE, TEXT, TIME, URL } from '../../../constants/ValueType';

const HeaderLabel = styled(Typography)({
  fontSize: '18px',
  fontWeight: 'bold',
  paddingBottom: '10px',
});

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
                            placeholder="Enter value..."
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
