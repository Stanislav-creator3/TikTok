import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../../style.scss";
import style from "./app.module.scss";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "../header/Header";
import AppRoutes from "../Routes/Routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Header />
      <div className={style.app}>
        <div className={style.container}>
          <AppRoutes />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
