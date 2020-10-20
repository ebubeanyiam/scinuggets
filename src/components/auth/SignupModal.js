import React from "react";
import AuthTemplate from "./auth-components/AuthTemplate";

const SignupModal = () => {
  return (
    <>
      <AuthTemplate
        headerText="Start your journey"
        question="Already have an account?"
        redirect="Login"
        status="Sign up"
      />
    </>
  );
};

export default SignupModal;
