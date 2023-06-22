import React from 'react';
import axios from 'axios';

const ApiContext = React.createContext();

export const ApiProvider = ({children}) => {
  const api = axios.create({
    baseURL: 'http://saartaler.site:80/api',
  });

  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiContext;