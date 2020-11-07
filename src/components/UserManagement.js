import React from "react";
import VerifyEmail from "./user-components/VerifyEmail";

const UserManagement = (props) => {
  const mode = new URLSearchParams(props.location.search).get("mode");
  const actionCode = new URLSearchParams(props.location.search).get("oobCode");

  switch (mode) {
    case "verifyEmail":
      return <VerifyEmail actionCode={actionCode} />;
    default:
      return <div>Nothing Found</div>;
  }
};

export default UserManagement;
