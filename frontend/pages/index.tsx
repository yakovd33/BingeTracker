import React from 'react';
import AuthHelper from '../helpers/AuthHelper';
import LoggedHome from './home/LoggedHome';
import NotLoggedHome from './home/NotLoggedHome';

const index = () => {
  return <div>
      { !AuthHelper.isLogged() && <NotLoggedHome/> }
      { AuthHelper.isLogged() && <LoggedHome/> }
  </div>;
};

export default index;
