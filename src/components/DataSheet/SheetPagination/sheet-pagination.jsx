import { styled, TablePagination } from '@mui/material';
import PropTypes from 'prop-types';
import SheetPaginationSelector from '../SheetPaginationSelector';

const StyledTablePagination = styled(TablePagination)({
  display: 'flex',
  border: 0,
  margin: '5px',
  justifyContent: 'right',
});

const SheetPagination = ({ data, page, setPage, rowsPerPage, setRowsPerPage }) => {
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <StyledTablePagination
      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
      colSpan={3}
      count={data.length}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      ActionsComponent={SheetPaginationSelector}
    />
  );
};

SheetPagination.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
};

export default SheetPagination;
