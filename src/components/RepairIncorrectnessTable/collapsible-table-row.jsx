import { useState } from 'react';
import { Box, Checkbox, Collapse, IconButton, styled, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import SheetCell from '../DataSheet/SheetCell';
import WrappedText from '../DataSheet/WrappedText';
import EditableCell from './editable-cell';
import { SheetTable } from './styled';
import { getColumnType, getPermissibleValues, isColumnRequired } from '../../helpers/data-utils';
import { BLACK, DARK_GRAY, LIGHT_GRAY, RED } from '../../constants/Color';

const CellValue = styled(Typography)({
  fontSize: '17px',
});

const printFrequency = (rows) => {
  const frequency = rows.length;
  return (frequency === 1) ? `(${frequency} cell)` : `(${frequency} cells)`;
};

// eslint-disable-next-line max-len
const CollapsibleTableRow = ({ rowData, schema, inputRef, userInput, setUserInput }) => {
  const [open, setOpen] = useState(false);
  const { id, column: targetColumn, value, rows, records } = rowData;
  return (
    <>
      <TableRow key={`summary-row-${id}`}>
        <SheetCell key={`expand-icon-cell-${id}`}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </SheetCell>
        <SheetCell key={`target-column-cell-${id}`}>
          <CellValue>{targetColumn}</CellValue>
        </SheetCell>
        <SheetCell key={`target-value-cell-${id}`}>
          <CellValue sx={{ display: 'flex' }}>
            <CellValue>{value}</CellValue>
            &nbsp;
            <CellValue
              sx={{
                fontStyle: 'italic',
                fontSize: '12pt',
                color: DARK_GRAY,
              }}
            >
              {printFrequency(rows)}
            </CellValue>
          </CellValue>
        </SheetCell>
        <SheetCell key={`suggested-value-cell-${id}`}>
          <EditableCell
            value={userInput[id]?.value || ''}
            type={getColumnType(targetColumn, schema)}
            required={isColumnRequired(targetColumn, schema)}
            permissibleValues={getPermissibleValues(targetColumn, schema)}
            inputRef={inputRef}
            handleInputChange={(event) => {
              const { value: userValue } = event.target;
              if (userValue !== '') {
                setUserInput((currentUserInput) => {
                  // eslint-disable-next-line no-param-reassign
                  currentUserInput[id] = {
                    column: targetColumn,
                    value: userValue,
                    rows,
                    approved: true,
                  };
                });
              }
            }}
          />
        </SheetCell>
        <SheetCell key={`approved-cell-${id}`} align="center">
          <Checkbox
            key={`checkbox-${id}`}
            onChange={(event) => {
              const { checked: approved } = event.target;
              setUserInput((currentUserInput) => {
                // eslint-disable-next-line no-param-reassign
                currentUserInput[id] = {
                  column: targetColumn,
                  value: userInput[id].value,
                  rows,
                  approved,
                };
              });
            }}
            checked={userInput?.approved || false}
          />
        </SheetCell>
      </TableRow>
      <TableRow key={`table-row-${id}`}>
        <SheetCell
          key={`collapse-cell-span-${id}`}
          sx={{
            border: 0,
            paddingBottom: 0,
            paddingTop: 0,
            overflowY: 'auto',
            overflowX: 'auto',
            maxHeight: '400px',
            maxWidth: '1100px',
          }}
          colSpan={5}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 1, marginBottom: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sheet Data
              </Typography>
              <SheetTable size="small">
                <SheetHeader>
                  {Object.keys(schema.columns).map((columnHeader) => (
                    <SheetCell
                      key={`table-header-${columnHeader}`}
                      sx={{ backgroundColor: LIGHT_GRAY }}
                    >
                      {columnHeader}
                    </SheetCell>
                  ))}
                </SheetHeader>
                <SheetBody>
                  {records.map((record, index) => (
                    <TableRow>
                      {Object.keys(schema.columns).map((columnHeader) => (
                        <SheetCell
                          // eslint-disable-next-line react/no-array-index-key
                          key={`table-cell-row-${index}-column-${columnHeader}`}
                          align="right"
                        >
                          <WrappedText
                            text={record[columnHeader]}
                            color={columnHeader === targetColumn ? RED : BLACK}
                          />
                        </SheetCell>
                      ))}
                    </TableRow>
                  ))}
                </SheetBody>
              </SheetTable>
            </Box>
          </Collapse>
        </SheetCell>
      </TableRow>
    </>
  );
};

CollapsibleTableRow.propTypes = {
  rowData: PropTypes.shape({
    id: PropTypes.string,
    column: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    suggestion: PropTypes.string,
    rows: PropTypes.arrayOf(PropTypes.number).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    records: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  schema: PropTypes.object.isRequired,
  userInput: PropTypes.shape({
    column: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.arrayOf(PropTypes.number),
    approved: PropTypes.bool,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  inputRef: PropTypes.object,
  setUserInput: PropTypes.func.isRequired,
};

CollapsibleTableRow.defaultProps = {
  inputRef: undefined,
  userInput: undefined,
};

export default CollapsibleTableRow;
