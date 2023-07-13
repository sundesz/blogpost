import { Container } from 'react-bootstrap';
import ErrorPage from '../../components/ErrorPage';
import Loading from '../../components/Loading';
import { useGetAllBlogQuery } from './blogApiSlice';
import { useSearchQuery } from '../../hooks/useSearchQuery';
import { useState } from 'react';
import Filter from '../../components/Filter';
import AppPagination from '../../components/Pagination';
import BlogList from './BlogList';

const Blogs = () => {
  const { pageNumber, filterName, filterValue, orderBy, orderDir } =
    useSearchQuery({});

  const PAGE_TYPE = 'blogs';
  const [page, setPage] = useState<number>(Number(pageNumber));

  const {
    data: blogData,
    isLoading,
    isError,
    error,
  } = useGetAllBlogQuery({
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

  if (!blogData?.data) {
    return (
      <Container className="blog-container py-5">
        <div>No data </div>
      </Container>
    );
  }

  const orderOptions = {
    updated_at_desc: 'Latest',
    updated_at_asc: 'Oldest',
    title_desc: 'Title Desc',
    title_asc: 'Title Asc',
  };

  const filterOptions = {
    title: 'Title',
    content: 'Content',
  };

  return (
    <Container className="py-5">
      <div className="page-header">Blogs</div>

      {blogData.data.length > 0 && (
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

      <BlogList blogs={blogData.data} />

      <AppPagination
        pageType={PAGE_TYPE}
        totalPage={blogData.totalPage}
        currentPage={blogData.currentPage}
        setPage={setPage}
      />
    </Container>
  );
};

export default Blogs;
