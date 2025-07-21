import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';

import Dashboard from './pages/Dashboard/Dashboard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import NotFound from './pages/NotFound';
import Department from './pages/Department';
import TroubleShoot from './pages/TroubleShoot';
import AddEquipDetails from './pages/AddEquipDetails';
import Articles from './pages/Articles';
import NewArticle from './pages/NewArticle';
import ArticleInfo from './pages/ArticleInfo';
import useUserStore from './context/userStore';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!user.is_admin) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/signin" replace />} />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            
              <>
                <PageTitle title="Dashboard" />
                <Dashboard />
              </>
           
          }
        />
        <Route
          path="/department"
          element={
            
              <>
                <PageTitle title="Department" />
                <Department />
              </>
           
          }
        />
        <Route
          path="/troubleshoot"
          element={
            
              <>
                <PageTitle title="TroubleShoot" />
                <TroubleShoot />
              </>
           
          }
        />
        <Route
          path="/troubleshoot/addtroubleshoot"
          element={
            
              <>
                <PageTitle title="TroubleShoot" />
                <AddEquipDetails />
              </>
           
          }
        />
       
        <Route
          path="/articles"
          element={
            
              <>
                <PageTitle title="Admin Articles" />
                <Articles />
              </>
           
          }
        />
        <Route
          path="/articles/article"
          element={
            
              <>
                <PageTitle title="Admin Article" />
                <NewArticle />
              </>
           
          }
        />
        <Route
          path="/articles/articleinfo"
          element={
            
              <>
                <PageTitle title="Admin Articles" />
                <ArticleInfo />
              </>
           
          }
        />
        <Route
          path="/settings"
          element={
            
              <>
                <PageTitle title="Settings" />
                <Settings />
              </>
           
          }
        />
        <Route
          path="/profile"
          element={
            
              <>
                <PageTitle title="Profile" />
                <Profile />
              </>
           
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            
              <>
                <PageTitle title="Form Elements" />
                <FormElements />
              </>
           
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            
              <>
                <PageTitle title="Form Layout" />
                <FormLayout />
              </>
           
          }
        />
        <Route
          path="/tables"
          element={
            
              <>
                <PageTitle title="Tables" />
                <Tables />
              </>
           
          }
        />
        <Route
          path="/ui/alerts"
          element={
            
              <>
                <PageTitle title="Alerts" />
                <Alerts />
              </>
           
          }
        />
        <Route
          path="/ui/buttons"
          element={
            
              <>
                <PageTitle title="Buttons" />
                <Buttons />
              </>
           
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
