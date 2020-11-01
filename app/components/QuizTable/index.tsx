import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { useRecoilState } from 'recoil';
import { useHistory } from 'react-router';
import { QuizTableToolbar } from './QuizToolbar';
import { QuizTableHead } from './QuizTableHead';
import { quizzesState } from '../../recoil/atoms/quizzesState';
import { ipcRequest } from '../../utils/ipcRenderer';
import { QuizEntity } from '../../electron/quiz/quiz.entity';
import { quizFormModalState } from '../../recoil/atoms/quizFormModalState';

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

  const [quizzes, setQuizzesState] = useRecoilState(quizzesState);
  const [{ open: isOpenFormModal }, setFormModalState] = useRecoilState(
    quizFormModalState
  );

  useEffect(() => {
    if (!isOpenFormModal) {
      ipcRequest('quiz/find-by-category', quizzes.category)
        .then((items: QuizEntity[]) => {
          setQuizzesState({ ...quizzes, items });
          return null;
        })
        .catch((error) => {
          console.error('ipcRequest error quiz/create', error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizzes.page, quizzes.category, isOpenFormModal, setQuizzesState]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const selectedIds = quizzes.items.map((n) => n.id);
      setQuizzesState({ ...quizzes, selectedIds });
      return;
    }
    setQuizzesState({ ...quizzes, selectedIds: [] });
  };

  const handleClick = (_: any, id: number) => {
    const selectedIndex = quizzes.selectedIds.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(quizzes.selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(quizzes.selectedIds.slice(1));
    } else if (selectedIndex === quizzes.selectedIds.length - 1) {
      newSelected = newSelected.concat(quizzes.selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        quizzes.selectedIds.slice(0, selectedIndex),
        quizzes.selectedIds.slice(selectedIndex + 1)
      );
    }
    setQuizzesState({ ...quizzes, selectedIds: newSelected });
  };

  const handleChangePage = (_: any, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddQuestion = () => setFormModalState({ open: true });
  const handleRemoveQuestions = () => {};
  const handleExit = () => {
    history.push('/');
  };

  const isSelected = (id: number) => {
    return quizzes.selectedIds.indexOf(id) !== -1;
  };

  const emptyRows =
    quizzes.rowsPerPage -
    Math.min(rowsPerPage, quizzes.items.length - page * quizzes.rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <QuizTableToolbar
          numSelected={quizzes.selectedIds.length}
          onExit={handleExit}
          onAddQuestion={handleAddQuestion}
          onRemoveQuestions={handleRemoveQuestions}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <QuizTableHead
              headCells={headCells}
              numSelected={quizzes.selectedIds.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={quizzes.items.length}
            />
            <TableBody>
              {quizzes.items.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `quizzes-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
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
    </div>
  );
}
