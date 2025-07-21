import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { getAllDeptEquipmentList } from '../api/authApi';

const TroubleShoot = () => {
  const navigate = useNavigate();

  const [deptDetails, setDeptDetails] = useState([]);

  useEffect(() => {
    const fetchDeptDetails = async () => {
      try {
        const response = await getAllDeptEquipmentList();
        setDeptDetails(response.data);
      } catch (error) {}
    };

    fetchDeptDetails();
  }, []);

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="TroubleShoot" />

        <div className="mt-10 rounded-lg bg-none px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            {deptDetails.length > 0 ? (
              deptDetails.map((department) => (
                <div
                  key={department.id}
                  className="mb-8 p-6 border border-gray-200 dark:border-strokedark rounded-lg shadow-sm bg-white dark:bg-meta-4"
                >
                  {/* Department Header */}
                  <h2 className="text-xl font-semibold text-black dark:text-white border-b border-gray-300 pb-3 mb-5">
                    {department.name}
                  </h2>

                  {/* Equipment Table */}
                  <table className="w-full table-fixed border-collapse">
                    <thead>
                      <tr className="bg-black/10 dark:bg-gray-700 text-left">
                        <th className="w-1/3 py-4 px-5 font-medium text-black dark:text-white ">
                          Equipment Name
                        </th>
                        <th className="w-1/3 py-4 px-5 font-medium text-black dark:text-white ">
                          Image
                        </th>
                        <th className="w-1/3 py-4 px-5 font-medium text-black dark:text-white ">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {department.equipment.length > 0 ? (
                        department.equipment.map((equipment, index) => (
                          <tr
                            key={equipment.id}
                            className={`${
                              index % 2 === 0
                                ? 'bg-gray-50 dark:bg-gray-800'
                                : ''
                            }`}
                          >
                            <td className="py-4 px-5 whitespace-nowrap">
                              {equipment.name}
                            </td>
                            <td className="py-4 px-5">
                              <img
                                src={equipment.image}
                                alt={equipment.name}
                                className="w-16 h-16 object-cover rounded-md "
                              />
                            </td>
                            <td className=" py-4 px-5 whitespace-nowrap">
                              <button
                                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-all"
                                onClick={() =>
                                  navigate('/troubleshoot/addtroubleshoot', {
                                    state: equipment.id,
                                  })
                                }
                              >
                                Resources
                              </button>
                              
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="3"
                            className="py-5 px-5 text-gray-500 text-center"
                          >
                            No equipment available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-5">
                No departments found
              </p>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default TroubleShoot;
