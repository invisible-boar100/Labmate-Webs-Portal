import React, { useEffect, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { FaTimes } from 'react-icons/fa';
import {
  addEquipments,
  deleteEquipment,
  getAllDepartments,
  getAllDeptEquipmentList,
} from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const Department = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [departments, setDepartments] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedDepartment, setSelectedDepartment] = useState<{
    id: number;
    departmentId: string;
    name: string;
    fields: { id: number; name: string; image: File | null }[];
  } | null>(null);
  const [deptDetails, setDeptDetails] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getAllDepartments();
        const departmentList = response.data.map((dept) => ({
          id: dept.id.toString(),
          name: dept.name,
        }));
        setDepartments(departmentList);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };

    const fetchDeptDetails = async () => {
      try {
        const response = await getAllDeptEquipmentList();
        setDeptDetails(response.data);
      } catch (error) {}
    };

    fetchDepartments();
    fetchDeptDetails();
  }, []);

  const handleDepartmentChange = (selectedId: string) => {
    const selectedDept = departments.find((d) => d.id === selectedId);
    if (selectedDept) {
      setSelectedDepartment({
        id: Date.now(),
        departmentId: selectedDept.id,
        name: selectedDept.name,
        fields: [],
      });
    }
  };

  const handleAddField = () => {
    if (!selectedDepartment) return;
    setSelectedDepartment((prev) => ({
      ...prev!,
      fields: [...prev!.fields, { id: Date.now(), name: '', image: null }],
    }));
  };

  const handleInputChange = (
    fieldId: number,
    value: string | File,
    key: 'name' | 'image',
  ) => {
    if (!selectedDepartment) return;
    setSelectedDepartment((prev) => ({
      ...prev!,
      fields: prev!.fields.map((field) =>
        field.id === fieldId ? { ...field, [key]: value } : field,
      ),
    }));
  };

  const handleImageChange = (
    fieldId: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      handleInputChange(fieldId, file, 'image'); // Store the raw file object
    }
  };

  const handleRemoveField = (fieldId: number) => {
    if (!selectedDepartment) return;
    setSelectedDepartment((prev) => ({
      ...prev!,
      fields: prev!.fields.filter((field) => field.id !== fieldId),
    }));
  };

  const fetchDeptDetails = async () => {
    try {
      const response = await getAllDeptEquipmentList();
      setDeptDetails(response.data);
    } catch (error) {
      console.error('Error fetching department details:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!selectedDepartment) return;
      setLoading(true);

      const formData = new FormData();
      formData.append('department_id', selectedDepartment.departmentId);

      selectedDepartment.fields.forEach((field, index) => {
        formData.append(`equip${index + 1}_name`, field.name);

        if (field.image) {
          // Ensure only the file is sent, without encoding issues
          formData.append(
            `equip${index + 1}_image`,
            field.image,
            field.image.name,
          );
        }
      });

      const response = await addEquipments(formData);
      setLoading(false);

      if (response.success) {
        setSelectedDepartment(null);
        setAlert({ type: 'success', message: 'Upload completed' });
        setTimeout(() => {
          setAlert(null);
        }, 3000);
        fetchDeptDetails();
      }
    } catch (error) {
      setLoading(false);
      setAlert({
        type: 'error',
        message: 'Something went wrong. Please try again!',
      });
    }
  };

  const handleDeleteEquipments = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this equipment?'))
      return;

    try {
      await deleteEquipment(id);
      setDeptDetails((prevDetails) =>
        prevDetails.map((dept) => ({
          ...dept,
          equipment: dept.equipment.filter((equip) => equip.id !== id),
        })),
      );
    } catch (error) {
      console.error('Error deleting equipment:', error);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Department & Equipments" />
        {alert && (
          <div
            className={`fixed top-44 right-5 z-50 flex w-[300px] border-l-4 px-4 py-3 shadow-lg rounded-lg 
          ${
            alert.type === 'success'
              ? 'border-green-500 bg-white'
              : 'border-red-500 bg-white'
          }`}
          >
            <div className="mr-3 flex items-center justify-center">
              {alert.type === 'success' ? (
                <svg className="text-green-500 w-5 h-5" viewBox="0 0 16 12">
                  <path
                    fill="currentColor"
                    d="M15.3 0.8L15.2 0.8L15.2 0.7C14.9 0.4 14.3 0.4 13.9 0.8L5.9 9.4L2 5.2C1.7 4.8 1.1 4.9 0.7 5.2C0.4 5.6 0.4 6.2 0.7 6.5L4.8 11C5.1 11.3 5.5 11.5 5.9 11.5C6.3 11.5 6.6 11.3 6.9 11L15.2 2.1C15.6 1.7 15.6 1.1 15.3 0.8Z"
                  ></path>
                </svg>
              ) : (
                <FaTimes className="text-red-500 w-5 h-5" />
              )}
            </div>
            <div>
              <h5 className="text-sm font-semibold">
                {alert.type === 'success' ? 'Success!' : 'Error!'}
              </h5>
              <p className="text-xs text-gray-600">{alert.message}</p>
            </div>
          </div>
        )}

        <h2 className="text-xl font-bold mb-4">Select Department</h2>
        <div className="mb-4">
          <select
            className="border p-2 rounded w-full"
            value={selectedDepartment?.departmentId || ''}
            onChange={(e) => handleDepartmentChange(e.target.value)}
          >
            <option value="">Select a department</option>
            {departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {selectedDepartment && (
          <div className="p-4 border rounded shadow-sm bg-gray-100">
            {selectedDepartment.fields.map((field) => (
              <div
                key={field.id}
                className="mb-3 flex items-center justify-between px-3 py-4 border rounded-md"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Enter name"
                    className="w-full border p-2 rounded mb-2"
                    value={field.name}
                    onChange={(e) =>
                      handleInputChange(field.id, e.target.value, 'name')
                    }
                  />
                  <input
                    type="file"
                    className="w-full border p-2 rounded mb-2"
                    onChange={(e) => handleImageChange(field.id, e)}
                  />
                  {field.image && (
                    <img
                      src={URL.createObjectURL(field.image)}
                      alt="Preview"
                      className="mt-2 h-16 w-16 object-cover rounded"
                    />
                  )}
                </div>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveField(field.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleAddField}
            >
              Add Equipment
            </button>
          </div>
        )}

        <button
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          onClick={handleSubmit}
        >
          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
              <span>Loading...</span>
            </div>
          ) : (
            'Submit'
          )}{' '}
        </button>
      </div>
      <div className="mt-20 rounded-lg bg-none px-5 pt-6 pb-2.5 dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
                            index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''
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
                              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-all ml-3"
                              onClick={() =>
                                handleDeleteEquipments(equipment.id)
                              }
                            >
                              Delete Equipment
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
    </DefaultLayout>
  );
};

export default Department;
