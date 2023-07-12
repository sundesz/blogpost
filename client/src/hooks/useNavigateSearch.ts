import { createSearchParams, useNavigate } from 'react-router-dom';

type NavigateSearchFunction = (
  pathname: string,
  params: Record<string, string>
) => void;

const useNavigateSearch = (): NavigateSearchFunction => {
  const navigate = useNavigate();
  return (pathname: string, params: Record<string, string>): void =>
    navigate({ pathname, search: `?${createSearchParams(params)}` });
};

export default useNavigateSearch;
