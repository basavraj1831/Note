import React from "react";
import { Link } from "react-router-dom";
import { LogOutIcon} from "lucide-react";
import useSignout from "../hooks/useSignout";

const Navbar: React.FC = () => {
  const { signoutMutation } = useSignout();
  return (
    <nav className="sticky top-0 z-30 h-16 flex items-center bg-base-200/60 backdrop-blur-3xl border-b border-base-300 shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.svg" className="w-7 h-7" />
              <span className="text-xl sm:text-2xl md:text-3xl font-semibold">
                HD
              </span>
            </Link>
          </div>

          <button
            className="btn btn-ghost btn-circle cursor-pointer"
            onClick={() => signoutMutation()}
          >
            <LogOutIcon className="h-6 w-6 text-base-content hover:text-red-500 opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
