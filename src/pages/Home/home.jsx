import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, styled, CircularProgress } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import { read, utils } from 'xlsx';
import JSZip from 'jszip';
import Papa from 'papaparse';
import Container from '../../styles/Container';
import logo from '../../logo.svg';
import './home.css';
import { OVERVIEW_PATH } from '../../constants/Router';
import { MAIN_SHEET, METADATA_SHEET, CEDAR_TEMPLATE_IRI, CEDAR_TEMPLATE_NAME, CEDAR_TEMPLATE_VERSION } from '../../constants/Sheet';
import BaseButton from '../../styles/BaseButton';
import { BLUE, LIGHT_YELLOW } from '../../constants/Color';

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
  const [data, setData] = useState();
  const [template, setTemplate] = useState();
  const [inputFile, setInputFile] = useState();
  const [inputFileName, setInputFileName] = useState();
  const [templateName, setTemplateName] = useState();
  const [templateUrl, setTemplateUrl] = useState();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
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
      setTemplateName(`${md[0][CEDAR_TEMPLATE_NAME]} ${md[0][CEDAR_TEMPLATE_VERSION]}`);
      setTemplate(md[0][CEDAR_TEMPLATE_IRI]);
      setTemplateUrl(`https://openview.metadatacenter.org/templates/${encodeURIComponent(md[0][CEDAR_TEMPLATE_IRI])}`);
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
        setTemplateName(`${md.data[0][CEDAR_TEMPLATE_NAME]} ${md.data[0][CEDAR_TEMPLATE_VERSION]}`);
        setTemplate(md.data[0][CEDAR_TEMPLATE_IRI]);
        setTemplateUrl(`https://openview.metadatacenter.org/templates/${encodeURIComponent(md.data[0][CEDAR_TEMPLATE_IRI])}`);
      });
    };
    return reader;
  };

  const handleChange = async (file) => {
    if (file) {
      setEnabled(true);
      const fileType = file.type;
      if (fileType === 'application/zip') {
        zipReader().readAsArrayBuffer(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        excelReader().readAsArrayBuffer(file);
      }
      setInputFile(file);
      setInputFileName(file.name);
    }
  };
  const submitSpreadsheet = () => {
    const validateData = async () => {
      const response = await validateSpreadsheet(data, template);
      setAppData({
        ...response,
        otherProps: {
          inputFileName,
          templateName,
          templateUrl,
        },
      });
      navigate(OVERVIEW_PATH);
    };
    setLoading(true);
    setEnabled(false);
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
          <FileUploader
            name="file"
            hoverTitle=" "
            handleChange={handleChange}
            types={fileTypes}
            dropMessageStyle={{ backgroundColor: LIGHT_YELLOW }}
          >
            <UploadBox>
              <Typography sx={{ fontSize: '20px' }} color="text.secondary" gutterBottom>
                {inputFile ? `${inputFile.name}` : 'Drag & drop your spreadsheet file here'}
                {' '}
                or
                {' '}
                <u>Browse</u>
              </Typography>
            </UploadBox>
          </FileUploader>
        </InputSection>
        <SubmitBox sx={{ position: 'relative' }}>
          <BaseButton
            variant="contained"
            size="large"
            onClick={submitSpreadsheet}
            disabled={!enabled}
          >
            Start Validating
          </BaseButton>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: BLUE,
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </SubmitBox>
      </InputArea>
    </HomeContainer>
  );
};

export default Home;
