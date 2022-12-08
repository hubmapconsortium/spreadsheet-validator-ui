import { useNavigate } from 'react-router-dom';
import { Button, Link, styled } from '@mui/material';
import Section from '../styles/Section';
import InfoBox from './InfoBox';

const InfoSection = styled(Section)({
  marginBottom: '20px',
});

const ChangeButton = styled(Button)({
  fontSize: '8pt',
  height: '30px',
  position: 'relative',
  left: '8px',
  bottom: '2px',
  borderRadius: '20px',
});

const DefaultInfoSection = () => {
  const navigate = useNavigate();
  const spreadsheetUrl = '/Users/johardi/Documents/Experiment/2022-08-31_SampleData.xlsx';
  const templateUrl = 'https://openview.metadatacenter.org/templates/https%3A%2F%2Frepo.metadatacenter.org%2Ftemplates%2F87046e67-c2da-40ac-be3c-f3e6c818ecc1';
  const templateName = 'Sample Section Specification v2.2';
  return (
    <InfoSection>
      <InfoBox>
        Spreadsheet is uploaded from&nbsp;
        {spreadsheetUrl}
        <ChangeButton
          variant="contained"
          onClick={() => navigate('..')}
          disableElevation
        >
          Change
        </ChangeButton>
      </InfoBox>
      <InfoBox>
        Spreadsheet is validated against&nbsp;
        <Link
          href={templateUrl}
          underline="always"
          target="_blank"
          rel="noopener"
        >
          {templateName}
        </Link>
      </InfoBox>
    </InfoSection>
  );
};

export default DefaultInfoSection;
