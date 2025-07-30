import { Eye, EyeOff } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSendotp from "../hooks/useSendotp";
import toast from "react-hot-toast";
import useSignin from "../hooks/useSignin";
import GoogleLogin from "../components/GoogleLogin";

interface SigninData {
  email: string;
  otp: string;
  keepMeLoggedIn: boolean;
}

const Signin: React.FC = () => {
  const [signinData, setSigninData] = useState<SigninData>({
    email: "",
    otp: "",
    keepMeLoggedIn: false,
  });

  const [otpsent, setOtpSent] = useState<boolean>(false);
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const navigate = useNavigate();

  const { isPending, signinMutation } = useSignin();
  const { sendotpPending, sendotpMutation } = useSendotp();

  const handleSignin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!otpsent) {
      sendotpMutation(signinData.email, {
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
      signinMutation(signinData, {
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
          <div className="mb-4 flex items-center md:justify-start gap-2 justify-center">
            <img src="/logo.svg" className="w-6 h-6" />
            <span className="text-xl font-semibold ">HD</span>
          </div>

          <form onSubmit={handleSignin}>
            <div className="space-y-4 p-0 md:p-10 mt-2 md:mt-6">
              <div className="mb-6 flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-center md:text-start">
                  Sign in
                </h2>
                <p className="text-sm opacity-70 text-center md:text-start">
                  sign in to enjoy the feature of HD
                </p>
              </div>
              <div>
                <GoogleLogin/>
                <div className="border border-gray-400 my-5 flex justify-center items-center mb-8">
                  <span className="absolute bg-white text-sm">Or</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="relative mb-4">
                  <input
                    id="email"
                    type="email"
                    className="peer w-full h-[44px] text-black border border-gray-400 rounded-xl px-4 py-3 placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter email"
                    value={signinData.email}
                    onChange={(e) =>
                      setSigninData({ ...signinData, email: e.target.value })
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
                  <>
                    <div className="relative mb-4">
                      <input
                        type={showOtp ? "text" : "password"}
                        className="w-full h-[44px] text-black border border-gray-400 rounded-xl px-4 py-3 placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="OTP"
                        value={signinData.otp}
                        onChange={(e) =>
                          setSigninData({ ...signinData, otp: e.target.value })
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

                    <div className="relative mb-4">
                      <Link
                        to="/signin"
                        onClick={() => setOtpSent(false)}
                        className="text-blue-500 hover:underline text-sm"
                      >
                        Resend OTP
                      </Link>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <input
                        type="checkbox"
                        id="keepLoggedIn"
                        checked={signinData.keepMeLoggedIn}
                        onChange={(e) =>
                          setSigninData({
                            ...signinData,
                            keepMeLoggedIn: e.target.checked,
                          })
                        }
                      />
                      <label
                        htmlFor="keepLoggedIn"
                        className="text-sm text-gray-600"
                      >
                        Keep me logged in
                      </label>
                    </div>
                  </>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-[44px] bg-[#367AFF] text-white font-semibold rounded-xl px-2 py-4 flex items-center justify-center gap-2 hover:bg-blue-600 transition-all disabled:opacity-60 cursor-pointer"
                disabled={sendotpPending || isPending}
              >
                {sendotpPending && !otpsent && "Sending OTP..."}
                {isPending && otpsent && "Signing in..."}
                {!sendotpPending &&
                  !isPending &&
                  (otpsent ? "Sign in" : "Get OTP")}
              </button>
              <div className="text-center mt-4">
                <p className="text-sm">
                  Need an account?{" "}
                  <Link to="/signup" className="text-blue-500 hover:underline">
                    Create one
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

export default Signin;
