import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

import * as _ from "../../../firebase/config";

export const authOptions = [
  {
    icon: FcGoogle,
    text: "with Google",
    authProvider: _.googleProvider,
  },
  {
    icon: IoLogoFacebook,
    text: "with Facebook",
    color: "#3B5997",
    authProvider: _.facebookProvider,
  },
  {
    icon: FaTwitter,
    text: "with Twitter",
    color: "#55ACED",
    authProvider: _.twitterProvider,
  },
  {
    icon: FaGithub,
    text: "with Github",
    authProvider: _.githubProvider,
  },
  {
    icon: AiOutlineMail,
    text: "with Mail",
  },
];
