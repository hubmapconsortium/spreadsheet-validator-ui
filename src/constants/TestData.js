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
      section_index_number: {
        label: 'section_index_number',
        type: 'number',
      },
      preparation_medium: {
        label: 'preparation_medium',
        type: 'text',
        permissibleValues: [
          {
            label: 'PFA 4%',
            meaning: 'https://purl.org/hubmapvoc/samples-voc-additions/PFA4pc-prep',
          },
          {
            label: 'Buffered Formalin (10% NBF)',
            meaning: 'https://purl.org/hubmapvoc/samples-voc-additions/bufferedFormalin-10pcNBF-prep',
          },
          {
            label: 'Non-Buffered Formalin (FOR)',
            meaning: 'https://purl.org/hubmapvoc/samples-voc-additions/Non-BufferedFormalin-FOR-prep',
          },
          {
            label: '1 x PBS',
            meaning: 'https://purl.org/hubmapvoc/samples-voc-additions/1xPBS-prep',
          },
          {
            label: 'OCT',
            meaning: 'https://purl.org/hubmapvoc/samples-voc-additions/OCT',
          },
          {
            label: 'CMC',
            meaning: 'https://purl.org/hubmapvoc/samples-voc-additions/CMC-prep',
          },
          {
            label: 'MACS Tissue Storage Solution',
            meaning: 'https://purl.org/hubmapvoc/samples-voc-additions/maCSTissueStorageSolution-prep',
          },
          {
            label: 'RNALater',
            meaning: 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C63348',
          },
          {
            label: 'Methanol',
            meaning: 'http://purl.bioontology.org/ontology/MESH/D000432',
          },
          {
            label: 'Non-Aldehyde Based Without Acetic Acid (NAA)',
            meaning: 'https://purl.org/hubmapvoc/samples-voc-additions/Non-AldehydeBasedWithoutAceticAcid-NAA',
          },
          {
            label: 'Non-Aldehyde With Acetic Acid (ACA)',
            meaning: 'https://purl.org/hubmapvoc/samples-voc-additions/Non-AldehydeWithAceticAcid-ACA',
          },
          {
            label: 'PAXgene Blood Tissue System',
            meaning: 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C126392',
          },
          {
            label: 'Allprotect Tissue Reagent (ALL)',
            meaning: 'https://purl.org/hubmapvoc/samples-voc-additions/allprotectTissueReagent-ALL-prep',
          },
          {
            label: 'None',
            meaning: 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C41132',
          }],
      },
      preparation_temperature: {
        label: 'preparation_temperature',
        type: 'text',
        permissibleValues: [
          {
            label: 'Liquid Nitrogen',
            meaning: 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C68796',
          },
          {
            label: 'Liquid Nitrogen Vapor',
            meaning: 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C174159',
          },
          {
            label: 'Dry Ice',
            meaning: 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C63373',
          },
          {
            label: '4 Degrees Celsius',
            meaning: 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C185332',
          },
          {
            label: '24 Celsius (Room Temperature)',
            meaning: 'https://purl.org/hubmapvoc/samples-voc-additions/24Celsius-RoomTemperature',
          },
          {
            label: '37 Celsius',
            meaning: 'https://purl.org/hubmapvoc/samples-voc-additions/37Celsius-PT',
          },
          {
            label: 'Minus 80 Degrees Celsius',
            meaning: 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C185336',
          },
          {
            label: 'Minus 20 Degrees Celsius',
            meaning: 'http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#C185334',
          }],
      },
      preparation_time_value: {
        label: 'preparation_time_value',
        type: 'number',
      },
      preparation_time_unit: {
        label: 'preparation_time_unit',
        type: 'text',
        permissibleValues: [{
          label: 'minute',
          meaning: 'http://purl.obolibrary.org/obo/UO_0000031',
        },
        {
          label: 'hour',
          meaning: 'http://purl.obolibrary.org/obo/UO_0000032',
        },
        {
          label: 'day',
          meaning: 'http://purl.obolibrary.org/obo/UO_0000033',
        }],
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
    _id: 0,
    sample_ID: '9OLC.A1',
    section_index_number: 1,
    preparation_medium: 'None',
    preparation_temperature: '4 Celcius',
    preparation_time_value: '1 minute',
    preparation_time_unit: 'min',
    histology_report: null,
  }, {
    _id: 1,
    sample_ID: null,
    section_index_number: 1,
    preparation_medium: 'None',
    preparation_temperature: '4 Celcius',
    preparation_time_value: '1 min',
    preparation_time_unit: 'min',
    histology_report: 0,
  }, {
    _id: 2,
    sample_ID: null,
    section_index_number: 2,
    preparation_medium: 'OCT Embedded',
    preparation_temperature: null,
    preparation_time_value: 1.5,
    preparation_time_unit: 'min',
    histology_report: 0,
  }, {
    _id: 3,
    sample_ID: '',
    section_index_number: 3,
    preparation_medium: 'OCT Embedded',
    preparation_temperature: '24 Celcius',
    preparation_time_value: 1.5,
    preparation_time_unit: 'min',
    histology_report: null,
  }, {
    _id: 4,
    sample_ID: '9OLC.J21',
    section_index_number: 21,
    preparation_medium: 'Methanol',
    preparation_temperature: null,
    preparation_time_value: '4 min',
    preparation_time_unit: 'min',
    histology_report: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
  }, {
    _id: 5,
    sample_ID: '9OLC.J22',
    section_index_number: 22,
    preparation_medium: 'Methanol',
    preparation_temperature: null,
    preparation_time_value: '4 min',
    preparation_time_unit: 'min',
    histology_report: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
  }, {
    _id: 6,
    sample_ID: '9OLC.J23',
    section_index_number: 23,
    preparation_medium: 'OCT',
    preparation_temperature: null,
    preparation_time_value: '4 min',
    preparation_time_unit: 'min',
    histology_report: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
  }, {
    _id: 7,
    sample_ID: '9OLC.J24',
    section_index_number: 24,
    preparation_medium: 'OCT',
    preparation_temperature: null,
    preparation_time_value: '4 min',
    preparation_time_unit: 'min',
    histology_report: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
  }, {
    _id: 8,
    sample_ID: '3OAC.M1',
    section_index_number: 1,
    preparation_medium: 'OCT',
    preparation_temperature: 'Dry Ice',
    preparation_time_value: 5,
    preparation_time_unit: 'min',
    histology_report: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
  }, {
    _id: 9,
    sample_ID: '3OAC.M2',
    section_index_number: 2,
    preparation_medium: 'OCT',
    preparation_temperature: 'Dry Ice',
    preparation_time_value: 5,
    preparation_time_unit: 'min',
    histology_report: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
  },
];

export const ERROR_REPORT = {
  missingRequired: {
    sample_ID: [1, 2, 3],
    preparation_temperature: [2, 4, 5, 6, 7],
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

export const APP_DATA = {
  metadata: SPREADSHEET_METADATA,
  data: SPREADSHEET_DATA,
  errorReport: ERROR_REPORT,
};

export const PATCH_DATA = [
  {},
  {
    sample_ID: { op: 'add', path: '/1/sample_ID/', value: '9OLC.A3' },
  },
  {
    preparation_temperature: { op: 'add', path: '/2/preparation_temperature', value: '4 Degrees Celsius' },
  },
  {
    sample_ID: { op: 'add', path: '/3/sample_ID', value: '9OLC.A5' },
  },
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];

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
