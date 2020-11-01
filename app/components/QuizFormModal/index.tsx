import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useRecoilState } from 'recoil';
import { QuizCategory } from '../../electron/quiz/quiz.entity';
import { quizState } from '../../recoil/atoms/quizState';
import { ipcRequest } from '../../utils/ipcRenderer';
import { quizFormModalState } from '../../recoil/atoms/quizFormModalState';

const useStyles = makeStyles((theme) => {
  return {
    formControl: {
      margin: theme.spacing(2),
    },
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  };
});

export function QuizFormModal() {
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [quiz, setQuiz] = useRecoilState(quizState);
  const [{ open }, setFormModalState] = useRecoilState(quizFormModalState);

  const onClose = () => {
    setFormModalState({ open: false });
  };
  const resetQuizState = () =>
    setQuiz({
      id: 0,
      category: QuizCategory.PT,
      question: '',
      options: [],
    });

  const handleChangeCategory = (e: any) => {
    setQuiz({ ...quiz, category: e.target.value });
  };

  const handleSave = () => {
    const { id, ...createEntity } = quiz;
    ipcRequest('quiz/create', createEntity)
      .then((_: any) => {
        resetQuizState();
        onClose();
        return null;
      })
      .catch((error) => {
        console.log('ipcRequest error quiz/create', error);
        onClose();
      });
  };

  const handleCancel = () => {
    resetQuizState();
    onClose();
  };

  const handleToggle = (index: number) => () => {
    setQuiz({
      ...quiz,
      options: quiz.options.map((value, _index) => ({
        ...value,
        // eslint-disable-next-line no-nested-ternary
        score: _index === index ? (value.score === 1 ? 0 : 1) : value.score,
      })),
    });
  };
  const handleChangeQuestion = (event: any) => {
    setQuiz({
      ...quiz,
      question: event.target.value,
    });
  };
  const handleAddVariant = () => {
    setQuiz({
      ...quiz,
      options: [
        ...quiz.options,
        {
          text: '',
          score: 0,
        },
      ],
    });
  };

  const handleChangeOptionText = (index: number) => (event: any) => {
    setQuiz({
      ...quiz,
      options: quiz.options.map((value, _index) => ({
        ...value,
        // eslint-disable-next-line no-nested-ternary
        text: _index === index ? event.target.value : value.text,
      })),
    });
  };

  const handleRemoveOption = (index: number) => () => {
    setQuiz({
      ...quiz,
      options: quiz.options.filter((_, _index) => _index !== index),
    });
  };

  const isChecked = (index: number) => {
    return quiz.options[index].score === 1;
  };

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle style={{ minWidth: 550 }} id="responsive-dialog-title">
        Вопрос
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <InputLabel id="category-label">Категория</InputLabel>
            <Select
              fullWidth
              labelId="category-label"
              id="kpp-select"
              value={quiz.category}
              onChange={handleChangeCategory}
            >
              <MenuItem value={QuizCategory.PT}>{QuizCategory.PT}</MenuItem>
              <MenuItem value={QuizCategory.DTC}>{QuizCategory.DTC}</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              onChange={handleChangeQuestion}
              value={quiz.question}
              multiline
              rows={2}
              fullWidth
              label="Вопрос"
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <List
              className={classes.root}
              subheader={<ListSubheader>Варианты</ListSubheader>}
            >
              {quiz.options.map((option, index) => {
                const labelId = `checkbox-list-label-${index}`;

                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <ListItem key={index} role={undefined} dense button>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        onClick={handleToggle(index)}
                        checked={isChecked(index)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={
                        <TextField
                          fullWidth
                          label={`Вариант ${index + 1}`}
                          value={option.text}
                          onChange={handleChangeOptionText(index)}
                        />
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={handleRemoveOption(index)}
                        edge="end"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
            <Button
              onClick={handleAddVariant}
              variant="contained"
              color="primary"
            >
              Добавить вариант
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Отмена
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          color="primary"
          autoFocus
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
