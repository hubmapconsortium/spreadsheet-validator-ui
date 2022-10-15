import { GREEN, RED } from './Color';
import { ERROR_FOUND, ERROR_NOT_FOUND } from './Status';

export const SPREADSHEET_METADATA = {
  spreadsheet: {
    label: 'Tissue Block',
    columns: {
      sample_ID: {
        label: 'sample_ID',
        type: 'text',
      },
      preparation_medium: {
        label: 'preparation_medium',
        type: 'text',
        permissibleValues: {
          'PFA 4%': 'https://purl.org/hubmapvoc/samples-voc-additions/PFA4pc-prep',
          'Buffered Formalin (10% NBF)': 'https://purl.org/hubmapvoc/samples-voc-additions/bufferedFormalin-10pcNBF-prep',
          'Non-Buffered Formalin (FOR)': 'https://purl.org/hubmapvoc/samples-voc-additions/Non-BufferedFormalin-FOR-prep',
          '1 x PBS': 'https://purl.org/hubmapvoc/samples-voc-additions/1xPBS-prep',
          OCT: 'https://purl.org/hubmapvoc/samples-voc-additions/OCT',
          CMC: 'https://purl.org/hubmapvoc/samples-voc-additions/CMC-prep',
          'MACS Tissue Storage Solution': 'https://purl.org/hubmapvoc/samples-voc-additions/maCSTissueStorageSolution-prep',
          RNALater: 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C63348',
          Methanol: 'http://purl.bioontology.org/ontology/MESH/D000432',
          'Non-Aldehyde Based Without Acetic Acid (NAA)': 'https://purl.org/hubmapvoc/samples-voc-additions/Non-AldehydeBasedWithoutAceticAcid-NAA',
          'Non-Aldehyde With Acetic Acid (ACA)': 'https://purl.org/hubmapvoc/samples-voc-additions/Non-AldehydeWithAceticAcid-ACA',
          'PAXgene Blood Tissue System': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C126392',
          'Allprotect Tissue Reagent (ALL)': 'https://purl.org/hubmapvoc/samples-voc-additions/allprotectTissueReagent-ALL-prep',
          None: 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C41132',
        },
      },
      preparation_temperature: {
        label: 'preparation_temperature',
        type: 'text',
        permissibleValues: {
          'Liquid Nitrogen': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C68796',
          'Liquid Nitrogen Vapor': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C174159',
          'Dry Ice': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C63373',
          '4 Degrees Celsius': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C185332',
          '24 Celsius (Room Temperature)': 'https://purl.org/hubmapvoc/samples-voc-additions/24Celsius-RoomTemperature',
          '37 Celsius': 'https://purl.org/hubmapvoc/samples-voc-additions/37Celsius-PT',
          'Minus 80 Degrees Celsius': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C185336',
          'Minus 20 Degrees Celsius': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C185334',
        },
      },
      preparation_time_value: {
        label: 'preparation_time_value',
        type: 'number',
      },
      preparation_time_unit: {
        label: 'preparation_time_unit',
        type: 'text',
        permissibleValues: {
          minute: 'http://purl.obolibrary.org/obo/UO_0000031',
          hour: 'http://purl.obolibrary.org/obo/UO_0000032',
          day: 'http://purl.obolibrary.org/obo/UO_0000033',
        },
      },
      histology_report: {
        label: 'histology_report',
        type: 'text',
      },
    },
  },
};

export const SPREADSHEET_DATA = [
  {
    sample_ID: '9OLC.A2',
    preparation_medium: 'None',
    preparation_temperature: '4 Celcius',
    preparation_time_value: '1 minute',
    preparation_time_unit: 'min',
    histology_report: null,
  }, {
    sample_ID: null,
    preparation_medium: 'None',
    preparation_temperature: '4 Celcius',
    preparation_time_value: '1 min',
    preparation_time_unit: 'min',
    histology_report: 0,
  }, {
    sample_ID: null,
    preparation_medium: 'OCT Embedded',
    preparation_temperature: null,
    preparation_time_value: 1.5,
    preparation_time_unit: 'min',
    histology_report: 0,
  }, {
    sample_ID: '',
    preparation_medium: 'OCT Embedded',
    preparation_temperature: '24 Celcius',
    preparation_time_value: 1.5,
    preparation_time_unit: 'min',
    histology_report: null,
  }, {
    sample_ID: '9OLC.J4',
    preparation_medium: 'Methanol',
    preparation_temperature: '-20 Celcius',
    preparation_time_value: '4 min',
    preparation_time_unit: 'min',
    histology_report: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
  },
];

