import React from 'react';
import { Button, Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router';
import routes from '../constants/routes.json';

export default function CategoryPage() {
  const history = useHistory();
  const handleClick = () => {
    history.push(routes.HOME);
  };
  return (
    <Container maxWidth="xs" style={{ paddingTop: 50 }}>
      <Grid container spacing={3} direction="column">
        <Grid item md={12}>
          <Button
            onClick={handleClick}
            fullWidth
            variant="contained"
            color="primary"
            size="medium"
          >
            Проверка документов (ПД)
          </Button>
        </Grid>
        <Grid item md={12}>
          <Button
            onClick={handleClick}
            fullWidth
            variant="contained"
            color="primary"
            size="medium"
          >
            Досмотр транспортных средств (ДТС)
          </Button>
        </Grid>
        <Grid item md={12}>
          <Button
            onClick={handleClick}
            fullWidth
            variant="contained"
            color="primary"
            size="medium"
          >
            Идентификация
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
