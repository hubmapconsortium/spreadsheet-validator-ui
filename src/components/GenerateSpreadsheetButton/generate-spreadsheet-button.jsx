import { useContext, useEffect, useState } from 'react';
import { AppBar, Container, Slide, Toolbar } from '@mui/material';
import BaseButton from '../../styles/BaseButton';
import { LIME } from '../../constants/Color';
import { isRepairCompleted } from '../../helpers/app-utils';
import AppContext from '../../pages/AppContext';

const GenerateSpreadsheetButton = () => {
  const { appData, patches } = useContext(AppContext);
  const { reporting } = appData;

  const [hide, setHide] = useState(true);

  useEffect(
    () => setHide(!isRepairCompleted(reporting, patches)),
    [reporting, patches],
  );

  return (
    <Slide appear={false} direction="up" in={!hide}>
      <AppBar position="fixed" component="div" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Container
          maxWidth="xl"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Toolbar disableGutters>
            <BaseButton
              sx={{ width: '350px', backgroundColor: LIME }}
              variant="contained"
            >
              Generate Repaired Spreadsheet
            </BaseButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};

export default GenerateSpreadsheetButton;
