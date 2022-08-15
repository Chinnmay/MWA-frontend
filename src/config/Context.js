import React, { useState, useContext, useEffect } from "react";

export const AppContext = React.createContext();
export const AppProvider = (props) => {
  const { children } = props;

  const [user, setUser] = useState("abc");

  return (
    <AppContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
