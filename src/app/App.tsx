import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  // Ensure router updates on HMR
  return <RouterProvider router={router} key="router-instance-3" />;
}
