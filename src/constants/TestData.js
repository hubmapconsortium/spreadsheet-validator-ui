import { GREEN, RED } from './Color';
import { ERROR_FOUND, ERROR_NOT_FOUND } from './Status';

export const REPAIR_INCOMPLETENESS_SUBMENU_DATA = {
  title: 'Types of Error',
  items: [{
    title: 'Missing Sample_ID',
    status: ERROR_FOUND,
    navigateTo: 'overview',
  },
  {
    title: 'Missing storage_medium',
    status: ERROR_NOT_FOUND,
    navigateTo: 'overview',
  },
  {
    title: 'Missing storage_temperature',
    status: ERROR_FOUND,
    navigateTo: 'overview',
  },
  {
    title: 'Missing section_index_number',
    status: ERROR_FOUND,
    navigateTo: 'overview',
  },
  {
    title: 'Missing section_thickness_unit',
    status: ERROR_FOUND,
    navigateTo: 'overview',
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
