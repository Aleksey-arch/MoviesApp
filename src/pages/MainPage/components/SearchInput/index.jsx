import React from 'react';
import { Input } from 'antd';
import classes from './index.module.css';

export function SearchInput({ onChange, placeholder }) {
  return (
    <Input
      rootClassName={classes.input}
      placeholder="Type to search..."
      onChange={(e) => {
        return onChange(e.target.value);
      }}
    />
  );
}
