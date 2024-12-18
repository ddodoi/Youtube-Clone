import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@assets": "/src/assets",
            "@components": "/src/components",
            "@stores": "/src/stores",
            "@hooks": "/src/hooks",
            "@@types": "/src/types",
            "@apis": "/src/apis",
        },
    },
    plugins: [
        react(),
        svgr({
            // svgr options: https://react-svgr.com/docs/options/
            svgrOptions: {
                exportType: "named",
            },
            include: "**/*.svg",
        }),
    ],
});
