import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useParams } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { QuizCategory } from '../electron/quiz/quiz.entity';
import { useRouter } from '../hooks/router';
import { categoryTitle } from '../utils/category';
import { currentSessionState } from '../recoil/selectors/questionsState';
import QuizItem from '../components/QuizItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    height: '54px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  bottomNav: {
    paddingTop: theme.spacing(2),
  },
}));

export default function QuizPage() {
  const classes = useStyles();
  const { goBack } = useRouter();
  const { categoryId, userId } = useParams<{
    categoryId: QuizCategory;
    userId: string;
  }>();
  const setCurrentSession = useSetRecoilState(currentSessionState);

  useEffect(() => {
    setCurrentSession({
      category: categoryId,
      userId: Number(userId),
    });
  }, [categoryId, userId, setCurrentSession]);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            onClick={() => goBack()}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            {categoryTitle(categoryId)}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className={classes.container}>
        <React.Suspense fallback={<CircularProgress />}>
          <QuizItem />
        </React.Suspense>
      </Container>
    </div>
  );
}
