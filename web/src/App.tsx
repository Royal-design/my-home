import { Route, Routes } from "react-router-dom";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { AuthRoute } from "./routes/AuthRoute";
import { Register } from "./screens/Register";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="">
      <Toaster position="top-right" />
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
