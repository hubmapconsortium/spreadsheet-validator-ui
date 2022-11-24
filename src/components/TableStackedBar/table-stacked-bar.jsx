import { styled, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import HSBar from 'react-horizontal-stacked-bar-chart';
import PropTypes from 'prop-types';

const HeaderCell = styled(TableCell)({
  fontSize: '14pt',
  fontWeight: 'bold',
});

const TextCell = styled(TableCell)({
  fontSize: '13pt',
  width: '25%',
  paddingRight: '5px',
});

const ChartCell = styled(TableCell)({
  fontSize: '13pt',
});

const TableStackedBar = ({ data }) => (
  <Table>
    <TableHead>
      <TableRow>
        {data.columns.map((column) => <HeaderCell>{column}</HeaderCell>)}
      </TableRow>
    </TableHead>
    <TableBody>
      {data.rows.map((row) => (
        <TableRow>
          {
            row.map((cell, cellIndex, arr) => (
              (cellIndex + 1 === arr.length)
                ? <ChartCell><HSBar showTextIn data={cell} /></ChartCell>
                : <TextCell>{cell}</TextCell>
            ))
          }
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

TableStackedBar.propTypes = {
  data: PropTypes.shape({
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  }).isRequired,
};

export default TableStackedBar;
