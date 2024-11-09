import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./style/index.css";
import App from "./components/App.tsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// Get Root
const root = document.getElementById("root");
if (!root)
    throw new Error("Root element not found");

// Create React Root
createRoot(root).render(
    <StrictMode>
        <App/>
    </StrictMode>,
);
