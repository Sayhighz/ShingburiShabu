import React from 'react';
import { Redirect } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const isLoggedIn = localStorage.getItem('valid') === 'true';
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
