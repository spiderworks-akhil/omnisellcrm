import Proptypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  Link,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@mui/material';
import { Pagination } from '../pagination';
import { ResourceError } from '../resource-error';
import { ResourceUnavailable } from '../resource-unavailable';
import { Scrollbar } from '../scrollbar';
import { Status } from '../status';
import { ProductMenu } from './product-menu';

const columns = [
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'phone',
    label: 'Phone'
  },
  {
    id: 'email',
    label: 'Mail'
  },
  {
    id: 'updatedAt',
    label: 'Updated'
  },
  {
    id: 'status',
    label: 'Status'
  }
];
const statusVariants = [
  {
    color: 'info.main',
    label: 'Closed',
    value: 'Close'
  },
  {
    color: 'success.main',
    label: 'Open',
    value: 'Open'
  }
];

export const ProductsTable = (props) => {
  const {
    error,
    isLoading,
    onPageChange,
    onSelect,
    onSelectAll,
    onSortChange,
    page,
    products,
    productsCount,
    selectedProducts,
    sort,
    sortBy
  } = props;

  const displayLoading = isLoading;
  const displayError = Boolean(!isLoading && error);
  const displayUnavailable = Boolean(!isLoading && !error && !products.length);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
      }}
    >
      <Scrollbar>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={products.length > 0
                  && selectedProducts.length === products.length}
                  disabled={isLoading}
                  indeterminate={selectedProducts.length > 0
                  && selectedProducts.length < products.length}
                  onChange={onSelectAll}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  <TableSortLabel
                    active={sortBy === column.id}
                    direction={sortBy === column.id ? sort : 'asc'}
                    disabled={isLoading}
                    onClick={(event) => onSortChange(event, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => {
              const statusVariant = statusVariants.find((variant) => variant.value.valueOf()
                == product.status.valueOf());

              return (
                <TableRow
                  hover
                  key={product.id}
                  selected={!!selectedProducts.find((selectedCustomer) => selectedCustomer
                    === product.id)}
                >
                  <TableCell padding="checkbox" >
                    <Checkbox
                      checked={!!selectedProducts.find((selectedCustomer) => selectedCustomer
                        === product.id)}
                      onChange={(event) => onSelect(event, product.id)}
                    />
                  </TableCell>
                  <TableCell >
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >

                      <Box sx={{ ml: 2 }}>
                        <Link
                          color="inherit"
                          component={RouterLink}
                          sx={{ display: 'block' }}
                          to="/dashboard/products/1"
                          underline="none"
                          variant="subtitle2"
                        >
                          {product.name}
                        </Link>
                        <Typography
                          color="textSecondary"
                          sx={{ mt: 0 }}
                          variant="body2"
                        >
                          {"#"+product.id+", "+product?.lead_type?.name}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Typography
                          color="inherit"
                          variant="body2"
                      >
                        {product.phone_number}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Typography
                          color="inherit"
                          variant="body2"
                      >
                        {product.email}
                      </Typography>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      <Typography
                        color="inherit"
                        variant="body2"
                      >
                        {/*{format(product.updated_at?, 'dd MMM yyyy')}*/}
                      </Typography>
                      <Typography
                        color="textSecondary"
                        variant="body2"
                      >
                        {/*{format(product.updated_at?, 'HH:mm')}*/}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Status
                      color={statusVariant.color}
                      label={statusVariant.label}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <ProductMenu />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      {displayLoading && (
        <Box sx={{ p: 2 }}>
          <Skeleton height={42} />
          <Skeleton height={42} />
          <Skeleton height={42} />
        </Box>
      )}
      {displayError && (
        <ResourceError
          error={error}
          sx={{
            flexGrow: 1,
            m: 2
          }}
        />
      )}
      {displayUnavailable && (
        <ResourceUnavailable
          sx={{
            flexGrow: 1,
            m: 2
          }}
        />
      )}
      <Divider sx={{ mt: 'auto' }} />
      <Pagination
        disabled={isLoading}
        onPageChange={onPageChange}
        page={page}
        rowsCount={productsCount}
      />
    </Box>
  );
};

ProductsTable.defaultProps = {
  page: 1,
  products: [],
  productsCount: 0,
  selectedProducts: [],
  sort: 'desc',
  sortBy: 'createdAt'
};

ProductsTable.propTypes = {
  error: Proptypes.string,
  isLoading: Proptypes.bool,
  onPageChange: Proptypes.func,
  onSelect: Proptypes.func,
  onSelectAll: Proptypes.func,
  onSortChange: Proptypes.func,
  page: Proptypes.number,
  products: Proptypes.array,
  productsCount: Proptypes.number,
  selectedProducts: Proptypes.array,
  sort: Proptypes.oneOf(['asc', 'desc']),
  sortBy: Proptypes.string
};
