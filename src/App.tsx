import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Error from "./components/common/Error";
import { ThemeProvider } from "styled-components";
import { useThemeStore } from "./stores/themeStore";
import { GlobalStyle } from "./style/global";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout>
                <MainPage />
            </Layout>
        ),
        errorElement: <Error />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
    },
]);

function App() {
    const { themeName, getTheme } = useThemeStore();

    return (
        <ThemeProvider theme={getTheme(themeName)}>
            <GlobalStyle />
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}

export default App;
