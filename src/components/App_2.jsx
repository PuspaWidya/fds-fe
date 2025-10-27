import { Provider } from "react-redux";
import { store } from "./store/store";
import MainLayout from "./components/MainLayout";
import LiveAlert from "./pages/LiveAlert";
import AppRouter from "./router/AppRouter";
import { BrowserRouter, useLocation } from "react-router-dom";

function LayoutWrapper() {
  const location = useLocation();
  // daftar route yang TIDAK pakai MainLayout
  const noLayoutRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/transaction-alert",
  ];

  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  console.log(isNoLayout);
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
      <BrowserRouter>
        {/* <LayoutWrapper /> */}
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}
