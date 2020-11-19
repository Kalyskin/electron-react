import React, { useCallback, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { QuizTableToolbar } from './QuizToolbar';
import { QuizTableHead } from './QuizTableHead';
import { quizzesState } from '../../recoil/atoms/quizzesState';
import { ipcRequest } from '../../utils/ipcRenderer';
import { QuizEntity } from '../../electron/quiz/quiz.entity';
import { quizFormModalState } from '../../recoil/atoms/quizFormModalState';
import { DeleteModal } from './DeleteModal';
import { quizState } from '../../recoil/atoms/quizState';

const headCells = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Категория',
  },
  {
    id: 'question',
    numeric: false,
    disablePadding: false,
    label: 'Вопрос',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: '',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function QuizTable() {
  const classes = useStyles();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(-1);

  const setQuizState = useSetRecoilState(quizState);
  const [quizzes, setQuizzesState] = useRecoilState(quizzesState);
  const [{ open: isOpenFormModal }, setFormModalState] = useRecoilState(
    quizFormModalState
  );

  const fetchQuestions = useCallback(() => {
    ipcRequest('quiz/find-by-category', quizzes.category)
      .then((items: QuizEntity[]) => {
        setQuizzesState({ ...quizzes, items });
        return null;
      })
      .catch(console.error);
  }, [quizzes, setQuizzesState]);

  useEffect(() => {
    if (!isOpenFormModal) {
      fetchQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizzes.page, quizzes.category, isOpenFormModal]);

  const handleChangePage = (_: any, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddQuestion = () =>
    setFormModalState({ open: true, edit: false });

  const handleRemoveQuestion = (id: number) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };
  const handleEditQuestion = (id: number) => {
    const question = quizzes.items.find((q) => q.id === id);
    if (question) {
      setFormModalState({ open: true, edit: true });
      setQuizState(question);
    }
  };

  const handleConfirmDelete = () => {
    ipcRequest('quiz/delete-question', deleteId)
      .then(() => {
        setOpenDeleteDialog(false);
        fetchQuestions();
        return null;
      })
      .catch(() => {
        setOpenDeleteDialog(false);
      });
  };
  const handleExit = () => {
    history.push('/');
  };

  const emptyRows =
    quizzes.rowsPerPage -
    Math.min(rowsPerPage, quizzes.items.length - page * quizzes.rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <QuizTableToolbar
          onExit={handleExit}
          onAddQuestion={handleAddQuestion}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <QuizTableHead headCells={headCells} />
            <TableBody>
              {quizzes.items.map((row, index) => {
                const labelId = `quizzes-table-checkbox-${index}`;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell
                      align="right"
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.id}
                    </TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">{row.question}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleEditQuestion(row.id)}
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleRemoveQuestion(row.id)}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 25]}
          component="div"
          count={quizzes.items.length}
          rowsPerPage={quizzes.rowsPerPage}
          page={quizzes.page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <DeleteModal
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        onDelete={handleConfirmDelete}
      />
    </div>
  );
}
