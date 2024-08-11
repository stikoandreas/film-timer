import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { VolumePage } from './pages/Volume.page';
import { Root } from './Root';
import { TimerPage } from './pages/Timer.page';
import { RecipeDetailsPage } from './pages/RecipeDetail.page';
import { RecipesPage } from './pages/Recipes.page';

const router = createBrowserRouter(
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
  { basename: '/film-timer/' }
);

export function Router() {
  return <RouterProvider router={router} />;
}
