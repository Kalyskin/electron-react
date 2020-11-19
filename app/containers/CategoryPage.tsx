import React, { useEffect } from 'react';
import { Button, Container, Grid } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useParams } from 'react-router';
import { useSetRecoilState } from 'recoil';
import routes from '../constants/routes.json';
import { QuizCategory } from '../electron/quiz/quiz.entity';
import { useRouter } from '../hooks/router';
import { categoryTitle } from '../utils/category';
import PageTemplate from './PageTemplate';
import {
  currentQuestionIndexState,
  currentSessionState,
} from '../recoil/selectors/questionsState';
import { answersState } from '../recoil/atoms/answersState';

const buildQuizUrl = (userId: string, category: QuizCategory): string => {
  return routes.QUIZ.replace(':categoryId', category).replace(
    ':userId',
    userId
  );
};

export default function CategoryPage() {
  const { navigate } = useRouter();
  const { userId } = useParams<{ userId: string }>();
  const setCurrentSession = useSetRecoilState(currentSessionState);
  const setAnswers = useSetRecoilState(answersState);
  const setCurrentQuestionIndex = useSetRecoilState(currentQuestionIndexState);

  useEffect(() => {
    setCurrentSession({
      category: QuizCategory.NONE,
      userId: Number(userId),
    });
    setAnswers({});
    setCurrentQuestionIndex(0);
  }, [userId, setCurrentSession, setAnswers]);

  return (
    <PageTemplate>
      <Container maxWidth="xs" style={{ paddingTop: 50 }}>
        <Grid container spacing={3} direction="column">
          <Grid item md={12}>
            <Button
              onClick={() => navigate(buildQuizUrl(userId, QuizCategory.PT))}
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
            >
              {categoryTitle(QuizCategory.PT)}
            </Button>
          </Grid>
          <Grid item md={12}>
            <Button
              onClick={() => navigate(buildQuizUrl(userId, QuizCategory.DTC))}
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
            >
              {categoryTitle(QuizCategory.DTC)}
            </Button>
          </Grid>
          <Grid item md={12}>
            <Button
              disabled
              onClick={() => navigate(routes.IDENTIFICATION)}
              fullWidth
              variant="contained"
              color="primary"
              size="medium"
            >
              Идентификация
            </Button>
          </Grid>
          <Grid item md={12}>
            <Button
              startIcon={<KeyboardBackspaceIcon />}
              fullWidth
              onClick={() => navigate(routes.HOME)}
              variant="contained"
              color="default"
              size="medium"
            >
              Назад
            </Button>
          </Grid>
        </Grid>
      </Container>
    </PageTemplate>
  );
}
