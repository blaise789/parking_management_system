import { LoaderCircle } from "lucide-react";
import React from "react";
import PagesRouter from "./routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (

    <React.Suspense fallback={
        <div className="flex items-center justify-center h-screen">
            <LoaderCircle className="animate-spin text-blue-400" />
        </div>
      
    }>
       <Toaster position="top-center"/>
        <PagesRouter/>
    
    </React.Suspense>
  );
};

export default App;
