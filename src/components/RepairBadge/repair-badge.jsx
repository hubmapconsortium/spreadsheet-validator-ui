import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';
import { BLACK, DARK_GRAY, GREEN, LIGHT_GREEN, LIGHT_RED, RED, WHITE } from '../../constants/Color';
import { REPAIR_COMPLETED, REPAIR_NOT_COMPLETED } from '../../constants/Status';

const BadgeButton = styled(Button)({
  border: '6px solid',
  width: '180px',
  height: '200px',
  borderRadius: '25px',
  display: 'block',
});

const RedBadgeButton = styled(BadgeButton)({
  borderColor: RED,
  backgroundColor: WHITE,
  '&:hover': {
    backgroundColor: LIGHT_RED,
  },
});

const GreenBadgeButton = styled(BadgeButton)({
  borderColor: GREEN,
  backgroundColor: LIGHT_GREEN,
  '&:hover': {
    backgroundColor: LIGHT_GREEN,
  },
});

const TitleBox = styled(Box)({
  height: '80px',
  margin: '0px',
  padding: '0px',
});

const CaptionBox = styled(Box)({
  height: 'auto',
  margin: '0px',
  padding: '0px',
});

const FilledCheckIcon = styled(CheckCircleIcon)({
  fontSize: '50px',
  verticalAlign: 'middle',
  color: GREEN,
});

const TitleLabel = styled(Typography)({
  fontSize: '14pt',
  lineHeight: '20px',
  color: BLACK,
  padding: '5px',
  wordBreak: 'break-word',
  textTransform: 'none',
});

const CaptionLabel = styled(Typography)({
  fontSize: '12pt',
  lineHeight: '20px',
  color: DARK_GRAY,
  padding: '10px',
  textTransform: 'none',
});

// eslint-disable-next-line react/prop-types
const Title = ({ text }) => (
  <TitleBox>
    <TitleLabel>{text}</TitleLabel>
  </TitleBox>
);

// eslint-disable-next-line react/prop-types
const Caption = ({ text }) => (
  <CaptionBox>
    <CaptionLabel>{text}</CaptionLabel>
  </CaptionBox>
);

const CheckIcon = () => (
  <CaptionBox>
    <FilledCheckIcon />
  </CaptionBox>
);

const RepairBadge = ({ data }) => {
  const navigate = useNavigate();
  const { key, title, subtitle, status: repairStatus, navigateTo } = data;
  return (
    <>
      {repairStatus === REPAIR_NOT_COMPLETED && (
        <RedBadgeButton onClick={() => {
          navigate(navigateTo, {
            state: { key },
          });
        }}
        >
          <Stack direction="column" alignItems="center" spacing={0}>
            <Title text={title} />
            <Caption text={subtitle} />
          </Stack>
        </RedBadgeButton>
      )}
      {repairStatus === REPAIR_COMPLETED && (
        <GreenBadgeButton onClick={() => {
          navigate(navigateTo, {
            state: { key },
          });
        }}
        >
          <Stack direction="column" alignItems="center" spacing={0}>
            <Title title={title} />
            <CheckIcon />
          </Stack>
        </GreenBadgeButton>
      )}
    </>
  );
};

RepairBadge.propTypes = {
  data: PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    status: PropTypes.oneOf([REPAIR_NOT_COMPLETED, REPAIR_COMPLETED]).isRequired,
    navigateTo: PropTypes.string.isRequired,
  }).isRequired,
};

export default RepairBadge;
