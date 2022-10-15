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
  const spreadsheetUrl = '/Users/JohnDoe/Experiments/X19/2022-08-31_SampleData.xlsx';
  const templateUrl = 'https://cedar.metadatacenter.org/templates/edit/https://repo.metadatacenter.org/templates/87046e67-c2da-40ac-be3c-f3e6c818ecc1';
  const templateName = 'Sample Section Specification v1.0';
  return (
    <InfoSection>
      <InfoBox>
        Spreadsheet is uploaded from&nbsp;
        {spreadsheetUrl}
        <ChangeButton variant="contained" disableElevation>Change</ChangeButton>
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
