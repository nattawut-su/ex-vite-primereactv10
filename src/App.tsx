import { useRoutes } from 'react-router-dom';
import routes from 'virtual:generated-pages-react';
import { Suspense } from 'react';
import TemplateLayout from './layouts/templateLayout.tsx';

const App = () => {
  const wrappedRoutes = [
    {
      path: '/',
      element: <TemplateLayout />,
      children: routes,
    },
  ];

  const element = useRoutes(wrappedRoutes);

  return <Suspense fallback={<p>Loading...</p>}>{element}</Suspense>;
};

export default App;
