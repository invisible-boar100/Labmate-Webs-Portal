import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { getOneArticle } from '../api/authApi';

const ArticleInfo = () => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
  
    const location = useLocation();
    const data = location.state || {};
  
    useEffect(() => {
      fetchArticle();
    }, []);
  
    const fetchArticle = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await getOneArticle(data);
        setArticle(response.data);
      } catch (error) {
        setError('Failed to load article information.');
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <DefaultLayout>
        <div className="mx-auto max-w-270 px-4 ">
          <Breadcrumb pageName="Article Info" />

          <div className="border border-graydark/20 shadow-lg rounded-lg bg-white ">
            {loading ? (
              <p className="text-center text-gray-500">
                Loading article information...
              </p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : article ? (
              <div className="space-y-6">
                {/* Article Image */}
                <div className="flex justify-start">
                  <img
                    src={article.article_image}
                    alt={article.name}
                    className="w-full h-60 object-cover"
                  />
                </div>

                <div className="py-10 px-14 space-y-8">
                  {/* Article Topic */}
                  <div className="bg-gray-50 rounded-md">
                    <h4 className="font-semibold text-gray-800 text-lg">
                      Topic
                    </h4>
                    <p className="text-gray-600">{article.topic}</p>
                  </div>

                  {/* Article Description */}
                  <div className="bg-gray-50 rounded-md">
                    <h4 className="font-semibold text-gray-800 text-lg">
                      Description
                    </h4>
                    <p className="text-gray-600">{article.description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No article data available.
              </p>
            )}
          </div>
        </div>
      </DefaultLayout>
    );
}

export default ArticleInfo