import React from 'react';
import { Button, Container, Grid } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useParams } from 'react-router';
import routes from '../constants/routes.json';
import { QuizCategory } from '../electron/quiz/quiz.entity';
import { useRouter } from '../hooks/router';
import { categoryTitle } from '../utils/category';
import PageTemplate from './PageTemplate';

const buildQuizUrl = (userId: string, category: QuizCategory): string => {
  return routes.QUIZ.replace(':categoryId', category).replace(
    ':userId',
    userId
  );
};

export default function CategoryPage() {
  const { navigate, goBack } = useRouter();
  const { userId } = useParams<{ userId: string }>();

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
              onClick={() => goBack()}
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
