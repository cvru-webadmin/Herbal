import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useChangePassword } from "../../api/auth.api";

const ChangePass = () => {
  const { mutate: changePass } = useChangePassword();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const email = formData.get("email") as string;
    // const password = formData.get("password") as string;
    // login({ email, password });
    const formData = new FormData(e.currentTarget);
    const oldPass = formData.get("old-pass") as string;
    const newPass = formData.get("new-pass") as string;
    if (oldPass === newPass) {
      toast("Old and new password cannot be same.", { type: "info" });
      return;
    }
    changePass({ password: oldPass, newPassword: newPass });
    navigate("/");
  };
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-2 md:p-5 rounded-lg border-2 shadow-2xl space-y-5 max-w-[600px]">
        <div>
          <h1 className="font-bold text-lg">Update Password</h1>
          <p className="text-gray-500">You can update your password here.</p>
        </div>
        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <input
              placeholder="Old Password"
              type="password"
              name="old-pass"
              required
              className="px-2 py-1 border-[1px] rounded-lg w-full focus-visible:outline-0"
            />
            <input
              placeholder="New Password"
              type="password"
              name="new-pass"
              required
              className="px-2 py-1 border-[1px] rounded-lg w-full focus-visible:outline-0"
            />
          </div>
          <div className="flex justify-between items-center">
            <button className="px-5 py-1 bg-black text-white font-bold rounded-lg text-lg">
              Update
            </button>
            <Link to="/" className="text-blue-500 underline">
              Login Page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePass;
