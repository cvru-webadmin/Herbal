import { Outlet } from "react-router-dom";
import Navbar from "../../component/const/navbar";
import Footer from "../../component/const/footer";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DashboardLayout;
