import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Container from '../../styles/Container';

const PageContainer = styled(Container)({
  width: '90vw',
  padding: '50px',
  backgroundColor: '#f2f2f2',
});

const ContentArea = () => (
  <PageContainer>
    <Outlet />
  </PageContainer>
);

export default ContentArea;
