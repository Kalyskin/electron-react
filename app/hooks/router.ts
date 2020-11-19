import { useHistory } from 'react-router';

export const useRouter = () => {
  const history = useHistory();
  const navigate = (url: string) => {
    history.push(url);
  };
  const goBack = () => {
    history.goBack();
  };

  return { navigate, goBack };
};
