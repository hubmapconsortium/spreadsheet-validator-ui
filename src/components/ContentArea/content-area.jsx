import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Container from '../../styles/Container';
import { LIGHTER_GRAY } from '../../constants/Color';

const PageContainer = styled(Container)({
  minHeight: '100vh',
  height: '100%',
  width: '100%',
  paddingTop: '35px',
  paddingBottom: '35px',
  paddingLeft: '50px',
  backgroundColor: LIGHTER_GRAY,
});

const ContentArea = () => (
  <PageContainer>
    <Outlet />
  </PageContainer>
);

export default ContentArea;
