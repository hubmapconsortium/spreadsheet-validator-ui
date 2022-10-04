import { styled } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Container from '../../styles/Container';
import { LIGHT_GRAY } from '../../constants/Color';

const PageContainer = styled(Container)({
  width: '90vw',
  padding: '50px',
  backgroundColor: LIGHT_GRAY,
});

const ContentArea = () => (
  <PageContainer>
    <Outlet />
  </PageContainer>
);

export default ContentArea;
