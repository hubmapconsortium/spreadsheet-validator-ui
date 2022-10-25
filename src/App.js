import { useMemo, useReducer, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
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
import handlePatchCrud from './helpers/app-utils';
import { ABOUT_PATH, HELP_PATH, HOME_PATH, OVERVIEW_PATH, REPAIR_INCOMPLENESS_PATH, REPAIR_INCONSISTENCY_PATH } from './constants/Router';
import { PATCH_DATA } from './constants/TestData';

const LandingPageContainer = () => (
  <Stack direction="column">
    <Navbar />
    <Outlet />
  </Stack>
);

// eslint-disable-next-line react/prop-types
const WorkspaceContainer = ({ appProviderData }) => (
  <AppContext.Provider value={appProviderData}>
    <Stack direction="row">
      <SideBar />
      <ContentArea />
    </Stack>
  </AppContext.Provider>
);

const App = () => {
  const [appData, setAppData] = useState({});
  const [patches, managePatches] = useReducer(handlePatchCrud, PATCH_DATA);
  const appProviderData = useMemo(() => ({ appData, patches, managePatches }), [appData, patches]);
  return (
    <Router>
      <Routes>
        <Route element={<LandingPageContainer />}>
          <Route path={HOME_PATH} element={<Home setAppData={setAppData} />} />
          <Route path={ABOUT_PATH} element={<About />} />
          <Route path={HELP_PATH} element={<Help />} />
        </Route>
        <Route element={(<WorkspaceContainer appProviderData={appProviderData} />)}>
          <Route path={OVERVIEW_PATH} element={<Overview />} />
          <Route path={REPAIR_INCOMPLENESS_PATH} element={<RepairIncompleteness />} />
          <Route path={`${REPAIR_INCOMPLENESS_PATH}/:column`} element={<RepairIncompletenessWorkspace />} />
          <Route path={REPAIR_INCONSISTENCY_PATH} element={<RepairInconsistency />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
