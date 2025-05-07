import { createHashRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { VolumePage } from './pages/Volume.page';
import { Root } from './Root';
import { TimerPage } from './pages/Timer.page';
import { RecipeDetailsPage } from './pages/RecipeDetail.page';
import { RecipesPage } from './pages/Recipes.page';

const createRouter =
  import.meta.env.USE_HASH_ROUTER === 'true' ? createHashRouter : createBrowserRouter;

const router = createRouter(
  [
    {
      path: '/',
      element: <Root />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'timer',
          element: <TimerPage />,
        },
        {
          path: 'volume',
          element: <VolumePage />,
        },
        {
          path: 'recipes',
          element: <RecipesPage />,
        },
        {
          path: 'recipes/:id',
          element: <RecipeDetailsPage />,
        },
      ],
    },
  ],
  { basename: '/' }
);

export function Router() {
  return <RouterProvider router={router} />;
}
