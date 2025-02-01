import { Link } from "react-router-dom";
import userStore from "../../store/user.store";
import { LogOut } from "lucide-react";
import { useLogout } from "../../api/auth.api";

const Navbar = () => {
  const user = userStore((state) => state.user);
  const removeUser = userStore((state) => state.removeUser);
  const { mutate: logout } = useLogout();
  return (
    <header className="px-2 py-2 bg-green-700 sticky top-0 flex justify-between items-center text-white flex-wrap z-50">
      <h1 className="text-lg font-bold">Admin Panel</h1>
      <div>
        <nav>
          <ul className="flex gap-10 cursor-pointer font-medium">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/all">All Herbs</Link>
            </li>
            <li>
              <Link to="/add">Add Herbs</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <div className="font-medium space-x-20 flex flex-wrap">
          <div className="flex flex-col leading-5">
            <span>{user?.name}</span>
            <span>{user?.email}</span>
          </div>
          <button
            className="flex gap-2 rounded-lg border-[1px] items-center px-2 py-1"
            onClick={async () => {
              const confirmation = confirm(
                "Are you sure you want to logout?"
              );
              if (confirmation) {
                logout();
              }
            }}
          >
            <LogOut className="text-red-500 rotate-180" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
