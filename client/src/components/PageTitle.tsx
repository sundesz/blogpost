import GoBack from './GoBack';

interface PageTitleProps {
  title: string;
  divClass?: string;
  displayClass?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({
  title,
  divClass = 'mb-5',
  displayClass = 'display-5',
}) => {
  return (
    <div className={`page-title ${divClass}`}>
      <h1 className={`fw-bold ${displayClass}`}>{title}</h1>
      <GoBack />
    </div>
  );
};

export default PageTitle;