export const ERROR_REPORT = {
  missingRequired: {
    sample_ID: [1, 2, 3],
    preparation_temperature: [2],
  },
  notStandardTerm: {
    preparation_medium: [
      {
        row: 2,
        value: 'OCT Embedded',
        suggestion: 'OCT',
      }, {
        row: 3,
        value: 'OCT Embedded',
        suggestion: 'OCT',
      }],
    preparation_temperature: [
      {
        row: 0,
        value: '4 Celcius',
        suggestion: '4 Degrees Celsius',
      }, {
        row: 1,
        value: '4 Celcius',
        suggestion: '4 Degrees Celsius',
      }, {
        row: 3,
        value: '24 Celcius',
        suggestion: '24 Celsius (Room Temperature)',
      }, {
        row: 4,
        value: '-20 Celcius',
        suggestion: 'Minus 20 Degrees Celsius',
      }],
    preparation_time_unit: [
      {
        row: 0,
        value: 'min',
        suggestion: 'minute',
      }, {
        row: 1,
        value: 'min',
        suggestion: 'minute',
      }, {
        row: 2,
        value: 'min',
        suggestion: 'minute',
      }, {
        row: 3,
        value: 'min',
        suggestion: 'minute',
      }, {
        row: 4,
        value: 'min',
        suggestion: 'minute',
      }],
  },
  notNumberType: {
    preparation_time_value: [
      {
        row: 0,
        value: '1 minute',
        suggestion: 1,
      }, {
        row: 1,
        value: '1 min',
        suggestion: 1,
      }, {
        row: 4,
        value: '4 min',
        suggestion: 4,
      }],
  },
  notStringType: {
    histology_report: [
      {
        row: 1,
        value: 0,
        suggestion: '',
      }, {
        row: 2,
        value: 0,
        suggestion: '',
      }],
  },
};

export const APP_CONTEXT = {
  metadata: SPREADSHEET_METADATA,
  data: SPREADSHEET_DATA,
  errorReport: ERROR_REPORT,
};

export const REPAIR_INCOMPLETENESS_BADGE_DATA = {
  items: [{
    title: 'sample_ID',
    caption: 'Value missing in 17 rows',
    status: ERROR_FOUND,
    navigateTo: 'sample_ID',
    helpText: 'The unique Submission ID for the sample assigned by the ingest portal. An example value might be "VAN0010-LK-152-162".',
  },
  {
    title: 'storage_medium',
    caption: 'Value missing in 0 rows',
    status: ERROR_NOT_FOUND,
    navigateTo: 'storage_medium',
    helpText: 'What was the sample preserved in.',
  },
  {
    title: 'storage_temperature',
    caption: 'Value missing in 8 rows',
    status: ERROR_FOUND,
    navigateTo: 'storage_temperature',
    helpText: 'The temperature during storage, after preparation and before the assay is performed.',
  },
  {
    title: 'section_index_number',
    caption: 'Value missing in 5 rows',
    status: ERROR_FOUND,
    navigateTo: 'section_index_number',
    helpText: 'The index number for the section if the sample is a single section.',
  },
  {
    title: 'section_thickness_unit',
    caption: 'Value missing in 5 rows',
    status: ERROR_FOUND,
    navigateTo: 'section_thickness_unit',
    helpText: 'Thickness unit.',
  }],
};

export const REPAIR_INCONSISTENCY_SUBMENU_DATA = {
  title: 'Types of Error',
  items: [{
    title: 'Value not number type',
    status: ERROR_FOUND,
    navigateTo: 'overview',
  },
  {
    title: 'Value not standard term',
    status: ERROR_NOT_FOUND,
    navigateTo: 'overview',
  }],
};

export const COMPLETENESS_CHART_DATA = {
  labels: ['Row has all required value', 'Row missing some required value'],
  innerTextTitle: '70 / 99',
  innerTextSubtitle: 'Completeness',
  datasets: [{
    label: '',
    data: [70, 29],
    backgroundColor: [GREEN, RED],
  }],
};

export const ADHERENCE_CHART_DATA = {
  labels: ['Row has no data type errors', 'Row has some data type error'],
  innerTextTitle: '79 / 99',
  innerTextSubtitle: 'Adherence',
  datasets: [{
    label: '',
    data: [79, 20],
    backgroundColor: [GREEN, RED],
  }],
};

export const REQUIRED_FIELD_ANALYSIS_CHART_DATA = {
  columns: ['Required field', 'Frequency of error'],
  rows: [
    ['sample_ID', [{ value: 17, color: RED }, { value: 82, color: GREEN }]],
    ['storage_medium', [{ value: 10, color: RED }, { value: 89, color: GREEN }]],
    ['storage_temperature', [{ value: 8, color: RED }, { value: 91, color: GREEN }]],
    ['section_index_number', [{ value: 5, color: RED }, { value: 94, color: GREEN }]],
    ['section_thickness_unit', [{ value: 5, color: RED }, { value: 94, color: GREEN }]],
  ],
};

export const VALUE_TYPE_ANALYSIS_CHART_DATA = {
  columns: ['Field name', 'Error flag', 'Frequency of error'],
  rows: [
    ['preparation_medium', 'Value not standard term', [{ value: 23, color: RED }, { value: 76, color: GREEN }]],
    ['processing_time_value', 'Value not number type', [{ value: 20, color: RED }, { value: 79, color: GREEN }]],
    ['storage_medium', 'Value not standard term', [{ value: 10, color: RED }, { value: 89, color: GREEN }]],
    ['section_thickness_unit', 'Value not number type', [{ value: 4, color: RED }, { value: 95, color: GREEN }]],
    ['area_value', 'Value not number type', [{ value: 3, color: RED }, { value: 96, color: GREEN }]],
  ],
};
