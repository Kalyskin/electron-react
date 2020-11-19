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
}));

export default function QuizItem() {
  const classes = useStyles();
  const {
    currentQuiz,
    nextQuestion,
    prevQuestion,
    isCheckedOption,
    toggleOption,
  } = useQuiz();

  return (
    <Paper className={classes.paper}>
      {currentQuiz && (
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
                  onClick={prevQuestion}
                  variant="contained"
                  color="primary"
                  startIcon={<NavigateBeforeIcon />}
                >
                  назад
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={nextQuestion}
                  variant="contained"
                  color="primary"
                  endIcon={<NavigateNextIcon />}
                >
                  следующий
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      )}
    </Paper>
  );
}
