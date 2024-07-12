import React, { createContext, useContext, useState } from 'react';

interface MenuContextProps {
  isFullSizeMenu: boolean;
  toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFullSizeMenu, setIsFullSizeMenu] = useState(true);

  const toggleMenu = () => {
    setIsFullSizeMenu(prev => !prev);
  };

  return (
    <MenuContext.Provider value={{ isFullSizeMenu, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): MenuContextProps => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
