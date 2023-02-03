import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Container from '../../styles/Container';

const PageContainer = styled(Container)({
  display: 'flex',
  width: '80vw',
  paddingTop: '35px',
  paddingBottom: '35px',
  margin: 'auto',
  justifyContent: 'center',
});

const ContentArea = () => (
  <PageContainer>
    <Outlet />
  </PageContainer>
);

export default ContentArea;
