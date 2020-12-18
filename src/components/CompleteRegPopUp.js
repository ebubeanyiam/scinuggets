import React from "react";
import { ProfileReg } from "../context/CompleteProfileContext";

import "../style/complete_profile.css";

const CompleteRegPopUp = () => {
  const [, setOpenProfileReg] = ProfileReg();
  return (
    <div className="completeregpopup">
      <div className="completeregpopup__modal">
        <h4>Set up your profile to continue publishing</h4>
        <form>
          <label>
            Tell us your name
            <input type="text" />
          </label>

          <label>Update your profile picture (optional)</label>
        </form>
      </div>
    </div>
  );
};

export default CompleteRegPopUp;
