import GoBack from './GoBack';

interface IPageTitleProps {
  title: string;
}
const PageTitle: React.FC<IPageTitleProps> = ({ title }) => {
  return (
    <div className="page-title mb-5">
      <h1 className="display-5 fw-bold">{title}</h1>
      <GoBack />
    </div>
  );
};

export default PageTitle;
