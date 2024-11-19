import React, { createContext, useState, useEffect } from "react";

// Create UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      let base = "http://localhost:5050";
      const isAdmin = localStorage.getItem("isAdmin") === "true";

      if (isAdmin) {
        base += "/admin";
      } else {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found");
        base += `/cp/${userId}`;
      }

      const response = await fetch(base);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser({ ...data, isAdmin });
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user && localStorage.getItem("userId") !== undefined) {
      fetchUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
