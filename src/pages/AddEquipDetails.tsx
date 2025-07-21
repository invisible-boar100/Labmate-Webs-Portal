import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { addTroubleShootDetails, deleteResourceById, getResourceById } from '../api/authApi';

const AddEquipDetails = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const data = location.state || {};
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    equipment_id: data,
    manual: null as File | null,
    video_link: '',
  });

    const [resources, setResources] = useState([]);
  
    useEffect(() => {
      const fetchResources = async () => {
        try {
          const response = await getResourceById(data);
          setResources(response.data);
        } catch (error) {
          console.error('Error fetching resources:', error);
        }
      };

      fetchResources();
      
    }, []);
  
    const handleDelete = async (id: any) => {
      if (!window.confirm('Are you sure you want to delete these resources?'))
        return;
      try {
        const response = await deleteResourceById(id);
        console.log(response)
        setResources((prevResources) =>
          prevResources.filter((resource) => resource.id !== id),
        );
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    };

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.video_link.trim()) newErrors.video_link = 'Video link is required';

    if (!formData.manual) {
      newErrors.manual = 'Doc is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, type, value, files } = e.target as HTMLInputElement;

    if (type === 'file' && files) {
      const file = files[0];

      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setAlert(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await addTroubleShootDetails(formData);

      if (response.success) {

        const updatedResources = await getResourceById(data);
        setResources(updatedResources.data);

        setFormData({
          equipment_id: data,

          manual: null,
          video_link: '',
        });

        setAlert({
          type: 'success',
          message: 'Upload completed',
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Something went wrong. Please try again!',
      });

      setTimeout(() => {
        setAlert(null);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="mx-auto ">
        <Breadcrumb pageName="Add Resources" />
        {alert && (
          <div
            className={`fixed top-44 right-5 z-999999 flex w-[300px] border-l-4 px-4 py-3 shadow-lg rounded-lg 
          ${
            alert.type === 'success'
              ? 'border-[#34D399] bg-white'
              : 'border-red-500 bg-white'
          }`}
          >
            <div className="mr-3 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2984 0.826822L15.2868 0.811827L15.2741 0.797751C14.9173 0.401867 14.3238 0.400754 13.9657 0.794406L5.91888 9.45376L2.05667 5.2868C1.69856 4.89287 1.10487 4.89389 0.747996 5.28987C0.417335 5.65675 0.417335 6.22337 0.747996 6.59026L0.747959 6.59029L0.752701 6.59541L4.86742 11.0348C5.14445 11.3405 5.52858 11.5 5.89581 11.5C6.29242 11.5 6.65178 11.3355 6.92401 11.035L15.2162 2.11161C15.5833 1.74452 15.576 1.18615 15.2984 0.826822Z"
                  fill={alert.type === 'success' ? '#34D399' : 'red'}
                  stroke={alert.type === 'success' ? '#34D399' : 'red'}
                ></path>
              </svg>
            </div>
            <div className="w-full">
              <h5
                className={`mb-1 text-sm font-semibold ${
                  alert.type === 'success'
                    ? 'text-black dark:text-[#34D399]'
                    : 'text-black dark:text-red-400'
                }`}
              >
                {alert.type === 'success' ? 'Success!' : 'Error!'}
              </h5>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                {alert.message}
              </p>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">
            Add Details to Equipment in Department
          </h2>

          <label className="block mb-2">Upload File:</label>
          <input
            type="file"
            onChange={handleChange}
            ref={fileInputRef}
            name="manual"
            className="border p-2 w-full mb-4 rounded"
          />
          {errors.manual && (
            <p className="text-red-500 text-sm">{errors.manual}</p>
          )}
          <label className="block mb-2">Video Link:</label>
          <input
            type="video_link"
            name="video_link"
            value={formData.video_link}
            onChange={handleChange}
            className="border p-2 w-full mb-4 rounded"
          />
          {errors.video_link && (
            <p className="text-red-500 text-sm">{errors.video_link}</p>
          )}
          {resources.length === 0 && (
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center space-x-2">
                  <div className="h-6 w-6 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                'Submit'
              )}
            </button>
          )}
          
        </form>
      </div>
      <div className="mt-6 bg-white dark:bg-boxdark p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-black dark:text-white mb-4">
          Resource List
        </h2>

        {resources.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="py-4 px-5 font-medium text-black dark:text-white">
                  File
                </th>
                <th className="py-4 px-5 font-medium text-black dark:text-white">
                  URL Link
                </th>
                <th className="py-4 px-5 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource, index) => (
                <tr
                  key={resource.id}
                  className={
                    index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''
                  }
                >
                  <td className="py-4 px-5">
                    {resource.manual ? (
                      <a
                        href={resource.manual}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {'Download File'}
                      </a>
                    ) : (
                      <span className="text-gray-500">No file available </span>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    {resource.video_link ? (
                      <a
                        href={resource.video_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {resource.video_link}
                      </a>
                    ) : (
                      <span className="text-gray-500">No link available</span>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <button
                      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all"
                      onClick={() => handleDelete(resource.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 text-center py-5">No resources found</p>
        )}
      </div>
    </DefaultLayout>
  );
};

export default AddEquipDetails;
