import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import Error from "./components/common/Error";
import { ThemeProvider } from "styled-components";
import { useThemeStore } from "./stores/themeStore";
import { GlobalStyle } from "./style/global";
import Login from "./pages/Login";
import MainPage from "./components/mainPage/MainPage";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000, // 1분
            retry: 1,
        },
    },
});

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
    const { getTheme } = useThemeStore();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={getTheme()}>
                <GlobalStyle />
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
