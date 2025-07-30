import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../lib/firebase";
import useGoogleSignin from "../hooks/useGoogleSignin";
import toast from "react-hot-toast";

interface GoogleData {
  fullName: string;
  email: string;
  dob: string;
}

const GoogleLogin: React.FC = () => {
  const navigate = useNavigate();
  const { googlesigninMutation } = useGoogleSignin();

  const handleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider);
      const user = googleResponse.user;

      if (!user.displayName || !user.email) {
        return toast.error("Missing user information from Google.");
      }

      const userData: GoogleData = {
        fullName: user.displayName,
        email: user.email,
        dob: "01-Jan-2025",
      };
      console.log(userData);

      googlesigninMutation(userData, {
        onSuccess: (res: any) => {
          toast.success(res.message);
          navigate("/");
        },
        onError: (err: any) => {
          const message = err?.response?.data?.message;
          toast.error(message);
        },
      });
    } catch (error: any) {
      toast.error("Google login failed.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className="w-full border border-gray-300 px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:border-blue-500 transition cursor-pointer"
    >
      <FcGoogle size={20} />
      Continue With Google
    </button>
  );
};

export default GoogleLogin;
