import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Error from "./components/common/Error";
import { ThemeProvider } from "styled-components";
import { useThemeStore } from "./stores/themeStore";
import { GlobalStyle } from "./style/global";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout>
                <div>MainPage</div>
            </Layout>
        ),
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
