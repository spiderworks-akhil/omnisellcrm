import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Card, Container, Divider, Typography } from '@mui/material';
import { productApi } from '../api/product';
import { ProductCreateDialog } from '../components/product/product-create-dialog';
import { ProductsFilter } from '../components/product/products-filter';
import { ProductsSummary } from '../components/product/products-summary';
import { ProductsTable } from '../components/product/products-table';
import { useMounted } from '../hooks/use-mounted';
import { useSelection } from '../hooks/use-selection';
import { Plus as PlusIcon } from '../icons/plus';
import {Leads} from "../api/Endpoints/Leads";
import {useAppSettings} from "../hooks/use-app-settings";


export const Products = () => {
  const mounted = useMounted();
  const appSettings = useAppSettings();
  const [controller, setController] = useState({
    filters: [],
    page: 0,
    query: '',
    sort: 'desc',
    sortBy: 'updatedAt',
    limit: 10
  });
  const [productsState, setProductsState] = useState({ isLoading: true });
  const [
    selectedProducts,
    handleSelect,
    handleSelectAll
  ] = useSelection(productsState.data?.data);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const getLeads = useCallback(async () => {
    setProductsState(() => ({ isLoading: true }));

    try {
      const result = await Leads.index({
        lead_type_id : appSettings.get_lead_type(),
        filters: controller.filters,
        page: controller.page+1,
        search: controller.query,
        sort: controller.sort,
        sortBy: controller.sortBy,
        view: controller.view,
        limit: controller.limit
      });


      if (mounted.current) {
        setProductsState(() => ({
          isLoading: false,
          data: result.data.data
        }));

      }
    } catch (err) {
      console.error(err);

      if (mounted.current) {
        setProductsState(() => ({
          isLoading: false,
          error: err.message
        }));
      }
    }
  }, [controller]);

  useEffect(() => {
    getLeads().catch(console.error);
  }, [controller]);



  const handleViewChange = (newView) => {
    setController({
      ...controller,
      page: 0,
      view: newView
    });
  };
  const handleQueryChange = (newQuery) => {
    setController({
      ...controller,
      page: 0,
      query: newQuery
    });
  };
  const handleFiltersApply = (newFilters) => {
    const parsedFilters = newFilters.map((filter) => ({
      property: filter.property.name,
      value: filter.value,
      operator: filter.operator.value
    }));

    setController({
      ...controller,
      page: 0,
      filters: parsedFilters
    });
  };
  const handleFiltersClear = () => {
    setController({
      ...controller,
      page: 0,
      filters: []
    });
  };
  const handlePageChange = (newPage) => {
    setController({
      ...controller,
      page: newPage - 1
    });
    console.log(selectedProducts)
  };
  const handleSortChange = (event, property) => {
    const isAsc = controller.sortBy === property && controller.sort === 'asc';

    setController({
      ...controller,
      page: 0,
      sort: isAsc ? 'desc' : 'asc',
      sortBy: property
    });
  };

  return (
    <>
      <Helmet>
        <title>Product: List | Carpatin Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1
        }}
      >
        <Container
          maxWidth="100%"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Box sx={{ py: 4 }}>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Leads
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                color="primary"
                onClick={() => setOpenCreateDialog(true)}
                size="large"
                startIcon={<PlusIcon fontSize="small" />}
                variant="contained"
              >
                Add
              </Button>
            </Box>
          </Box>
          <ProductsSummary />
          <Card
            variant="outlined"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1
            }}
          >
            <ProductsFilter
              disabled={productsState.isLoading}
              filters={controller.filters}
              onFiltersApply={handleFiltersApply}
              onFiltersClear={handleFiltersClear}
              onQueryChange={handleQueryChange}
              onViewChange={handleViewChange}
              query={controller.query}
              selectedProducts={selectedProducts}
              view={controller.view}
            />
            <Divider />
            <ProductsTable
              error={productsState.error}
              isLoading={productsState.isLoading}
              products={productsState.data?.data}
              productsCount={productsState.data?.total}
              onPageChange={handlePageChange}
              onSelect={handleSelect}
              onSelectAll={handleSelectAll}
              onSortChange={handleSortChange}
              page={controller.page + 1}
              selectedProducts={selectedProducts}
              sort={controller.sort}
              sortBy={controller.sortBy}
            />
          </Card>
        </Container>
      </Box>
      <ProductCreateDialog
        onClose={() => setOpenCreateDialog(false)}
        open={openCreateDialog}
      />
    </>
  );
};
