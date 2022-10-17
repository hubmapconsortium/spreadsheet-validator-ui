import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';
import { BLACK, DARK_GRAY, GREEN, LIGHT_GREEN, LIGHT_RED, RED, WHITE } from '../../constants/Color';
import { ERROR_FOUND, ERROR_NOT_FOUND } from '../../constants/Status';

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
const Title = ({ title }) => (
  <TitleBox>
    <TitleLabel>{title}</TitleLabel>
  </TitleBox>
);

// eslint-disable-next-line react/prop-types
const Caption = ({ caption }) => (
  <CaptionBox>
    <CaptionLabel>{caption}</CaptionLabel>
  </CaptionBox>
);

const CheckIcon = () => (
  <CaptionBox>
    <FilledCheckIcon />
  </CaptionBox>
);

const RepairBadge = ({ data }) => {
  const navigate = useNavigate();
  const repairStatus = data.status;
  return (
    <>
      {repairStatus === ERROR_FOUND && (
        <RedBadgeButton onClick={() => navigate(data.navigateTo)}>
          <Stack direction="column" alignItems="center" spacing={0}>
            <Title title={data.title} />
            <Caption caption={data.caption} />
          </Stack>
        </RedBadgeButton>
      )}
      {repairStatus === ERROR_NOT_FOUND && (
        <GreenBadgeButton onClick={() => navigate(data.navigateTo)}>
          <Stack direction="column" alignItems="center" spacing={0}>
            <Title title={data.title} />
            <CheckIcon />
          </Stack>
        </GreenBadgeButton>
      )}
    </>
  );
};

RepairBadge.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    status: PropTypes.oneOf([ERROR_NOT_FOUND, ERROR_FOUND]).isRequired,
    navigateTo: PropTypes.string.isRequired,
  }).isRequired,
};

export default RepairBadge;
