import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-[#3f3f3f] text-[#878787] flex flex-col items-center justify-center w-full min-h-screen">
      <h4 className="text-8xl font-semibold">404</h4>
      <p className="text-lg">
        Oops! The page you’re looking for doesn’t exist.
      </p>
        {'<'} Go Back
    </div>
  );
};

export default NotFound;
