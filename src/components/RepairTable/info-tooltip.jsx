import { styled, Tooltip, tooltipClasses } from '@mui/material';

const InfoTooltip = styled(({ className, fontSize, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 600,
    fontSize: '16px',
  },
});

export default InfoTooltip;
