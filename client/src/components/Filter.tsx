import { useRef } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PageType } from '../types';
import { useAppSelector } from '../hooks/reduxToolkit';
import { selectCurrentUser } from '../feature/auth/authSlice';

type SelectOptions = { [key: string]: string };

interface FilterProps {
  pageType: PageType;
  filterText: string;
  filterColumn: string;
  orderBy: string;
  orderDir: string;
  orderOptions: SelectOptions;
  filterOptions: SelectOptions;
  setPage: (value: React.SetStateAction<number>) => void;
}

const Filter = ({
  pageType,
  filterText,
  filterColumn,
  orderBy,
  orderDir,
  orderOptions,
  filterOptions,
  setPage,
}: FilterProps) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);

  const inputFilterRef = useRef<HTMLInputElement>(null);
  const selectFilterRef = useRef<HTMLSelectElement>(null);

  const orderSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const orderValue = e.target.value;
    const lastIndex = orderValue.lastIndexOf('_');

    const orderBy = orderValue.substring(0, lastIndex);
    const orderDir = orderValue.substring(lastIndex + 1);

    const searchColumn = selectFilterRef.current?.value;
    const searchValue = inputFilterRef.current?.value;

    setPage(() => 1);
    navigate({
      pathname: `/${pageType}`,
      search: `?columnName=${searchColumn}&columnValue=${searchValue}&orderBy=${orderBy}&orderDir=${orderDir}`,
    });
  };

  const orderValue =
    orderBy && orderDir ? `${orderBy}_${orderDir}` : 'updated_at_desc';

  /**
   * Render options used for select options
   * @param options
   * @returns
   */
  const renderOption = (options: SelectOptions) => {
    const result = [];
    for (const key in options) {
      result.push(
        <option value={key} key={key}>
          {options[key]}
        </option>
      );
    }

    return result;
  };

  const filterSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!inputFilterRef.current || !selectFilterRef.current) {
      return false;
    }
    const searchValue = inputFilterRef.current.value;
    const searchColumn = selectFilterRef.current?.value;

    if (filterText.trim()) {
      setPage(() => 1);
      navigate({
        pathname: `/${pageType}`,
        search: `?columnName=${searchColumn}&columnValue=${searchValue}`,
      });
    }
  };

  const filterInputKeyDownHandler = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!inputFilterRef.current || !selectFilterRef.current) {
      return false;
    }
    const searchValue = inputFilterRef.current?.value;
    const searchColumn = selectFilterRef.current?.value;
    if (e.key === 'Enter') {
      setPage(() => 1);

      navigate({
        pathname: `/${pageType}`,
        search: `?columnName=${searchColumn}&columnValue=${searchValue}`,
      });
    }
  };

  return (
    <Stack
      className="border rounded p-3 search-filter"
      direction="horizontal"
      gap={3}
    >
      {user.role === 'author' && (
        <Button
          id="createNew"
          variant="primary"
          onClick={() => navigate(`/${pageType}/new`)}
        >
          Create new
        </Button>
      )}

      <div className="input-group">
        <span className="input-group-text">🔍</span>

        <select
          className="form-select"
          id="filterName"
          defaultValue={filterColumn}
          ref={selectFilterRef}
          onChange={filterSelectHandler}
        >
          {renderOption(filterOptions)}
        </select>

        <input
          id="filterValue"
          type="text"
          className="form-control flex-2"
          placeholder="search ..."
          defaultValue={filterText}
          ref={inputFilterRef}
          onKeyDown={filterInputKeyDownHandler}
        />
      </div>

      <select
        className="form-select"
        id="order"
        value={orderValue}
        onChange={orderSelectHandler}
      >
        {renderOption(orderOptions)}
      </select>
    </Stack>
  );
};

export default Filter;
