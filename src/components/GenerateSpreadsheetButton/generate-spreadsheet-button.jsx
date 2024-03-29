import { useContext, useEffect, useState } from 'react';
import { AppBar, Container, Slide, styled, Toolbar } from '@mui/material';
import AppContext from '../../pages/AppContext';
import BaseButton from '../../styles/BaseButton';
import { generateNewCsv, generateNewSpreadsheet, isRepairCompleted } from '../../helpers/app-utils';
import { WHITE, LIME, LIGHT_LIME } from '../../constants/Color';

const GenerateButton = styled(BaseButton)({
  width: '350px',
  variant: 'contained',
  backgroundColor: LIGHT_LIME,
  color: WHITE,
  '&:hover': {
    backgroundColor: LIME,
  },
});

const GenerateSpreadsheetButton = () => {
  const { appData, patches } = useContext(AppContext);
  const { data, reporting, otherProps } = appData;
  const { templateMetadata: metadata } = otherProps;

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
            <GenerateButton onClick={() => {
              generateNewCsv(data, patches);
              generateNewSpreadsheet(data, metadata, patches);
            }}
            >
              Generate Repaired Spreadsheet
            </GenerateButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
};

export default GenerateSpreadsheetButton;
