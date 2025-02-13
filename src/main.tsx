import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage.tsx";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";
import EditPostPage from "./pages/dashboard/EditPostPage.tsx";
import CreatePostPage from "./pages/dashboard/CreatePostPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="edit-post/:id" element={<EditPostPage />} />
        <Route path="create-post" element={<CreatePostPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
