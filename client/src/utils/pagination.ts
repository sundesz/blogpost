/**
 *
 * @param currentPage
 * @param totalPage
 * @returns
 */
export const generatePagination = (currentPage: number, totalPage: number) => {
  const pages: (number | string)[] = [];

  if (totalPage < 8) {
    // less than 7 pages
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
  } else {
    // Eg: 1 2 3(first part) ... 8 9 10(second part)
    let checkCondition: boolean;
    let initValue: number;
    let checkValue: number;

    // more than 7 pages
    // first part
    checkCondition = currentPage + 4 > totalPage;
    initValue = checkCondition
      ? 2
      : currentPage + 6 > totalPage
      ? currentPage - 2
      : currentPage;
    checkValue = checkCondition
      ? 5
      : currentPage + 6 > totalPage
      ? currentPage + 1
      : currentPage + 3;
    for (let i = initValue; i < checkValue; i++) {
      pages.push(i);
    }

    pages.push('...');

    // second part
    checkCondition = currentPage === totalPage;
    initValue = checkCondition ? totalPage - 2 : totalPage - 3;
    checkValue = checkCondition ? totalPage + 1 : totalPage;
    for (let j = initValue; j < checkValue; j++) {
      pages.push(j);
    }
  }

  return pages;
};
