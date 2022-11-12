/* eslint-disable no-unused-vars */
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

const CollapsibleTableRow = (
  { key, summaryData, sheetData, schema, patches, userInput, setUserInput },
) => {
  const [open, setOpen] = useState(false);
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
            value={summaryData.suggestion}
            type={getColumnType(summaryData.column, schema)}
            permissibleValues={getPermissibleValues(summaryData.column, schema)}
          />
        </SheetCell>
        <SheetCell align="center">
          <Checkbox
            key={key}
            onChange={(event) => {
              setUserInput({
                ...userInput,
                [key]: event.target.checked,
              });
            }}
            checked={userInput[key]}
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
  key: PropTypes.string.isRequired,
  summaryData: PropTypes.shape({
    column: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    suggestion: PropTypes.string,
    rows: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  sheetData: PropTypes.objectOf(PropTypes.string).isRequired,
  schema: PropTypes.objectOf(PropTypes.string).isRequired,
  patches: PropTypes.objectOf(PropTypes.string).isRequired,
  userInput: PropTypes.objectOf(PropTypes.string).isRequired,
  setUserInput: PropTypes.func.isRequired,
};

export default CollapsibleTableRow;
