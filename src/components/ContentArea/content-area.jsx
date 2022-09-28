import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import './content-area.css';

const PageSpace = styled(Box)({
  width: '90vw',
  height: '90vh',
  padding: '50px',
  backgroundColor: '#f2f2f2',
});

const ContentArea = () => (
  <PageSpace>
    <Outlet />
  </PageSpace>
);

export default ContentArea;
