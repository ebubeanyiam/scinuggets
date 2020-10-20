import React from "react";
import AuthTemplate from "./auth-components/AuthTemplate";

import { SignupOptions } from "./auth-components/AuthOptions";

const SignupModal = () => {
  return (
    <>
      <AuthTemplate
        headerText="Start your journey"
        authOptions={SignupOptions}
        question="Already have an account?"
        redirect="Login"
        status="Sign up"
      />
    </>
  );
};

export default SignupModal;
