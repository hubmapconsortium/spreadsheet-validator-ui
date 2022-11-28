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
        {data.columns.map(
          (column, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <HeaderCell key={`header-${index}`}>
              {column}
            </HeaderCell>
          ),
        )}
      </TableRow>
    </TableHead>
    <TableBody>
      {data.rows.map((row, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TableRow key={`row-${index}`}>
          {
            row.map((cell, cellIndex, arr) => (
              (cellIndex + 1 === arr.length)
                // eslint-disable-next-line react/no-array-index-key
                ? <ChartCell key={`chart-cell-${cellIndex}`}><HSBar showTextIn data={cell} /></ChartCell>
                // eslint-disable-next-line react/no-array-index-key
                : <TextCell key={`text-cell-${cellIndex}`}>{cell}</TextCell>
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
