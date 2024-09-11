import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HistoricDashboard from './pages/HistoricDashboard';
import HomePage from './pages/HomePage';
import HistoricAnalytics from './pages/HistoricAnalytics';
import Notifications from './pages/Notifications';

// Create the router with nested routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/dashboard/:postOfficeID",
    element: <Dashboard />,
    children: [
      {
        path: "latest_data",
        element: <Dashboard/>
      },
      {
        path: "historic_data",
        element: <HistoricDashboard/>
      },
      {
        path: "notifications",
        element: <Notifications/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
