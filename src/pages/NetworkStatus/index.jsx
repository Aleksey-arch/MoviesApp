import React, { useState, useEffect } from 'react';
import { WifiOutlined } from '@ant-design/icons';
import classes from './index.module.css';

export function NetworkStatus({ children }) {
  const [isOnline, setIsOnline] = useState(true);

  const handleOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  return isOnline ? (
    children
  ) : (
    <div className={classes.containerOffline}>
      <WifiOutlined />
      <p>Нет подключения к интернету</p>
    </div>
  );
}
