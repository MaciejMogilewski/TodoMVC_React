import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Details from "./Details/Details.jsx";
import DetailsEdit from "./Details/DetailsEdit.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/details/:id",
    element: <Details/>
  },
  {
    path: "/details/:id/edit",
    element: <DetailsEdit/>
  },
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
