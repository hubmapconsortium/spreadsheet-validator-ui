import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, styled, CircularProgress, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, TextField } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import { read, utils } from 'xlsx';
import JSZip from 'jszip';
import Papa from 'papaparse';
import Container from '../../styles/Container';
import BaseButton from '../../styles/BaseButton';
import logo from '../../logo.svg';
import './home.css';
import { getAdherenceErrorReport, getCompletenessErrorReport } from '../../helpers/data-utils';
import { OVERVIEW_PATH } from '../../constants/Router';
import { CEDAR_TEMPLATE_IRI, MAIN_SHEET, METADATA_SHEET } from '../../constants/Sheet';
import { BLUE, LIGHTER_GRAY, LIGHT_YELLOW } from '../../constants/Color';

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
    .then(async (response) => {
      if (!response.ok) {
        const error = await response.json();
        throw error;
      }
      const data = await response.json();
      return data;
    });
  return res;
};

// eslint-disable-next-line react/prop-types
const Home = ({ setAppData }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [templateIri, setTemplateIri] = useState();
  const [staticSheets, setStaticSheets] = useState();
  const [inputFileMetadata, setInputFileMetadata] = useState();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
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

      const metadataSheet = workbook.Sheets[METADATA_SHEET];
      const md = utils.sheet_to_json(metadataSheet, { defval: '' });
      setTemplateIri(md[0][CEDAR_TEMPLATE_IRI]);

      const staticSheetNames = workbook.SheetNames.slice(1);
      const staticSheetObjects = staticSheetNames.reduce((collector, name) => ({
        ...collector,
        [name]: workbook.Sheets[name],
      }), {});
      setStaticSheets(staticSheetObjects);
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
        setTemplateIri(md.data[0][CEDAR_TEMPLATE_IRI]);
      });
    };
    return reader;
  };

  const handleChange = (file) => {
    if (file) {
      setEnabled(true);
      const fileType = file.type;
      if (fileType === 'application/zip') {
        zipReader().readAsArrayBuffer(file);
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        excelReader().readAsArrayBuffer(file);
      }
      setInputFileMetadata({
        name: file.name,
        size: file.size,
      });
    }
  };
  const getErrorLocations = (reporting) => {
    const completenessErrorReport = getCompletenessErrorReport(reporting);
    return completenessErrorReport
      .map((reportItem) => reportItem.column)
      .filter((value, index, arr) => arr.indexOf(value) === index);
  };
  const getErrorTypes = (reporting) => {
    const adherenceErrorReport = getAdherenceErrorReport(reporting);
    return adherenceErrorReport
      .map((reportItem) => reportItem.errorType)
      .filter((value, index, arr) => arr.indexOf(value) === index);
  };
  const submitSpreadsheet = async () => {
    try {
      setLoading(true);
      setEnabled(false);
      const response = await validateSpreadsheet(data, templateIri);
      setAppData({
        ...response,
        paths: {
          completenessErrorLocations: getErrorLocations(response.reporting),
          adherenceErrorTypes: getErrorTypes(response.reporting),
        },
        otherProps: {
          inputFileMetadata,
          staticSheets,
        },
      });
      navigate(OVERVIEW_PATH);
    } catch (e) {
      setError(e);
      setOpenDialog(true);
    }
  };

  const handleDialogClose = () => {
    setLoading(false);
    setEnabled(false);
    setOpenDialog(false);
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
                {inputFileMetadata ? `${inputFileMetadata.name}` : 'Drag & drop your spreadsheet file here'}
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
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          maxWidth="lg"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {error?.code === 1 && 'Input Spreadsheet Error'}
            {error?.code === 2 && 'Access Error'}
            {error?.code === 3 && 'Access Error'}
          </DialogTitle>
          <DialogContent sx={{ width: '600px' }}>
            <DialogContentText id="alert-dialog-description" sx={{ paddingBottom: '30px' }}>
              {error?.message}
            </DialogContentText>
            <TextField
              sx={{ width: '100%', backgroundColor: LIGHTER_GRAY }}
              label="Fix Suggestion:"
              defaultValue={error?.suggestion}
              multiline
              maxRows={8}
              disabled
            />
          </DialogContent>
          <DialogActions>
            <BaseButton onClick={handleDialogClose} autoFocus>Close</BaseButton>
          </DialogActions>
        </Dialog>
      </InputArea>
    </HomeContainer>
  );
};

export default Home;
