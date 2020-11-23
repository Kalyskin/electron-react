import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import React from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { QuizCategory } from '../../../../../electron/quiz/quiz.entity';
import { categoryTitle } from '../../../../../utils/category';
import { quizzesState } from '../../../../../recoil/atoms/quizzesState';

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
  const [quizzes, setQuizzesState] = useRecoilState(quizzesState);

  const handleChangeCategory = (e: any) => {
    setQuizzesState({ ...quizzes, category: e.target.value });
  };

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
      <Select
        fullWidth
        labelId="category-label"
        id="kpp-select"
        value={quizzes.category}
        onChange={handleChangeCategory}
      >
        <MenuItem value={QuizCategory.PT}>
          {categoryTitle(QuizCategory.PT)}
        </MenuItem>
        <MenuItem value={QuizCategory.DTC}>
          {categoryTitle(QuizCategory.DTC)}
        </MenuItem>
      </Select>
      <Tooltip title="Добавить вопрос">
        <IconButton onClick={onAddQuestion} aria-label="delete">
          <AddIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};
