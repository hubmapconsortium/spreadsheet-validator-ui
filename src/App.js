import { useReducer, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Help from './pages/Help';
import Overview from './pages/Overview';
import RepairIncompleteness from './pages/RepairIncompleteness';
import RepairIncompletenessWorkspace from './pages/RepairIncompletenessWorkspace';
import RepairInconsistency from './pages/RepairInconsistency';
import AppContext from './pages/AppContext';
import Navbar from './components/Navbar';
import SideBar from './components/Sidebar';
import ContentArea from './components/ContentArea';
import { handlePatchCrud } from './helpers/app-utils';
import { ABOUT_PATH, HELP_PATH, HOME_PATH, OVERVIEW_PATH, REPAIR_INCOMPLENESS_PATH, REPAIR_INCONSISTENCY_PATH } from './constants/Router';

const LandingPageContainer = () => (
  <Stack direction="column">
    <Navbar />
    <Outlet />
  </Stack>
);

const WorkspaceContainer = ({ appData }) => {
  const [patches, managePatches] = useReducer(handlePatchCrud, []);
  const appContextData = useMemo(() => ({ appData, patches, managePatches }), [patches]);
  return (
    <AppContext.Provider value={appContextData}>
      <Stack direction="row">
        <SideBar />
        <ContentArea />
      </Stack>
    </AppContext.Provider>
  );
};

WorkspaceContainer.propTypes = {
  appData: PropTypes.shape({
    schema: PropTypes.oneOfType([PropTypes.object]).isRequired,
    data: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object]),
    ).isRequired,
    reporting: PropTypes.oneOfType([PropTypes.object]).isRequired,
  }).isRequired,
};

const App = () => {
  const [appData, setAppData] = useState({ schema: {}, data: [], reporting: {} });
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
          <Route path={REPAIR_INCOMPLENESS_PATH} element={<RepairIncompleteness />} />
          <Route path={`${REPAIR_INCOMPLENESS_PATH}/:incompleteColumn`} element={<RepairIncompletenessWorkspace />} />
          <Route path={REPAIR_INCONSISTENCY_PATH} element={<RepairInconsistency />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
