
import {
    registerUser,
    loginUser,
    loginRequired,
} from "../controllers/userController.js";
  

const user = (app) => {
      //register route
  app.route("/auth/register").post(registerUser);
  //login route
  app.route("/auth/login").post(loginUser);

}
export default user
