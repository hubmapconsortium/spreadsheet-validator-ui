import { useState } from 'react';
import { Box, Checkbox, Collapse, IconButton, Stack, styled, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PropTypes from 'prop-types';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import SheetCell from '../DataSheet/SheetCell';
import WrappedText from '../DataSheet/WrappedText';
import InfoTooltip from './info-tooltip';
import { HeaderLabel, SheetTable } from './styled';
import { getColumnDescription, getColumnType, getPermissibleValues } from '../../helpers/data-utils';
import { BLACK, DARK_GRAY, LIGHT_GRAY, RED } from '../../constants/Color';
import { nullOnEmpty } from '../../helpers/string-utils';
import EditableSheetCell from './editable-sheet-cell';

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
  const targetColumnLabel = schema.columns[targetColumn].label;
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
          <Stack direction="row" gap={1}>
            <HeaderLabel>{targetColumnLabel}</HeaderLabel>
            <InfoTooltip title={getColumnDescription(targetColumn, schema)}>
              <InfoOutlinedIcon fontSize="small" />
            </InfoTooltip>
          </Stack>
        </SheetCell>
        <SheetCell key={`target-value-cell-${id}`}>
          <Box sx={{ display: 'flex' }}>
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
          </Box>
        </SheetCell>
        <EditableSheetCell
          key={`suggested-value-cell-${id}`}
          value={userInput[id]?.value || ''}
          type={getColumnType(targetColumn, schema)}
          permissibleValues={getPermissibleValues(targetColumn, schema)}
          inputRef={inputRef}
          onSave={(userValue) => {
            setUserInput((currentUserInput) => {
              // eslint-disable-next-line no-param-reassign
              currentUserInput[id] = {
                column: targetColumn,
                value: nullOnEmpty(userValue),
                rows,
                approved: true,
              };
            });
          }}
        />
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
            checked={userInput[id]?.approved || false}
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
                Spreadsheet Data
              </Typography>
              <SheetTable size="small">
                <SheetHeader>
                  {Object.keys(schema.columns).map((columnHeader) => {
                    const columnProperties = schema.columns[columnHeader];
                    const { name: columnName, label: columnLabel } = columnProperties;
                    return (
                      <SheetCell
                        key={`table-header-${columnName}`}
                        sx={{ textAlign: 'center', backgroundColor: LIGHT_GRAY, minWidth: '100px' }}
                      >
                        {columnLabel}
                      </SheetCell>
                    );
                  })}
                </SheetHeader>
                <SheetBody>
                  {records.map((record, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TableRow key={`table-${targetColumn}-row-${record.rowNumber}`}>
                      {Object.keys(schema.columns).map((columnHeader) => {
                        const columnProperties = schema.columns[columnHeader];
                        const { name: columnName } = columnProperties;
                        return (
                          <SheetCell
                            // eslint-disable-next-line react/no-array-index-key
                            key={`table-cell-row-${index}-column-${columnName}`}
                            sx={{ textAlign: 'center' }}
                            align="right"
                          >
                            <WrappedText
                              text={record[columnName]}
                              color={columnName === targetColumn ? RED : BLACK}
                            />
                          </SheetCell>
                        );
                      })}
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
    id: PropTypes.string.isRequired,
    column: PropTypes.string.isRequired,
    value: PropTypes.oneOfType(
      [PropTypes.string, PropTypes.number, PropTypes.bool],
    ).isRequired,
    repairSuggestion: PropTypes.oneOfType(
      [PropTypes.string, PropTypes.number, PropTypes.bool],
    ),
    rows: PropTypes.arrayOf(PropTypes.number).isRequired,
    records: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
  }).isRequired,
  schema: PropTypes.oneOfType([PropTypes.object]).isRequired,
  userInput: PropTypes.shape({
    column: PropTypes.string,
    value: PropTypes.string,
    rows: PropTypes.arrayOf(PropTypes.number),
    approved: PropTypes.bool,
  }),
  inputRef: PropTypes.oneOfType([PropTypes.object]),
  setUserInput: PropTypes.func.isRequired,
};

CollapsibleTableRow.defaultProps = {
  inputRef: undefined,
  userInput: undefined,
};

export default CollapsibleTableRow;
