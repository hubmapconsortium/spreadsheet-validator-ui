import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { getOverviewTitle } from '../../../helpers/title-utils';
import { OVERVIEW_PATH } from '../../../constants/Router';

const OverviewNavMenu = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      size="small"
      color="inherit"
      sx={{ marginRight: '10px' }}
      onClick={() => {
        navigate(OVERVIEW_PATH);
      }}
    >
      {getOverviewTitle()}
    </IconButton>
  );
};

export default OverviewNavMenu;
