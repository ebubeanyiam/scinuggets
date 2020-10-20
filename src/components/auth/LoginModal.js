import React from "react";
import AuthTemplate from "./auth-components/AuthTemplate";

import { LoginOptions } from "./auth-components/AuthOptions";

const LoginModal = () => {
  return (
    <>
      <AuthTemplate
        headerText="Welcome back"
        authOptions={LoginOptions}
        question="No account?"
        redirect="Create One"
        status="Login"
      />
    </>
  );
};

export default LoginModal;
