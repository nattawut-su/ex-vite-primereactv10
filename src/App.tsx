import { useRoutes } from 'react-router-dom';
import routes from '~react-pages';

const App = () => {
  const element = useRoutes(routes);
  return element;
};

export default App;
