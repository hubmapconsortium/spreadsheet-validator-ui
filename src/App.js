import { useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import { Stack, styled } from '@mui/material';
import PropTypes from 'prop-types';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Help from './pages/Help';
import Overview from './pages/Overview';
import CompletenessErrorOverview from './pages/CompletenessErrorOverview';
import AdherenceErrorOverview from './pages/AdherenceErrorOverview';
import CompletenessErrorRepair from './pages/CompletenessErrorRepair';
import AdherenceErrorRepair from './pages/AdherenceErrorRepair';
import Container from './styles/Container';
import AppContext from './pages/AppContext';
import Navbar from './components/Navbar';
import ContentArea from './components/ContentArea';
import PageFooter from './components/PageFooter';
import GenerateSpreadsheetButton from './components/GenerateSpreadsheetButton';
import { generateEmptyObjects } from './helpers/array-utils';
import { ABOUT_PATH, HELP_PATH, HOME_PATH, OVERVIEW_PATH, COMPLETENESS_ERROR_PATH, ADHERENCE_ERROR_PATH } from './constants/Router';
import { BLACK, LIGHTER_GRAY } from './constants/Color';

const MainContainer = styled(Container)({
  backgroundColor: LIGHTER_GRAY,
});

const NavLink = styled(Link)({
  fontSize: '14pt',
  fontStyle: 'normal',
  '&:link': {
    textDecoration: 'none',
    color: BLACK,
  },
  '&:visited': {
    textDecoration: 'none',
    color: BLACK,
  },
  '&:hover': {
    textDecoration: 'none',
  },
  '&:active': {
    textDecoration: 'none',
    color: BLACK,
  },
});

const LandingPageContainer = () => (
  <Stack direction="column">
    <Stack direction="row" spacing={4} sx={{ padding: '30px' }}>
      <NavLink to="about">About</NavLink>
      <NavLink to="help">Help</NavLink>
    </Stack>
    <Outlet />
  </Stack>
);

const WorkspaceContainer = ({ appData }) => {
  const { data } = appData;
  const initPatches = generateEmptyObjects(data.length);
  const [patches, updatePatches] = useImmer(initPatches);
  const appContextData = useMemo(() => ({ appData, patches, updatePatches }), [patches]);
  return (
    <AppContext.Provider value={appContextData}>
      <MainContainer>
        <Navbar />
        <ContentArea />
        <PageFooter />
        <GenerateSpreadsheetButton />
      </MainContainer>
    </AppContext.Provider>
  );
};

WorkspaceContainer.propTypes = {
  appData: PropTypes.shape({
    schema: PropTypes.oneOfType([PropTypes.object]).isRequired,
    data: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object]),
    ).isRequired,
    reporting: PropTypes.arrayOf(
      PropTypes.shape({
        row: PropTypes.number.isRequired,
        column: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        repairSuggestion: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
        errorType: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

const App = () => {
  const [appData, setAppData] = useState({ schema: {}, data: [], reporting: [] });
  return (
    <Router>
      <Routes>
        <Route element={<LandingPageContainer />}>
          <Route path={HOME_PATH} element={<Home setAppData={setAppData} />} />
          <Route path={ABOUT_PATH} element={<About />} />
          <Route path={HELP_PATH} element={<Help />} />
        </Route>
        <Route element={(<WorkspaceContainer appData={appData} />)}>
          <Route path={OVERVIEW_PATH} element={<Overview />} />
          <Route
            path={COMPLETENESS_ERROR_PATH}
            element={<CompletenessErrorOverview />}
          />
          <Route
            path={`${COMPLETENESS_ERROR_PATH}/:targetColumn`}
            element={<CompletenessErrorRepair />}
          />
          <Route
            path={ADHERENCE_ERROR_PATH}
            element={<AdherenceErrorOverview />}
          />
          <Route
            path={`${ADHERENCE_ERROR_PATH}/:errorType`}
            element={<AdherenceErrorRepair />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
