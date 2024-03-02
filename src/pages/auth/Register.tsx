import { Input, Button } from "@nextui-org/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { account } from "../../config/appwriteConfig";
import { AppwriteException, ID } from "appwrite";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Register() {

    //use of navigate when user regester then we redirect to sign up page
    const navigate=useNavigate();

  const [authState, setAutState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const promis = account.create(
      ID.unique(),
      authState.email,
      authState.password,
      authState.name
    );
    promis
      .then((res) => {
        console.log("The Response is ", res);
        setLoading(false);
        navigate("/login")
        toast.success("Account created successfully ")
      })
      .catch((err: AppwriteException) => {
        setLoading(false);
        //use of tost here which is the basicall for the notification of error
        toast.error(err.message, { theme: "colored" });
        console.log("The error Exception is", err.message);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[500px] p-2 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-red-400 text-center">ChatApp</h1>
        <h1 className="text-2xl font-bold">Login</h1>
        <p className="mt-5">Enter your details</p>
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <Input
              label="Name"
              type="text"
              onChange={(e) =>
                setAutState({ ...authState, name: e.target.value })
              }
            />
          </div>
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
          <Button color="danger" className="w-full mt-5" type="submit" disabled={loading}>
            {loading?"Processing.. ":" "}Submit
          </Button>
          <div className="text-center mt-3">
            <p>
              Already have an account{" "}
              <strong>
                <Link to="/login">login</Link>
              </strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
