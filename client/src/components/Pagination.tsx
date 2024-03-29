import { useSearchQuery } from '../hooks/useSearchQuery';
import { PageType } from '../types';
import { generatePagination } from '../utils';
import useNavigateSearch from '../hooks/useNavigateSearch';

interface IAppPaginationProps {
  pageType: PageType;
  currentPage: number;
  totalPage: number;
  setPage: (value: React.SetStateAction<number>) => void;
}

const AppPagination = ({
  pageType,
  currentPage,
  totalPage,
  setPage,
}: IAppPaginationProps) => {
  const navigateSearch = useNavigateSearch();

  const { filterName, filterValue, orderBy, orderDir } = useSearchQuery({});

  const paginationPages = generatePagination(currentPage, totalPage);

  const spanClickHandler = (pageNumber: number | string) => {
    if (typeof pageNumber !== 'string' && currentPage !== pageNumber) {
      setPage(() => pageNumber);
      navigateSearch(`/${pageType}`, {
        page: String(pageNumber) ?? '1',
        columnName: filterName ?? '',
        columnValue: filterValue ?? '',
        orderBy: orderBy ?? '',
        orderDir: orderDir ?? '',
      });
    }
  };

  if (!totalPage) return null;

  return (
    <div className="my-4">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <span
            onClick={() => spanClickHandler(1)}
            className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
          >
            &laquo;
          </span>
        </li>
        <li className="page-item">
          <span
            onClick={() => spanClickHandler(currentPage - 1)}
            className={`page-link ${currentPage === 1 ? 'disabled' : ''}`}
          >
            &#8249;
          </span>
        </li>

        {paginationPages.map((page) => (
          <li className="page-item" key={page}>
            <span
              onClick={() => spanClickHandler(page)}
              className={`page-link ${page === currentPage ? 'active' : ''} ${
                typeof page === 'string' ? 'disabled' : ''
              }`}
            >
              {page}
            </span>
          </li>
        ))}
        <li className="page-item">
          <span
            onClick={() => spanClickHandler(currentPage + 1)}
            className={`page-link ${
              currentPage === totalPage ? 'disabled' : ''
            }`}
          >
            &#8250;
          </span>
        </li>

        <li className="page-item">
          <span
            onClick={() => spanClickHandler(totalPage)}
            className={`page-link ${
              currentPage === totalPage ? 'disabled' : ''
            }`}
          >
            &raquo;
          </span>
        </li>
      </ul>
    </div>
  );
};

export default AppPagination;
