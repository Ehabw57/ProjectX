import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import Form from "./Pages/Form";
import Layout from "./layouts/Layout";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "form/:type/:id?", element: <Form /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
