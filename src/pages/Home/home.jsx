import { useState } from 'react';
import { Box, Button, styled } from '@mui/material';
import { FilePond } from 'react-filepond';
import Container from '../../styles/Container';
import logo from '../../logo.svg';
import 'filepond/dist/filepond.min.css';
import './home.css';

const LogoBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  height: 'calc(100% - 600px)',
  img: {
    width: '700px',
    marginTop: 'auto',
  },
});

const TaglineBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const InputSection = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px',
});

const SubmitBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const Home = () => {
  const [file, setFile] = useState();
  return (
    <Container>
      <LogoBox>
        <img src={logo} alt="spreadsheet-validator-logo" />
      </LogoBox>
      <TaglineBox>
        <h2>Upload and submit your spreadsheet file to validate the data</h2>
      </TaglineBox>
      <InputSection>
        <FilePond
          files={file}
          onupdatefiles={setFile}
          allowMultiple={false}
          server="/api"
          name="files"
          labelIdle='Drag & Drop your Excel file or <span class="filepond--label-action">Browse</span>'
          sx={{ fontSize: '50pt' }}
        />
      </InputSection>
      <SubmitBox>
        <Button variant="contained" size="large">Start Validating</Button>
      </SubmitBox>
    </Container>
  );
};

export default Home;
