import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useRecoilState } from 'recoil';
import { Redirect } from 'react-router';
import { authState } from '../../../recoil/atoms/authState';
import routes from '../../../constants/routes.json';
import { useRouter } from '../../../hooks/router';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backButton: {
    margin: theme.spacing(0, 0, 2),
  },
}));

export default function AuthPage() {
  const classes = useStyles();
  const { navigate } = useRouter();
  const [auth, setAuth] = useRecoilState(authState);
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');

  if (auth) {
    return <Redirect to={routes.ADMIN} />;
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password === '123456n') {
      setAuth(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Не правильный пароль');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Логин
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            error={!!errorMessage}
            helperText={errorMessage}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            value={password}
            onInput={(e: any) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="default"
            className={classes.backButton}
            onClick={() => navigate(routes.HOME)}
          >
            Назад
          </Button>
        </form>
      </div>
    </Container>
  );
}
