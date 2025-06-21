import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { ApolloWrapper } from "./apollo/apollo-wrapper.tsx";
import { Router } from "./router/index.tsx";
import { ErrorBoundary } from "./hook/ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloWrapper>
        <Router />
      </ApolloWrapper>
    </ErrorBoundary>
  </React.StrictMode>
);
