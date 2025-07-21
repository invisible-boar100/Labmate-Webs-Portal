import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';

import DefaultLayout from '../../layout/DefaultLayout';

import { BRAND } from '../../types/brand';
import BrandOne from '../../images/brand/brand-01.svg';
import BrandTwo from '../../images/brand/brand-02.svg';
import BrandThree from '../../images/brand/brand-03.svg';
import BrandFour from '../../images/brand/brand-04.svg';
import BrandFive from '../../images/brand/brand-05.svg';
import {
  getAllArticles,
  getAllDepartments,
  getAllResourcesList,
} from '../../api/authApi';
import { useNavigate } from 'react-router-dom';

const brandData: BRAND[] = [
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2,
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [departments, setDepartments] = useState([]);
  const [resources, setResources] = useState([]);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const department = await getAllDepartments();
      const resource = await getAllResourcesList();
      const article = await getAllArticles();
      setDepartments(department.data);
      setResources(resource.data);
      setArticles(article.data);
    } catch (error) {
      console.error('Error fetching drugs:', error);
    }
  };

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        <CardDataStats title="Total Departments" total={departments.length}>
          <svg
            className="fill-primary dark:fill-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.625 21.75V0.75H3.375V21.75H0.75V23.25H23.25V21.75H20.625ZM19.125 21.75H12.75V18.75H11.25V21.75H4.875V2.25H19.125V21.75Z"
              fill=""
            />
            <path
              d="M7.5 14.25H9V15.75H7.5V14.25ZM11.25 14.25H12.75V15.75H11.25V14.25ZM15 14.25H16.5V15.75H15V14.25ZM7.5 9.75H9V11.25H7.5V9.75ZM11.25 9.75H12.75V11.25H11.25V9.75ZM15 9.75H16.5V11.25H15V9.75ZM7.5 5.25H9V6.75H7.5V5.25ZM11.25 5.25H12.75V6.75H11.25V5.25ZM15 5.25H16.5V6.75H15V5.25Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats
          title="Total Resources Published"
          total={resources.length}
        >
          <svg
            className="fill-primary dark:fill-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.635 22.6051H3.75C2.505 22.6051 1.5 21.6001 1.5 20.3551V16.4701C1.5 15.8701 1.74 15.3001 2.16 14.8801L5.475 11.5651C5.775 11.2651 6.24 11.2651 6.54 11.5651C6.84 11.8651 6.84 12.3301 6.54 12.6301L3.225 15.9451C3.08369 16.0836 3.00282 16.2723 3 16.4701V20.3551C3 20.7751 3.33 21.1051 3.75 21.1051H7.635C7.83 21.1051 8.025 21.0301 8.16 20.8801L11.475 17.5651C11.775 17.2651 12.24 17.2651 12.54 17.5651C12.84 17.8651 12.84 18.3301 12.54 18.6301L9.225 21.9451C8.805 22.3651 8.235 22.6051 7.635 22.6051ZM18.18 12.6751C18.0816 12.6763 17.9841 12.6569 17.8937 12.6182C17.8033 12.5794 17.722 12.5222 17.655 12.4501C17.355 12.1501 17.355 11.6851 17.655 11.3851L20.805 8.23511C21.09 7.95011 21.09 7.47011 20.805 7.17011L16.92 3.28511C16.7767 3.14777 16.586 3.0711 16.3875 3.0711C16.189 3.0711 15.9983 3.14777 15.855 3.28511L12.615 6.52511C12.315 6.82511 11.85 6.82511 11.55 6.52511C11.25 6.22511 11.25 5.76011 11.55 5.46011L14.79 2.22011C15.645 1.36511 17.115 1.36511 17.97 2.22011L21.855 6.10511C22.725 6.97511 22.725 8.41511 21.855 9.28511L18.705 12.4351C18.555 12.5851 18.36 12.6601 18.18 12.6601V12.6751Z"
              fill=""
            />
            <path
              d="M16.35 22.5901C15.75 22.5901 15.18 22.3501 14.76 21.9301L11.475 18.6451C11.175 18.3451 11.175 17.8801 11.475 17.5801C11.775 17.2801 12.24 17.2801 12.54 17.5801L15.825 20.8651C16.11 21.1501 16.605 21.1501 16.89 20.8651L20.775 16.9801C21.06 16.6951 21.06 16.2151 20.775 15.9151L17.49 12.6301C17.19 12.3301 17.19 11.8651 17.49 11.5651C17.79 11.2651 18.255 11.2651 18.555 11.5651L21.84 14.8501C22.71 15.7201 22.71 17.1601 21.84 18.0301L17.955 21.9151C17.535 22.3351 16.965 22.5751 16.365 22.5751L16.35 22.5901Z"
              fill=""
            />
            <path
              d="M12.3752 19.2299C12.2768 19.2311 12.1793 19.2117 12.0889 19.173C11.9985 19.1342 11.9172 19.077 11.8502 19.0049L2.0402 9.20991C1.1702 8.33991 1.1702 6.89991 2.0402 6.02991L5.9252 2.14491C6.7802 1.28991 8.2502 1.28991 9.1052 2.14491L18.9152 11.9549C19.2152 12.2549 19.2152 12.7199 18.9152 13.0199C18.6152 13.3199 18.1502 13.3199 17.8502 13.0199L8.0402 3.20991C7.89693 3.07258 7.70615 2.99591 7.5077 2.99591C7.30924 2.99591 7.11846 3.07258 6.9752 3.20991L3.0902 7.09491C2.8052 7.37991 2.8052 7.85991 3.0902 8.15991L12.9002 17.9699C13.2002 18.2699 13.2002 18.7349 12.9002 19.0349C12.7502 19.1849 12.5552 19.2599 12.3752 19.2599V19.2299Z"
              fill=""
            />
            <path
              d="M8.33984 9.01509C8.24148 9.01629 8.14395 8.99689 8.05354 8.95814C7.96312 8.91939 7.88181 8.86214 7.81484 8.79009C7.51484 8.49009 7.51484 8.02509 7.81484 7.72509L10.7248 4.81509C11.0248 4.51509 11.4898 4.51509 11.7898 4.81509C12.0898 5.11509 12.0898 5.58009 11.7898 5.88009L8.87984 8.79009C8.72984 8.94009 8.53484 9.01509 8.35484 9.01509H8.33984ZM11.3848 12.0601C11.2865 12.0613 11.189 12.0419 11.0985 12.0031C11.0081 11.9644 10.9268 11.9071 10.8598 11.8351C10.5598 11.5351 10.5598 11.0701 10.8598 10.7701L13.7698 7.86009C14.0698 7.56009 14.5348 7.56009 14.8348 7.86009C15.1348 8.16009 15.1348 8.62509 14.8348 8.92509L11.9248 11.8351C11.7748 11.9851 11.5798 12.0601 11.3998 12.0601H11.3848ZM14.4298 15.1051C14.3315 15.1063 14.234 15.0869 14.1435 15.0481C14.0531 15.0094 13.9718 14.9521 13.9048 14.8801C13.6048 14.5801 13.6048 14.1151 13.9048 13.8151L16.8148 10.9051C17.1148 10.6051 17.5798 10.6051 17.8798 10.9051C18.1798 11.2051 18.1798 11.6701 17.8798 11.9701L14.9698 14.8801C14.8198 15.0301 14.6248 15.1051 14.4448 15.1051H14.4298Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Articles Published" total={articles.length}>
          <svg
            className="fill-primary dark:fill-white"
            width="18"
            height="18"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 6V7H4V6H12ZM10 2V3H4V2H10ZM8 14V9H12V14H8ZM9 10V13H11V10H9ZM12 4V5H4V4H12ZM2 0H14V16H2V0ZM13 15V1H3V15H13ZM7 13V14H4V13H7ZM7 9V10H4V9H7ZM7 11V12H4V11H7Z"
              fill=""
            />
          </svg>
        </CardDataStats>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:mt-10 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* Left Column - Departments */}
        <div className="col-span-1">
          <div className="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Some Departments
            </h4>

            <div className="flex flex-col">
              <div className="grid grid-cols-1 rounded-sm bg-gray-2 dark:bg-meta-4">
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Department Name
                  </h5>
                </div>
              </div>

              {departments.length > 0 ? (
                <>
                  {departments.slice(0, 4).map((department, index) => (
                    <div
                      className={`grid grid-cols-1 ${
                        index === departments.length - 1
                          ? ''
                          : 'border-b border-stroke dark:border-strokedark'
                      }`}
                      key={department.id}
                    >
                      <div className="p-2.5 xl:p-5">
                        <p className="text-black dark:text-white">
                          {department.name}
                        </p>
                      </div>
                    </div>
                  ))}
                  {departments.length > 4 && (
                    <div className="p-5 text-center">
                      <button
                        onClick={() => navigate('/department')}
                        className="text-blue-500 hover:underline"
                      >
                        See More
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="p-5 text-center text-gray-500">
                  Nothing found yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Articles */}
        <div className="col-span-1">
          <div className="rounded-lg border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
              Some Articles
            </h4>

            <div className="flex flex-col">
              <div className="grid grid-cols-1 rounded-sm bg-gray-2 dark:bg-meta-4">
                <div className="p-2.5 xl:p-5">
                  <h5 className="text-sm font-medium uppercase xsm:text-base">
                    Article Title
                  </h5>
                </div>
              </div>

              {articles.length > 0 ? (
                <>
                  {articles.slice(0, 4).map((article, index) => (
                    <div
                      className={`grid grid-cols-1 ${
                        index === articles.length - 1
                          ? ''
                          : 'border-b border-stroke dark:border-strokedark'
                      }`}
                      key={article.id}
                    >
                      <div className="p-2.5 xl:p-5">
                        <p className="text-black dark:text-white">
                          {article.topic}
                        </p>
                      </div>
                    </div>
                  ))}

                  {articles.length > 4 && (
                    <div className="p-5 text-center">
                      <button
                        onClick={() => navigate('/articles')}
                        className="text-blue-500 hover:underline"
                      >
                        See More
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p className="p-5 text-center text-gray-500">
                  Nothing found yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
