import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/Auth/RegisterView/RegisterPage";
import { HomePage } from "./pages/Home/components/HomePage";
import { LoginPage } from "./pages/Auth/LoginView/LoginPage";
import { RecoveryPasswordPage } from "./pages/Auth/RecoveryPassword/RecoveryPasswordPage";
import { ChangePasswordForm } from "./pages/Auth/ChangePassword/components/ChangePasswordForm";
import { UserAdminPanelPage } from "./pages/Admin/UserAdminPanel/UserAdminTablePanelPage";
import { AnimalAdminPanelPage } from "./pages/Admin/AnimalAdminPanel/AnimalAdminPanelPage";



export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registro" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recovery-password" element={<RecoveryPasswordPage />} />
        <Route path="/change-password" element={<ChangePasswordForm />} />
        <Route path="/admin/users" element={<UserAdminPanelPage />} />
        <Route path="/admin/animales" element={<AnimalAdminPanelPage />} />
      </Routes>
    </BrowserRouter>
  );
};