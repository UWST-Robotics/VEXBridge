import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    base: "/",
    plugins: [react()],
    server: {
        // Proxy Socket.IO to the server
        proxy: {
            "/socket.io": {
                target: "ws://localhost:3000",
                ws: true,
                rewriteWsOrigin: true,
            },
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true
            }
        }
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version)
    }
});
