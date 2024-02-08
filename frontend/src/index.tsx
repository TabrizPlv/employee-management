import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateEmployeePage from "./pages/CreateEmployeePage";
import UpdateEmployeePage from "./pages/UpdateEmployeePage";
import { DepartmentEnum } from "./types/Department/Department.type";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/create",
    element: (
      <CreateEmployeePage
        employeeName=""
        salary={0}
        department={DepartmentEnum.NONE}
      />
    ),
  },
  {
    path: "/update/:emp_id",
    element: <UpdateEmployeePage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
