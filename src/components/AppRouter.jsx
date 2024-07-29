import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./router";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  console.log("Is Authenticated:", isAuth); // Логирование состояния аутентификации

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {isAuth ? (
        <>
          {privateRoutes.map((route) => (
            <Route
              key={route.path} // Используем путь как ключ
              path={route.path}
              element={<route.component />}
              exact={route.exact}
            />
          ))}
          <Route path="*" element={<Navigate to="/posts" />} />
        </>
      ) : (
        <>
          {publicRoutes.map((route) => (
            <Route
              key={route.path} // Используем путь как ключ
              path={route.path}
              element={<route.component />}
              exact={route.exact}
            />
          ))}
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
