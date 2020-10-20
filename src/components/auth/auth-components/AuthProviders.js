import { auth } from "../../../firebase/config";

export const authFunction = (provider, status) => {
  console.log(status);
  auth.signInWithRedirect(provider).then((res) => {
    console.log(res);
  });
};
