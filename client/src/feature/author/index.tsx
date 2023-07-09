import { useState } from 'react';
import AppPagination from '../../components/Pagination';
import { useGetAllAuthorQuery } from './authorApiSlice';
import Loading from '../../components/Loading';
import ErrorPage from '../../components/ErrorPage';
import AuthorList from './AuthorList';
import { Container } from 'react-bootstrap';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import Filter from '../../components/Filter';

const Authors = () => {
  const { pageNumber, filterName, filterValue, orderBy, orderDir } =
    useSearchQuery({});
  const PAGE_TYPE = 'authors';
  const [page, setPage] = useState<number>(Number(pageNumber));

  const {
    data: authorData,
    isLoading,
    isError,
    error,
  } = useGetAllAuthorQuery({
    page,
    filterName,
    filterValue,
    orderBy,
    orderDir,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorPage error={error} />;
  }

  if (!authorData?.data) {
    return <div>No data </div>;
  }

  const orderOptions = {
    updated_at_desc: 'Latest',
    updated_at_asc: 'Oldest',
    name_desc: 'Name Desc',
    name_asc: 'Name Asc',
  };

  const filterOptions = {
    name: 'Name',
    email: 'Email',
  };

  return (
    <Container className="py-5">
      <div className="page-header">Authors</div>

      {authorData.data.length > 0 && (
        <Filter
          pageType={PAGE_TYPE}
          filterText={filterValue}
          filterColumn={filterName}
          setPage={setPage}
          orderBy={orderBy}
          orderDir={orderDir}
          orderOptions={orderOptions}
          filterOptions={filterOptions}
        />
      )}

      <AuthorList authors={authorData.data} />

      <AppPagination
        pageType={PAGE_TYPE}
        totalPage={authorData.totalPage}
        currentPage={authorData.currentPage}
        setPage={setPage}
      />
    </Container>
  );
};

export default Authors;
