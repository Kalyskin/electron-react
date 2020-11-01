import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import React from 'react';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

interface QuizTableToolbarProps {
  numSelected: number;
  onAddQuestion: () => void;
  onRemoveQuestions: () => void;
  onExit: () => void;
}

export const QuizTableToolbar = (props: QuizTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected, onAddQuestion, onRemoveQuestions, onExit } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {`${numSelected} выбрано`}
        </Typography>
      ) : (
        <>
          <Tooltip title="Delete">
            <IconButton onClick={onExit} aria-label="Exit">
              <PowerSettingsNewIcon />
            </IconButton>
          </Tooltip>
          <Typography
            className={classes.title}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Вопросы
          </Typography>
        </>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onRemoveQuestions} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Добавить вопрос">
          <IconButton onClick={onAddQuestion} aria-label="delete">
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};
