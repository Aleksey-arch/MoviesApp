import { Alert, Empty } from 'antd';
import classes from '../../index.module.css';

export function ErrorOutput({ error }) {
  return (
    <>
      <Alert
        className={classes.alertError}
        message={error.message}
        description={error.description}
        type="error"
        closable
      />
      <Empty />
    </>
  );
}
