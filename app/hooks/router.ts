import { useHistory } from 'react-router';
import { useCallback } from 'react';

export const useRouter = () => {
  const history = useHistory();
  const navigate = useCallback(
    (url: string) => {
      history.push(url);
    },
    [history]
  );
  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return { navigate, goBack };
};
