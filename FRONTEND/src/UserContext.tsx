import React, { createContext, useState } from "react";

interface UserInfo {
  // Define properties of user info
  id: string;
  name: string;
  // Add more properties if needed
}

interface ContextType {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const UserContext = createContext<ContextType>({
  userInfo: { id: '', name: '' },
  setUserInfo: () => { }
});

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>({ id: '', name: '' });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}

