import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const previousPath =
    pathSegments.length > 1
      ? pathSegments[pathSegments.length - 2]
      : 'Dashboard';

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link
              className="font-medium text-gray-600 hover:text-primary"
              to={`/${previousPath}`}
            >
              {previousPath.charAt(0).toUpperCase() + previousPath.slice(1)} /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
