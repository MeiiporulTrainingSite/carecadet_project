import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { routespages as appRoutes } from "./routes";
import { login as appLogin } from "./routes";
import Layout from "./component/Layout";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import ProtectedLogin from "./ProtectedRoutes/ProtectedLogin";

import { useAppDispatch, useAppSelector } from "./Redux/Hook";
import ProviderLandingPage from "./Pages/Landingpage";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: "#EBF3FA", // page background
        main: "#687B9E", //dark
        dark: "#E4ECF7", // nav background
        contrastText: "#000",
      },
      secondary: {
        main: "#4db6ac",
        light: "#B4C8FC",//"#728AB7", // Title background
        dark: "#4D77FF", //button
        contrastText: "#000",
      },
      text: {
        primary: "#173A5E",
        secondary: "#46505A",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path = "/providerlanding" element = {<ProviderLandingPage/>}/>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <route.component />
                  </ProtectedRoute>
                }
              />
            ))}

            {appLogin.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={
                  <ProtectedLogin>
                    <route.component />
                  </ProtectedLogin>
                }
              />
            ))}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
