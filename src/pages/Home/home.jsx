import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, styled } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import { read, utils } from 'xlsx';
import JSZip from 'jszip';
import Papa from 'papaparse';
import Container from '../../styles/Container';
import logo from '../../logo.svg';
import './home.css';
import { OVERVIEW_PATH } from '../../constants/Router';
import { MAIN_SHEET, METADATA_SHEET, CEDAR_TEMPLATE_IRI } from '../../constants/Sheet';
import BaseButton from '../../styles/BaseButton';

const HomeContainer = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  height: '100vh',
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

const UploadBox = styled(Box)({
  width: '500px',
  textAlign: 'center',
  padding: '20px 150px 20px 150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  border: '1px solid gray',
  borderRadius: '18px',
});

const SubmitBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const validateSpreadsheet = async (spreadsheetData, cedarTemplateIri) => {
  const url = 'http://localhost:9094/service/validate';
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:
      JSON.stringify({
        spreadsheetData,
        cedarTemplateIri,
      }),
  };
  const res = fetch(url, requestOptions)
    .then((response) => {
      let result = {};
      if (response.ok) {
        result = response.json();
      }
      return result;
    });
  return res;
};

// eslint-disable-next-line react/prop-types
const Home = ({ setAppData }) => {
  const [file, setFile] = useState();
  const [data, setData] = useState();
  const [template, setTemplate] = useState();
  const navigate = useNavigate();

  const excelReader = () => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const workbook = read(content, { type: 'array' });

      let mainSheet = workbook.Sheets[MAIN_SHEET];
      if (!mainSheet) {
        const sheetName = workbook.SheetNames[0];
        mainSheet = workbook.Sheets[sheetName];
      }
      const dt = utils.sheet_to_json(mainSheet, { defval: '' });
      setData(dt);

      let metadataSheet = workbook.Sheets[METADATA_SHEET];
      if (!metadataSheet) {
        const sheetName = workbook.SheetNames[1];
        metadataSheet = workbook.Sheets[sheetName];
      }
      const md = utils.sheet_to_json(metadataSheet, { defval: '' });
      const templateIri = md[0][CEDAR_TEMPLATE_IRI];
      setTemplate(templateIri);
    };
    return reader;
  };

  const zipReader = () => {
    const reader = new FileReader();
    const FLOAT = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i;
    reader.onload = (e) => {
      const res = e.target.result;
      const defval = (value) => {
        let output = value;
        if (value === 'true' || value === 'TRUE') {
          output = true;
        } else if (value === 'false' || value === 'FALSE') {
          output = false;
        } else if (FLOAT.test(value)) {
          output = parseFloat(value);
        } else {
          return value;
        }
        return output;
      };
      JSZip.loadAsync(res).then((zip) => (
        zip.file('MAIN.csv').async('string')
      )).then((content) => {
        const dt = Papa.parse(content, { header: true, dynamicTyping: false, transform: defval });
        setData(dt.data);
      });
      JSZip.loadAsync(res).then((zip) => (
        zip.file('metadata').async('string')
      )).then((content) => {
        const md = Papa.parse(content, { header: true, dynamicTyping: true });
        const templateIri = md.data[0][CEDAR_TEMPLATE_IRI];
        setTemplate(templateIri);
      });
    };
    return reader;
  };

  const handleChange = async (userFile) => {
    if (userFile) {
      const fileType = userFile.type;
      if (fileType === 'application/zip') {
        zipReader().readAsArrayBuffer(userFile);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        excelReader().readAsArrayBuffer(userFile);
      }
      setFile(userFile);
    }
  };
  const submitSpreadsheet = () => {
    const validateData = async () => {
      const response = await validateSpreadsheet(data, template);
      setAppData(response);
      navigate(OVERVIEW_PATH, {
        state: {
          selectedMenuItem: 'overview',
        },
      });
    };
    validateData();
  };
  const fileTypes = ['xlsx', 'zip'];
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
          <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
            <UploadBox>
              <Typography sx={{ fontSize: '20px' }} color="text.secondary" gutterBottom>
                {file ? `${file.name}` : 'Drag & Drop your Excel spreadsheet file'}
                {' '}
                or
                {' '}
                <u>Browse</u>
              </Typography>
            </UploadBox>
          </FileUploader>
        </InputSection>
        <SubmitBox>
          <BaseButton variant="contained" size="large" onClick={submitSpreadsheet}>Start Validating</BaseButton>
        </SubmitBox>
      </InputArea>
    </HomeContainer>
  );
};

export default Home;
