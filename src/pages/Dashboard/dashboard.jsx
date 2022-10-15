import { Stack } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import ContentArea from '../../components/ContentArea';
import AppContext from '../AppContext';
import { APP_CONTEXT } from '../../constants/TestData';

const Dashboard = () => (
  <AppContext.Provider value={APP_CONTEXT}>
    <Stack direction="row">
      <Sidebar />
      <ContentArea />
    </Stack>
  </AppContext.Provider>
);

export default Dashboard;
