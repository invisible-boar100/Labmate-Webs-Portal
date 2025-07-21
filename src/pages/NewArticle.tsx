import React, { useRef, useState } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useLocation, useNavigate } from 'react-router-dom';
import { addArticle } from '../api/authApi';


const NewArticle = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    topic: '',
    read_time: '',
    description: '',
    article_image: null,
    previewImage: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!formData.topic.trim()) newErrors.topic = 'Topic is required';
    if (!formData.read_time.trim()) newErrors.read_time = 'Read time is required';

    if (!formData.description.trim())
      newErrors.description = 'Description is required';

    if (!formData.article_image) {
      newErrors.article_image = 'Article image is required';
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
      const imageUrl = URL.createObjectURL(file);

      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
        previewImage: imageUrl,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setAlert(null);

    if (!validateForm()) return;

    setLoading(true);
        try {
          const response = await addArticle(formData);
    
            if (response.success) {
            setFormData({
              topic: '',
              read_time: '',
              description: '',
              article_image: null,
              previewImage: '',
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
      <Breadcrumb pageName="Add Article" />
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
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Enter Data Here
          </h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Article Title
              </label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                placeholder="Enter topic"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.topic && (
                <p className="text-red-500 text-sm">{errors.topic}</p>
              )}
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Article Read time
              </label>
              <input
                type="text"
                name="read_time"
                value={formData.read_time}
                onChange={handleChange}
                placeholder="Enter read time"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {errors.read_time && (
                <p className="text-red-500 text-sm">{errors.read_time}</p>
              )}
            </div>
            
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Attach Picture
              </label>
              <input
                type="file"
                ref={fileInputRef}
                name="article_image"
                onChange={handleChange}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>
            {/* Image Preview */}
            {formData.previewImage && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Image Preview:</p>
                <img
                  src={formData.previewImage}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
            {errors.article_image && (
              <p className="text-red-500 text-sm">{errors.article_image}</p>
            )}
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Type Article Here
              </label>
              <textarea
                rows={6}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
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
        </form>
      </div>
    </DefaultLayout>
  );
};

export default NewArticle;
