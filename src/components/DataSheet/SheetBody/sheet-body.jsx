import { TableBody } from '@mui/material';
import PropTypes from 'prop-types';

const SheetBody = (props) => {
  const { children } = props;
  return (
    <TableBody>
      {children}
    </TableBody>
  );
};

SheetBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SheetBody;
