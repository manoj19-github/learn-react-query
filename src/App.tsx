import React from "react";
import "./App.css";
import RootRouter from "./components/RootRouter";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";
import {ReactQueryDevtools} from "react-query/devtools"
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      
      <div className="main">
        <Navbar />
        <RootRouter />
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
    </QueryClientProvider>
  );
}

export default App;
