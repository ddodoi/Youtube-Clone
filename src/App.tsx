import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Error from "./components/common/Error";

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
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
