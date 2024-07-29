import { BrowserRouter } from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import "./styles/App.css";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";
import { useEffect, useState } from "react";
import Loader from "./components/UI/Loader/Loader"; // Импортируем Loader

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      setIsAuth(true);
    }
    setIsLoading(false); // Устанавливаем состояние загрузки в false после проверки
  }, []); // Пустой массив зависимостей для выполнения только один раз при монтировании

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading,
      }}
    >
      <BrowserRouter>
        {isLoading ? (
          <Loader /> // Отображение загрузчика, пока проверяется аутентификация
        ) : (
          <>
            <Navbar />
            <AppRouter />
          </>
        )}
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
