import { Input, Button } from "@nextui-org/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { account } from "../../config/appwriteConfig";
import { AppwriteException } from "appwrite";
import { toast } from "react-toastify";
import { userStore } from "../../state/userStore";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [authState, setAutState] = useState({
    email: "",
    password: "",
  });

  const userState = userStore();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const promise = account.createEmailSession(
      authState.email,
      authState.password
    );
    promise
      .then((res) => {
        console.log("The Response is", { res });
        setLoading(false);
        userState.updateUserSession(res);
        toast.success("Account Login successfully ");
        navigate("/");
      })
      .catch((err: AppwriteException) => {
        setLoading(false);
        toast.error(err.message, { theme: "colored" });
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] p-2 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-red-400 text-center">ChatApp</h1>
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="mt-5">Welcome Back to Chat App</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <Input
              label="Email"
              type="email"
              onChange={(e) =>
                setAutState({ ...authState, email: e.target.value })
              }
            />
          </div>
          <div className="mt-5">
            <Input
              label="Password"
              type="password"
              onChange={(e) =>
                setAutState({ ...authState, password: e.target.value })
              }
            />
          </div>
          <div className="mt-5">
            <Button color="danger" className="w-full mt-5" type="submit">
              {loading ? "Processing..." : "Submit"}
            </Button>
          </div>
          <div className="text-center mt-3">
            <p>
              Dont't have an account{" "}
              <strong>
                <Link to="/register">register</Link>
              </strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
