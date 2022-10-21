import { useState } from 'react';
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

const LandingPageContainer = () => (
  <Stack direction="column">
    <Navbar />
    <Outlet />
  </Stack>
);

// eslint-disable-next-line react/prop-types
const WorkspaceContainer = ({ appData }) => (
  <AppContext.Provider value={appData}>
    <Stack direction="row">
      <SideBar />
      <ContentArea />
    </Stack>
  </AppContext.Provider>
);

const App = () => {
  const [appData, setAppData] = useState({});
  return (
    <Router>
      <Routes>
        <Route element={<LandingPageContainer />}>
          <Route path="/" element={<Home setAppData={setAppData} />} />
          <Route path="about" element={<About />} />
          <Route path="help" element={<Help />} />
        </Route>
        <Route element={<WorkspaceContainer appData={appData} />}>
          <Route path="overview" element={<Overview />} />
          <Route path="repair-incompleteness" element={<RepairIncompleteness />} />
          <Route path="repair-incompleteness/:column" element={<RepairIncompletenessWorkspace />} />
          <Route path="repair-inconsistency" element={<RepairInconsistency />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
