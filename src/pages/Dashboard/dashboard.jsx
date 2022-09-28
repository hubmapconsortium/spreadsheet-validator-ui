import { Stack } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import ContentArea from '../../components/ContentArea';

const Dashboard = () => (
  <Stack direction="row">
    <Sidebar />
    <ContentArea />
  </Stack>
);

export default Dashboard;
