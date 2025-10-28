import { Provider } from "react-redux";
import { store } from "./store/store";
import MainLayout from "./components/MainLayout";
import AppRouter from "./router/AppRouter";
import { BrowserRouter, useLocation } from "react-router-dom";

function LayoutWrapper() {
  const location = useLocation();

  const noLayoutRoutes = ["/login", "/register", "/forgot-password"];

  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  return isNoLayout ? (
    <AppRouter />
  ) : (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <LayoutWrapper />
    </Provider>
  );
}
