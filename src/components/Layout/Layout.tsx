import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import Footer from './components/Footer';
import MainNav from './components/MainNav';

import '../../styles/Layout.css';
import { userContext } from '../../App';
import { PATH_INDEX, PATH_LOGIN } from '../../utils/constants';

function Layout(): React.ReactElement {
   const user = useContext(userContext);
   const location = useLocation();
   const navigate = useNavigate();

   useEffect(() => {
      if (location.pathname === PATH_LOGIN) {
         if (user) {
            navigate(PATH_INDEX);
         }
      } else {
         if (!user) {
            navigate(PATH_LOGIN);
         }
      }
   }, [location]);

   return (
      <div className="layout">
         <MainNav />
         <Outlet />
         <Footer />
      </div>
   );
}

export default Layout;
