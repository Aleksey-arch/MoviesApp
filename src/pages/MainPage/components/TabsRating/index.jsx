import React from 'react';
import { Tabs } from 'antd';
import classes from './index.module.css';

export function TabsRating({ onChangeTabsRating, timeInterval }) {
  return (
    <Tabs
      className={classes.tabs}
      activeKey={timeInterval}
      onChange={(e) => {
        return onChangeTabsRating(e);
      }}
      items={[
        {
          label: 'Топ за день',
          key: 'day'
        },
        {
          label: 'Топ за неделю',
          key: 'week'
        }
      ]}
    />
  );
}
