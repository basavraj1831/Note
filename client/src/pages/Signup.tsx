import { Calendar, Eye, EyeOff } from "lucide-react";
import React, { useState, type FormEvent } from "react";

import { Link, useNavigate } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import toast from "react-hot-toast";
import useGetotp from "../hooks/useGetotp";
import GoogleLogin from "../components/GoogleLogin";

interface SignupData {
  fullName: string;
  email: string;
  dob: string;
  otp: string;
}

const Signup: React.FC = () => {
  const [signupData, setSignupData] = useState<SignupData>({
    fullName: "",
    email: "",
    dob: "",
    otp: "",
  });
  const [otpsent, setOtpSent] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const navigate = useNavigate();

  const { isPending, signupMutation } = useSignup();
  const { getPending, getotpMutation } = useGetotp();

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otpsent) {
      getotpMutation(signupData, {
        onSuccess: (res) => {
          toast.success(res.message);
          setOtpSent(true);
        },
        onError: (err: any) => {
          const message = err?.response?.data?.message;
          toast.error(message);
        },
      });
    } else {
      signupMutation(signupData, {
        onSuccess: (res) => {
          toast.success(res.message);
          navigate("/");
        },
        onError: (err: any) => {
          const message = err?.response?.data?.message;
          toast.error(message);
        },
      });
    }
  };

  return (
    <div className="h-screen flex md:items-center justify-center px-2 py-20 sm:p-6 md:p-8">
      <div className="md:border md:border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto md:bg-base-100 rounded-xl md:shadow-lg overflow-hidden">
        <div className="w-full lg:w-1/2 p-2 sm:p-6 flex flex-col">
          <div className="mb-4 flex items-center md:justify-start justify-center gap-2">
            <img src="/logo.svg" className="w-6 h-6" />

            <span className="text-xl font-semibold ">HD</span>
          </div>

          <form onSubmit={handleSignup}>
            <div className="space-y-4 p-0 md:p-10 mt-2 md:mt-6">
              <div className="mb-6 flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-center md:text-start">
                  Sign up
                </h2>
                <p className="text-sm opacity-70 text-center md:text-start">
                  sign up to enjoy the feature of HD
                </p>
              </div>
              <div>
                <GoogleLogin />
                <div className="border border-gray-400 my-5 flex justify-center items-center mb-8">
                  <span className="absolute bg-white text-sm">Or</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="relative mb-4">
                  <input
                    id="name"
                    type="name"
                    className="peer w-full h-[44px] text-black border border-gray-400 rounded-xl px-4 py-3 placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter name"
                    value={signupData.fullName}
                    onChange={(e) =>
                      setSignupData({ ...signupData, fullName: e.target.value })
                    }
                    required
                  />

                  <label
                    htmlFor="name"
                    className="absolute -top-[10px] left-3 px-1 text-sm bg-white text-gray-500 z-10 transition-all peer-focus:text-blue-500"
                  >
                    Your Name
                  </label>
                </div>

                <div className="relative mb-4">
                  <span className="absolute z-10 top-[14px] left-[12px] text-black">
                    <Calendar className="w-[16px] h-[18px]" />
                  </span>

                  <input
                    className="peer relative w-full h-[44px] text-black border border-gray-400 rounded-xl px-10 py-3 placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    id="dob"
                    type="dob"
                    placeholder="01-Jan-2025"
                    value={signupData.dob}
                    onChange={(e) =>
                      setSignupData({ ...signupData, dob: e.target.value })
                    }
                    required
                  />
                  <label
                    htmlFor="dob"
                    className="absolute -top-[10px] left-3 px-1 text-sm text-gray-500 bg-white z-10 transition-all peer-focus:text-blue-500"
                  >
                    Date of Birth
                  </label>
                </div>
                <div className="relative mb-4">
                  <input
                    id="email"
                    type="email"
                    className="peer w-full h-[44px] text-black border border-gray-400 rounded-xl px-4 py-3 placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter email"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />

                  <label
                    htmlFor="email"
                    className="absolute -top-[10px] left-3 px-1 text-sm bg-white text-gray-500 z-10 transition-all peer-focus:text-blue-500"
                  >
                    Email
                  </label>
                </div>

                {otpsent && (
                  <div className="relative mb-4">
                    <input
                      type={showOtp ? "text" : "password"}
                      className="w-full h-[44px] text-black border border-gray-400 rounded-xl px-4 py-3 placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="OTP"
                      value={signupData.otp}
                      onChange={(e) =>
                        setSignupData({ ...signupData, otp: e.target.value })
                      }
                      required
                    />

                    <span
                      className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() => setShowOtp((prev) => !prev)}
                    >
                      {showOtp ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-[44px] bg-[#367AFF] text-white font-semibold rounded-xl px-2 py-4 flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-60 cursor-pointer"
                disabled={getPending || isPending}
              >
                {getPending && !otpsent && "Sending OTP..."}
                {isPending && otpsent && "Signing up..."}
                {!getPending && !isPending && (otpsent ? "Sign up" : "Get OTP")}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link to="/signin" className="text-blue-500 hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="hidden lg:flex w-full lg:w-2/3 bg-primary/10 items-center justify-center">
          <div>
            <div className="relative p-2">
              <img
                src="/sign-up.png"
                alt=""
                className="w-full h-full rounded-xl "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
