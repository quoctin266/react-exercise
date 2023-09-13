import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../../App";
import Home from "../Home/home";
import ShoppingList from "../ShoppingList/shoppingList";
import AddForm from "../AddForm/addForm";
import Detail from "../Detail/detail";
import EditForm from "../EditForm/editForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Recipes from "../Recipes/recipes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Recipes />,
      },
      {
        path: "/recipes",
        element: <Recipes />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "add-recipe",
            element: <AddForm />,
          },
          {
            path: "detail/:id",
            element: <Detail />,
          },
          {
            path: "edit-recipe/:id",
            element: <EditForm />,
          },
        ],
      },
      {
        path: "/shopping-list",
        element: <ShoppingList />,
      },
    ],
  },
]);

const Router = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default Router;
