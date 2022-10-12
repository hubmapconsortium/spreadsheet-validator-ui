import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Help from './pages/Help';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import RepairIncompleteness from './pages/RepairIncompleteness';
import RepairIncompletenessWorkspace from './pages/RepairIncompletenessWorkspace';
import RepairInconsistency from './pages/RepairInconsistency';

const DefaultContainer = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const DashboardContainer = () => (
  <Outlet />
);

const App = () => (
  <Router>
    <Routes>
      <Route element={<DefaultContainer />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="help" element={<Help />} />
      </Route>
      <Route element={<DashboardContainer />}>
        <Route path="dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="repair-incompleteness" element={<RepairIncompleteness />} />
          <Route path="repair-incompleteness/:id" element={<RepairIncompletenessWorkspace />} />
          <Route path="repair-inconsistency" element={<RepairInconsistency />} />
        </Route>
      </Route>
    </Routes>

  </Router>
);

export default App;
