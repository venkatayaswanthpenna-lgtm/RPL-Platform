import React, { createContext, useContext, useEffect, useState } from 'react';

interface NetworkContextType {
  isOnline: boolean;
}

const NetworkContext = createContext<NetworkContextType>({ isOnline: true });

export const NetworkProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
      {!isOnline && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg flex items-center space-x-2 z-50">
          <span className="w-2 h-2 bg-red-300 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium">Offline Mode - Changes will sync later</span>
        </div>
      )}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);
