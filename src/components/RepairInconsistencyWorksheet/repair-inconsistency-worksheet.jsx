import { useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../pages/AppContext';
import SheetHeader from '../DataSheet/SheetHeader';
import SheetBody from '../DataSheet/SheetBody';
import SheetCell from '../DataSheet/SheetCell';
import HeaderWithCheckbox from './header-with-checkbox';
import { DataSheetCard, HeaderLabel, SheetTable, SheetTableContainer } from './styled';
import { buildInconsistencySummaryData } from '../../helpers/app-utils';
import CollapsibleTableRow from './collapsible-table-row';

const RepairInconsistencyWorksheet = ({ inconsistencyType }) => {
  const { appData, patches } = useContext(AppContext);
  const { data, schema, reporting } = appData;
  const [userInput, setUserInput] = useState({});
  const inconsistencySummaryData = useMemo(
    () => buildInconsistencySummaryData(reporting[inconsistencyType]),
    [inconsistencyType],
  );
  return (
    <DataSheetCard>
      <SheetTableContainer>
        <SheetTable stickyHeader>
          <SheetHeader>
            <SheetCell />
            <SheetCell align="center" width="30%">
              <HeaderLabel>Column name</HeaderLabel>
            </SheetCell>
            <SheetCell align="center" width="30%">
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
            {inconsistencySummaryData.map((summaryItem) => (
              <CollapsibleTableRow
                key={`${summaryItem.column}-${summaryItem.value}`}
                summaryData={summaryItem}
                sheetData={data}
                schema={schema}
                pathces={patches}
                userInput={userInput}
                setUserInput={setUserInput}
              />
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
