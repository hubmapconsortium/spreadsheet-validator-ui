import { TableHead, TableRow } from '@mui/material';
import PropTypes from 'prop-types';

const SheetHeader = (props) => {
  const { children } = props;
  return (
    <TableHead>
      <TableRow>
        {children}
      </TableRow>
    </TableHead>
  );
};

SheetHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SheetHeader;
