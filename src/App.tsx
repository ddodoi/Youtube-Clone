import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout";
import Error from "./components/common/Error";
import { ThemeProvider } from "styled-components";
import { useThemeStore } from "./stores/themeStore";
import { GlobalStyle } from "./style/global";
import MainPage from "./pages/MainPage";
import SearchResult from "./pages/SearchResult";
import Channel from "./pages/Channel";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import WatchPage from "./pages/WatchPage";
import WatchPageLayout from "@components/layout/WatchPageLayout";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
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
        path: "/channel/:channelId",
        element: (
            <Layout>
                <Channel />
            </Layout>
        ),
        errorElement: <Error />,
    },
    {
        path: "/login",
        element: <LoginPage />,
        errorElement: <Error />,
    },
    {
        path: "/join",
        element: <JoinPage />,
        errorElement: <Error />,
    },
    {
        path: "/results",
        element: (
            <Layout>
                <SearchResult />
            </Layout>
        ),
        errorElement: <Error />,
    },
    {
        path: "/watch",
        element: (
            <WatchPageLayout>
                <WatchPage />
            </WatchPageLayout>
        ),
        errorElement: <Error />,
    },
]);

function App() {
    const { getTheme } = useThemeStore();
    const currentTheme = getTheme();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={currentTheme}>
                <GlobalStyle />
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
