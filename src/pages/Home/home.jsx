import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, styled } from '@mui/material';
import { FilePond } from 'react-filepond';
import Container from '../../styles/Container';
import logo from '../../logo.svg';
import 'filepond/dist/filepond.min.css';
import './home.css';

const HomeContainer = styled(Container)({
  height: '75vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const InnerHomeContainer = styled(Container)({
});

const LogoBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
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
  padding: '30px',
});

const SubmitBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const Home = () => {
  const [file, setFile] = useState();
  const navigate = useNavigate();
  return (
    <HomeContainer>
      <InnerHomeContainer>
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
          <Button variant="contained" size="large" onClick={() => navigate('dashboard')}>Start Validating</Button>
        </SubmitBox>
      </InnerHomeContainer>
    </HomeContainer>
  );
};

export default Home;
