import { Typography, styled, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PropTypes from 'prop-types';
import Card from '../../styles/Card';
import Block from '../../styles/Block';
import BaseButton from '../../styles/BaseButton';
import Title from '../../styles/Title';
import { BLUE } from '../../constants/Color';

const InfoText = styled(Typography)({
  fontSize: '14pt',
});

const InfoIcon = styled(InfoOutlinedIcon)({
  verticalAlign: 'middle',
  color: BLUE,
  minWidth: '35px',
});

const ChangeButton = styled(BaseButton)({
  fontSize: '8pt',
  height: '30px',
  position: 'relative',
  left: '8px',
  bottom: '2px',
  borderRadius: '20px',
});

// eslint-disable-next-line react/prop-types
const InfoBox = ({ inputFileName, templateName, templateUrl }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ paddingTop: '30px' }}>
      <Block sx={{ padding: '10px 30px 0px 30px', width: '400px' }}>
        <Title variant="h2">Input Information</Title>
      </Block>
      <Block sx={{ padding: '10px 30px 0px 30px', width: '100%' }}>
        <Block sx={{ display: 'flex', alignItems: 'center' }}>
          <InfoIcon />
          <InfoText>
            Spreadsheet is loaded from&nbsp;
            {inputFileName}
          </InfoText>
          <ChangeButton
            variant="contained"
            sx={{ width: '100px' }}
            onClick={() => navigate('..')}
            disableElevation
          >
            Change
          </ChangeButton>
        </Block>
        <Block sx={{ display: 'flex' }}>
          <InfoIcon />
          <InfoText>
            Spreadsheet is validated against&nbsp;
            <Link
              href={templateUrl}
              underline="always"
              target="_blank"
              rel="noopener"
            >
              {templateName}
            </Link>
            &nbsp;
            specification on CEDAR repository.
          </InfoText>
        </Block>
      </Block>
    </Card>
  );
};

InfoBox.propTypes = {
  inputFileName: PropTypes.string.isRequired,
  templateName: PropTypes.string.isRequired,
  templateUrl: PropTypes.string.isRequired,
};

export default InfoBox;
