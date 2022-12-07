import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import { FilePond } from 'react-filepond';
import Container from '../../styles/Container';
import logo from '../../logo.svg';
import 'filepond/dist/filepond.min.css';
import './home.css';
import { APP_DATA } from '../../constants/TestData';
import { OVERVIEW_PATH } from '../../constants/Router';
import BaseButton from '../../styles/BaseButton';

const HomeContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
  position: 'absolute',
});

const InputArea = styled(Box)({
  width: '100vw',
  margin: 'auto',
});

const LogoBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: '10px',
  img: {
    width: '600px',
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

// eslint-disable-next-line react/prop-types
const Home = ({ setAppData }) => {
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const submitSpreadsheet = () => {
    const validateData = async () => {
      setAppData(APP_DATA);
      navigate(OVERVIEW_PATH, {
        state: {
          selectedMenuItem: 'overview',
        },
      });
    };
    validateData();
  };
  return (
    <HomeContainer>
      <InputArea>
        <LogoBox>
          <img src={logo} alt="spreadsheet-validator-logo" />
        </LogoBox>
        <TaglineBox>
          <h2>Upload and submit your spreadsheet file to validate the metadata records</h2>
        </TaglineBox>
        <InputSection>
          <FilePond
            files={file}
            onupdatefiles={setFile}
            allowMultiple={false}
            server="/api"
            name="files"
            labelIdle='Drag & Drop your spreadsheet file (.xslx, .tsv, .csv) or <span class="filepond--label-action">Browse</span>'
            sx={{ fontSize: '50pt' }}
          />
        </InputSection>
        <SubmitBox>
          <BaseButton variant="contained" size="large" onClick={submitSpreadsheet}>Start Validating</BaseButton>
        </SubmitBox>
      </InputArea>
    </HomeContainer>
  );
};

export default Home;
