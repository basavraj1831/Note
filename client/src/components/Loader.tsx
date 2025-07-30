import { LoaderIcon } from "lucide-react";
import React from "react";

const PageLoader: React.FC = () => {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoaderIcon className="animate-spin size-10 text-blue-500" />
    </div>
  );
};

export default PageLoader;
