import React, { createContext, useState, useContext } from "react";

const initialState = {
  user: null,
  setUser: () => {},
  locale: "en",
  setLocale: () => {},
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [locale, setLocale] = useState("en");

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        locale,
        setLocale,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
