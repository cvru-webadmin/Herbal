import { Link } from "react-router-dom";
import { useLogin } from "../../api/auth.api";

const IndexPage = () => {
  const { mutate: login } = useLogin();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    login({ email, password });
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="p-2 md:p-5 rounded-lg border-2 shadow-2xl space-y-5 max-w-[600px]">
        <div>
          <h1 className="font-bold text-lg">Login Page</h1>
          <p className="text-gray-500">You can login here.</p>
        </div>
        <form className="space-y-10" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <input
              placeholder="Email"
              type="email"
              name="email"
              required
              className="px-2 py-1 border-[1px] rounded-lg w-full"
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              required
              className="px-2 py-1 border-[1px] rounded-lg w-full"
            />
          </div>
          <div className="flex justify-between items-center"> 
            <button className="px-5 py-1 bg-black text-white font-bold rounded-lg text-lg">
              Login
            </button>
            {/* <Link to="/pass" className="text-blue-500 underline">Update Password</Link> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndexPage;
