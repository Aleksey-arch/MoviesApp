import React from 'react';
import { MainPage } from '../pages/MainPage';
import { NetworkStatus } from '../pages/NetworkStatus';

export default function App() {
  return (
    <NetworkStatus>
      {/* todo: добавить роатинг по необходимости */}
      <MainPage />
    </NetworkStatus>
  );
}
