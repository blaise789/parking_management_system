import { LoaderCircle } from "lucide-react";
import React from "react";
import PagesRouter from "./routes";
import { Toaster } from "react-hot-toast";
import { CommonProvider } from "./context/CommonContext";

const App = () => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <LoaderCircle className="animate-spin text-blue-400" />
        </div>
      }
    >
      <Toaster position="top-center" />
      <CommonProvider>
        <PagesRouter />
      </CommonProvider>
    </React.Suspense>
  );
};

export default App;
