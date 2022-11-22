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
import { getColumnType, getDataValue, getPermissibleValues } from '../../helpers/data-utils';
import { BLACK, DARK_GRAY, LIGHT_GRAY, RED } from '../../constants/Color';

const CellValue = styled(Typography)({
  fontSize: '17px',
});

const printFrequency = (rows) => {
  const frequency = rows.length;
  return (frequency === 1) ? `(${frequency} cell)` : `(${frequency} cells)`;
};

// eslint-disable-next-line max-len
const CollapsibleTableRow = ({ summaryData, sheetData, schema, inputRef, userInput, setUserInput }) => {
  const [open, setOpen] = useState(false);
  const { key } = summaryData;
  return (
    <>
      <TableRow>
        <SheetCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </SheetCell>
        <SheetCell>
          <CellValue>{summaryData.column}</CellValue>
        </SheetCell>
        <SheetCell>
          <CellValue sx={{ display: 'flex' }}>
            <CellValue>{summaryData.value}</CellValue>
            &nbsp;
            <CellValue
              sx={{
                fontStyle: 'italic',
                fontSize: '12pt',
                color: DARK_GRAY,
              }}
            >
              {printFrequency(summaryData.rows)}
            </CellValue>
          </CellValue>
        </SheetCell>
        <SheetCell>
          <EditableCell
            value={userInput?.value}
            type={getColumnType(summaryData.column, schema)}
            permissibleValues={getPermissibleValues(summaryData.column, schema)}
            inputRef={inputRef}
            handleInputChange={(event) => {
              const userValue = event.target.value;
              setUserInput((currentUserInput) => {
                // eslint-disable-next-line no-param-reassign
                currentUserInput[key] = {
                  column: summaryData.column,
                  value: userValue,
                  rows: summaryData.rows,
                  approved: true,
                };
              });
            }}
          />
        </SheetCell>
        <SheetCell align="center">
          <Checkbox
            key={key}
            onChange={(event) => {
              const approved = event.target.checked;
              setUserInput((currentUserInput) => {
                // eslint-disable-next-line no-param-reassign
                currentUserInput[key] = {
                  column: summaryData.column,
                  value: userInput?.value,
                  rows: summaryData.rows,
                  approved,
                };
              });
            }}
            checked={userInput?.approved || false}
          />
        </SheetCell>
      </TableRow>
      <TableRow>
        <SheetCell
          sx={{
            border: 0,
            paddingBottom: 0,
            paddingTop: 0,
            overflowY: 'auto',
            overflowX: 'auto',
            maxHeight: '400px',
            maxWidth: '1100px',
          }}
          colspan={5}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 1, marginBottom: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sheet Data
              </Typography>
              <SheetTable size="small">
                <SheetHeader>
                  {Object.keys(schema.columns).map((columnName) => (
                    <SheetCell sx={{ backgroundColor: LIGHT_GRAY }}>
                      {columnName}
                    </SheetCell>
                  ))}
                </SheetHeader>
                <SheetBody>
                  {summaryData.rows.map((row) => (
                    <TableRow>
                      {Object.keys(schema.columns).map((column) => (
                        <SheetCell align="right">
                          <WrappedText
                            text={getDataValue(row, column, sheetData)}
                            color={column === summaryData.column ? RED : BLACK}
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
  summaryData: PropTypes.shape({
    key: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    suggestion: PropTypes.string,
    rows: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  sheetData: PropTypes.objectOf(PropTypes.string).isRequired,
  schema: PropTypes.objectOf(PropTypes.string).isRequired,
  userInput: PropTypes.shape({
    column: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    rows: PropTypes.arrayOf(PropTypes.number).isRequired,
    approved: PropTypes.bool.isRequired,
  }).isRequired,
  inputRef: PropTypes.func,
  setUserInput: PropTypes.func.isRequired,
};

CollapsibleTableRow.defaultProps = {
  inputRef: undefined,
};

export default CollapsibleTableRow;
