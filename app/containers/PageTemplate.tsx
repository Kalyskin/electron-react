import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  };
});

type Props = {
  children: ReactNode;
};

export default function PageTemplate(props: Props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>{children}</main>
    </div>
  );
}
