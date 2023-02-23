import { useNavigate } from 'react-router-dom';
import { Chip, Button, styled, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';
import Panel from '../../styles/Panel';
import { BLACK, GREEN, LIGHT_GREEN, RED, LIGHT_RED, WHITE } from '../../constants/Color';

const MenuStyleButton = styled(Button)({
  border: '2px solid',
  width: '100%',
  height: '60px',
  borderRadius: '10px',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'flex-start',
});

const Title = styled(Typography)({
  fontSize: '14pt',
  color: BLACK,
  padding: '5px',
  wordBreak: 'break-word',
  textTransform: 'none',
});

const FilledCheckIcon = styled(CheckCircleIcon)({
  fontSize: '40px',
  verticalAlign: 'middle',
  color: GREEN,
});

const ActionButton = ({ title, errorCount, navigateTo }) => {
  const navigate = useNavigate();
  return (
    <MenuStyleButton
      onClick={() => navigate(navigateTo)}
      sx={{
        bgcolor: WHITE,
        borderColor: errorCount === 0 ? GREEN : RED,
        '&:hover': {
          backgroundColor: errorCount === 0 ? LIGHT_GREEN : LIGHT_RED,
        },
      }}
    >
      <Panel sx={{ width: '100%', justifyContent: 'space-between' }}>
        <Title>{title}</Title>
        {errorCount === 0
          ? <FilledCheckIcon />
          : (
            <Chip
              label={errorCount}
              color="primary"
              size="medium"
              sx={{ fontSize: '12pt', bgcolor: RED, marginRight: '10px' }}
            />
          )}
      </Panel>
    </MenuStyleButton>
  );
};

ActionButton.propTypes = {
  title: PropTypes.string.isRequired,
  errorCount: PropTypes.number.isRequired,
  navigateTo: PropTypes.string.isRequired,
};

export default ActionButton;
