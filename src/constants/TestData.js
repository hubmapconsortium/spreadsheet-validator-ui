import { GREEN, RED } from './Color';
import { ERROR_FOUND, ERROR_NOT_FOUND } from './Status';

export const SPREADSHEET_METADATA = {
  columns: [{
    type: 'text',
    categorical: false,
  }, {
    type: 'text',
    categorical: true,
    possibleValues: {
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
  }, {
    type: 'text',
    categorical: true,
    possibleValues: {
      'Liquid Nitrogen': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C68796',
      'Liquid Nitrogen Vapor': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C174159',
      'Dry Ice': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C63373',
      '4 Degrees Celsius': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C185332',
      '24 Celsius (Room Temperature)': 'https://purl.org/hubmapvoc/samples-voc-additions/24Celsius-RoomTemperature',
      '37 Celsius': 'https://purl.org/hubmapvoc/samples-voc-additions/37Celsius-PT',
      'Minus 80 Degrees Celsius': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C185336',
      'Minus 20 Degrees Celsius': 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C185334',
    },
  }, {
    type: 'number',
    categorical: false,
  }, {
    type: 'text',
    categorical: true,
    possibleValues: {
      minute: 'http://purl.obolibrary.org/obo/UO_0000031',
      hour: 'http://purl.obolibrary.org/obo/UO_0000032',
      day: 'http://purl.obolibrary.org/obo/UO_0000033',
    },
  }, {
    type: 'text',
    categorical: false,
  }],
};

export const SPREADSHEET_DATA = {
  rows: [{
    sample_id: '9OLC.A2',
    preparation_medium: 'None',
    preparation_temperature: '4 Celcius',
    preparation_time_value: '1 minute',
    preparation_time_unit: 'min',
    histology_report: null,
  }, {
    sample_id: null,
    preparation_medium: 'None',
    preparation_temperature: '4 Celcius',
    preparation_time_value: '1 min',
    preparation_time_unit: 'min',
    histology_report: 0,
  }, {
    sample_id: null,
    preparation_medium: 'OCT Embedded',
    preparation_temperature: null,
    preparation_time_value: 1.5,
    preparation_time_unit: 'min',
    histology_report: 0,
  }, {
    sample_id: '',
    preparation_medium: 'OCT Embedded',
    preparation_temperature: '24 Celcius',
    preparation_time_value: 1.5,
    preparation_time_unit: 'min',
    histology_report: null,
  }, {
    sample_id: '9OLC.J4',
    preparation_medium: 'Methanol',
    preparation_temperature: '-20 Celcius',
    preparation_time_value: '4 min',
    preparation_time_unit: 'min',
    histology_report: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
  }],
};

export const ERRORS_LIST = {
  details: {
    100: {
      sample_id: [1, 2, 3],
      preparation_temperature: [2],
    },
    200: {
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
    201: {
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
    202: {
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
  },
  meaning: {
    100: 'Missing required value',
    200: 'Value not standard term',
    201: 'Value not number type',
    202: 'Value not string type',
  },
};

export const PAYLOAD_DATA = {
  metadata: SPREADSHEET_METADATA,
  data: SPREADSHEET_DATA,
  error_list: ERRORS_LIST,
};

export const REPAIR_INCOMPLETENESS_HEADER_DATA = {
  headers: [{
    key: 'sample_id',
    label: 'sample_id',
    enableFilter: false,
    enableEditByColumn: true,
  }, {
    key: 'preparation_medium',
    label: 'preparation_medium',
    enableFilter: true,
    enableEditByColumn: false,
  }, {
    key: 'preparation_temperature',
    label: 'preparation_temperature',
    enableFilter: true,
    enableEditByColumn: false,
  }, {
    key: 'preparation_time_value',
    label: 'preparation_time_value',
    enableFilter: true,
    enableEditByColumn: false,
  }, {
    key: 'preparation_time_unit',
    label: 'preparation_time_unit',
    enableFilter: true,
    enableEditByColumn: false,
  }, {
    key: 'histological_report',
    label: 'histological_report',
    enableFilter: true,
    enableEditByColumn: false,
  }],
};

export const REPAIR_INCOMPLETENESS_BADGE_DATA = {
  items: [{
    title: 'sample_ID',
    caption: 'Value missing in 17 rows',
    status: ERROR_FOUND,
    navigateTo: '0',
    helpText: 'The unique Submission ID for the sample assigned by the ingest portal. An example value might be "VAN0010-LK-152-162".',
  },
  {
    title: 'storage_medium',
    caption: 'Value missing in 0 rows',
    status: ERROR_NOT_FOUND,
    navigateTo: '1',
    helpText: 'What was the sample preserved in.',
  },
  {
    title: 'storage_temperature',
    caption: 'Value missing in 8 rows',
    status: ERROR_FOUND,
    navigateTo: '2',
    helpText: 'The temperature during storage, after preparation and before the assay is performed.',
  },
  {
    title: 'section_index_number',
    caption: 'Value missing in 5 rows',
    status: ERROR_FOUND,
    navigateTo: '3',
    helpText: 'The index number for the section if the sample is a single section.',
  },
  {
    title: 'section_thickness_unit',
    caption: 'Value missing in 5 rows',
    status: ERROR_FOUND,
    navigateTo: '4',
    helpText: 'Thickness unit.',
  }],
};

export const REPAIR_INCOMPLETENESS_SUBMENU_DATA = {
  title: 'Types of Error',
  items: [{
    title: 'Missing sample_ID',
    status: ERROR_FOUND,
    navigateTo: 'repair-incompleteness/0',
  },
  {
    title: 'Missing storage_medium',
    status: ERROR_NOT_FOUND,
    navigateTo: 'repair-incompleteness/1',
  },
  {
    title: 'Missing storage_temperature',
    status: ERROR_FOUND,
    navigateTo: 'repair-incompleteness/2',
  },
  {
    title: 'Missing section_index_number',
    status: ERROR_FOUND,
    navigateTo: 'repair-incompleteness/3',
  },
  {
    title: 'Missing section_thickness_unit',
    status: ERROR_FOUND,
    navigateTo: 'repair-incompleteness/4',
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
