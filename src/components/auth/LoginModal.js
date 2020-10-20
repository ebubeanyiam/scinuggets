import React from "react";
import AuthTemplate from "./auth-components/AuthTemplate";

const LoginModal = () => {
  return (
    <>
      <AuthTemplate
        headerText="Welcome back"
        question="No account?"
        redirect="Create One"
        status="Login"
      />
    </>
  );
};

export default LoginModal;
