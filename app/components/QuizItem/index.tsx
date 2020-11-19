import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Grid from '@material-ui/core/Grid';
import { useQuiz } from '../../hooks/quiz';
import { useRouter } from '../../hooks/router';
import routes from '../../constants/routes.json';

const useStyles = makeStyles((theme) => ({
  list: {
    flexGrow: 1,
  },
  paper: {
    flexGrow: 1,
  },
  bottomNav: {
    paddingTop: theme.spacing(2),
  },
  backWrap: {
    width: '100%',
    textAlign: 'center',
    padding: theme.spacing(2),
  },
}));

const buildResultPageUrl = (userId: number, category: string) => {
  return routes.RESULT.replace(':userId', String(userId)).replace(
    ':categoryId',
    category
  );
};

export default function QuizItem() {
  const classes = useStyles();
  const { navigate } = useRouter();
  const {
    currentQuiz,
    currentSession,
    nextQuestion,
    prevQuestion,
    isCheckedOption,
    toggleOption,
    hasNext,
    hasPrev,
    saveAnswers,
  } = useQuiz();

  const handleFinish = async () => {
    await saveAnswers();
    navigate(
      buildResultPageUrl(currentSession.userId, currentSession.category)
    );
  };

  const goToCategories = () => {
    navigate(routes.CATEGORY.replace(':userId', String(currentSession.userId)));
  };

  return (
    <Paper className={classes.paper}>
      {currentQuiz ? (
        <List className={classes.list}>
          <ListItem>
            <b>Вопрос:</b>
          </ListItem>
          <ListItem divider>
            <ListItemText primary={currentQuiz.question} />
          </ListItem>
          {currentQuiz.options.map((option, index) => {
            const labelId = `checkbox-list-label-${index}`;
            return (
              <ListItem
                onClick={() => toggleOption(option.text)}
                divider
                key={labelId}
                button
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={isCheckedOption(option.text)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={option.text} />
              </ListItem>
            );
          })}
          <ListItem alignItems="center">
            <Grid
              className={classes.bottomNav}
              container
              spacing={2}
              alignItems="center"
              justify="flex-end"
            >
              <Grid item>
                <Button
                  disabled={!hasPrev()}
                  onClick={prevQuestion}
                  variant="contained"
                  color="primary"
                  startIcon={<NavigateBeforeIcon />}
                >
                  назад
                </Button>
              </Grid>
              <Grid item>
                {hasNext() ? (
                  <Button
                    onClick={nextQuestion}
                    variant="contained"
                    color="primary"
                    endIcon={<NavigateNextIcon />}
                  >
                    следующий
                  </Button>
                ) : (
                  <Button
                    onClick={handleFinish}
                    variant="contained"
                    color="primary"
                    endIcon={<NavigateNextIcon />}
                  >
                    Завершить
                  </Button>
                )}
              </Grid>
            </Grid>
          </ListItem>
        </List>
      ) : (
        <div className={classes.backWrap}>
          <h2>Нет вопросов</h2>
          <Button
            onClick={goToCategories}
            variant="contained"
            color="primary"
            startIcon={<NavigateBeforeIcon />}
          >
            Назад
          </Button>
        </div>
      )}
    </Paper>
  );
}
