import React, { useContext }  from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Context } from "./App";



const ProtectedRoute = ({ component: Component, ...rest }) => {
    const [context] = useContext(Context);
  return (
    <Route {...rest} render={
      props =>{  if (context.user) {
        return <Component {...rest} {...props} />
      } else {
        return <Redirect to={
          {
            pathname: '/',
            state: {
              from: props.location
            }
          }
        } />
      }
    }
  } />
)
}

export default ProtectedRoute;