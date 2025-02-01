import { Routes } from "react-router-dom";
import AuthRoutes from "./routes/auth.routes";
import { Suspense, useEffect } from "react";
import userStore from "./store/user.store";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/app.routes";
import { useFetchUser } from "./api/auth.api";
import { Leaf } from "lucide-react";

function App() {
  const { mutate: fetchUser, isPending } = useFetchUser();
  useEffect(() => {
    fetchUser();
  }, []);
  const user = userStore((state) => state.user);

  if (isPending) {
    return (
      <div className="h-screen grid place-items-center bg-green-100">
        <div className="flex items-center gap-5 flex-col">
          <Leaf size={60} className="text-green-700" />
          <h1 className="loader"></h1>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>{!user ? AuthRoutes() : AppRoutes()}</Routes>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
