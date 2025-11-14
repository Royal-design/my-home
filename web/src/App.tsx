import { Route, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { AuthRoute } from "./routes/AuthRoute";
import { Register } from "./screens/Register";
import { Toaster } from "./components/ui/sonner";
import { VerifyMail } from "./screens/VerifyMail";
import { CustomLoader } from "./components/custom/CustomLoader";
import { ShowModal } from "./components/modal/ShowModal";
import { ResetPassword } from "./screens/ResetPassword";

function App() {
  return (
    <div className="">
      <Toaster position="top-right" />
      <CustomLoader />
      <ShowModal />
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/verify-email" element={<VerifyMail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
