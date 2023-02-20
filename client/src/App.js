import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from 'react';
import User_management from './layout/User_management';

const LoginComponent = React.lazy(() => import("./layout/Login"));
const RegisterComponent = React.lazy(() => import("./layout/Register"));
const HomeComponent = React.lazy(() => import("./layout/Home"));
const User_managementComponent = React.lazy(()=> import("./layout/User_management"));


function App() {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/user_management" element={< User_managementComponent />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
