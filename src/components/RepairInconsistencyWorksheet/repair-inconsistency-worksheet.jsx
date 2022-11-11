import { useContext, useMemo, useState } from 'react';
import { Checkbox, styled, TableRow, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import AppContext from '../../pages/AppContext';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import SheetCell from '../DataSheet/SheetCell';
import HeaderWithCheckbox from './header-with-checkbox';
import EditableCell from './editable-cell';
import { DataSheetCard, HeaderLabel, SheetTable, SheetTableContainer } from './styled';
import { buildRepairInconsistencyTableData } from '../../helpers/app-utils';
import { getColumnType, getPermissibleValues } from '../../helpers/data-utils';
import { generateFalses } from '../../helpers/array-utils';
import { DARK_GRAY } from '../../constants/Color';

const CellValue = styled(Typography)({
  fontSize: '17px',
});

const printFrequency = (rows) => {
  const frequency = rows.length;
  return (frequency === 1) ? `(${frequency} cell)` : `(${frequency} cells)`;
};

const RepairInconsistencyWorksheet = ({ inconsistencyType }) => {
  const { appData } = useContext(AppContext);
  const { schema, reporting } = appData;
  const [userInput, setUserInput] = useState(generateFalses(5));
  const tableData = useMemo(
    () => buildRepairInconsistencyTableData(reporting[inconsistencyType]),
    [inconsistencyType],
  );
  return (
    <DataSheetCard>
      <SheetTableContainer>
        <SheetTable stickyHeader>
          <SheetHeader>
            <SheetCell align="center" width="33%">
              <HeaderLabel>Column name</HeaderLabel>
            </SheetCell>
            <SheetCell align="center" width="33%">
              <HeaderLabel>Cell value</HeaderLabel>
            </SheetCell>
            <SheetCell align="center" width="30%">
              <HeaderLabel>Suggested value</HeaderLabel>
            </SheetCell>
            <HeaderWithCheckbox
              label="Accept?"
              handleAcceptAll={(event) => {
                setUserInput(userInput.map(() => event.target.checked));
              }}
            />
          </SheetHeader>
          <SheetBody>
            {tableData.map((item, index) => (
              <TableRow>
                <SheetCell>
                  <CellValue>{item.column}</CellValue>
                </SheetCell>
                <SheetCell>
                  <CellValue sx={{ display: 'flex' }}>
                    <CellValue>{item.value}</CellValue>
                    &nbsp;
                    <CellValue
                      sx={{
                        fontStyle: 'italic',
                        fontSize: '12pt',
                        color: DARK_GRAY,
                      }}
                    >
                      {printFrequency(item.rows)}
                    </CellValue>
                  </CellValue>
                </SheetCell>
                <SheetCell>
                  <EditableCell
                    value={item.suggestion}
                    type={getColumnType(item.column, schema)}
                    permissibleValues={getPermissibleValues(item.column, schema)}
                  />
                </SheetCell>
                <SheetCell align="center">
                  <Checkbox
                    key={`${item.column}-${item.value}`}
                    onChange={(event) => {
                      const newUserInput = [...userInput];
                      newUserInput[index] = event.target.checked;
                      setUserInput(newUserInput);
                    }}
                    checked={userInput[index]}
                  />
                </SheetCell>
              </TableRow>
            ))}
          </SheetBody>
        </SheetTable>
      </SheetTableContainer>
    </DataSheetCard>
  );
};

RepairInconsistencyWorksheet.propTypes = {
  inconsistencyType: PropTypes.string.isRequired,
};

export default RepairInconsistencyWorksheet;
