import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import React from 'react';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}));

interface QuizTableToolbarProps {
  onAddQuestion: () => void;
  onExit: () => void;
}

export const QuizTableToolbar = (props: QuizTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { onAddQuestion, onExit } = props;

  return (
    <Toolbar className={clsx(classes.root)}>
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

      <Tooltip title="Добавить вопрос">
        <IconButton onClick={onAddQuestion} aria-label="delete">
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};
