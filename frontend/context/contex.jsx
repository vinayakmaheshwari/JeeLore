import { createContext, useEffect, useState } from "react";

export const AllContext = createContext();

export const AllContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getAuth = async () => {
    const res = await fetch(`https://backend.jeelore.site/api/auth/me`, {
      credentials: "include",
      method: "GET",
    });
    const userFromDB = await res.json();
    setAuth(userFromDB);
    if (userFromDB.msg) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getAuth();
  }, [isLoggedIn]);

  const [posts, setPosts] = useState([]);

  const getPosts = async (skip, limit, subject, difficulty, type, status, topic ) => {
    setIsLoading(true);
    const res = await fetch(`https://backend.jeelore.site/api/qsn/getPost`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skip, limit, subject, difficulty, type, status, topic }),
    });
    const data = await res.json();
    setIsLoading(false);
    return data;
  };

  return (
    <AllContext.Provider
      value={{
        auth,
        isLoggedIn,
        setIsLoggedIn,
        getAuth,
        setAuth,
        posts,
        isLoading,
        getPosts,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
