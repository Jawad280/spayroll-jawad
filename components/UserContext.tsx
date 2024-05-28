import { User } from "@/types";
import React, { createContext, useContext, ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode;
  user: User | undefined;
}

const UserContext = createContext<User | undefined>(undefined);

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<UserProviderProps> = ({
  children,
  user,
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
