import React from 'react';
import { Tabs } from 'antd';

export function TabsComponent({ onChangeTabsPage, pageNumber }) {
  return (
    <Tabs
      activeKey={pageNumber}
      onChange={(e) => {
        return onChangeTabsPage(e);
      }}
      items={[
        {
          label: 'Поиск',
          key: '1'
        },
        {
          label: 'Рейтинг',
          key: '2'
        }
      ]}
    />
  );
}
