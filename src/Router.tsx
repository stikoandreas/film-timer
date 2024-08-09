import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { VolumePage } from './pages/Volume.page';
import { Root } from './Root';
import { TimerPage } from './pages/Timer.page';

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
      ],
    },
  ],
  { basename: '/film-timer/' }
);

export function Router() {
  return <RouterProvider router={router} />;
}
