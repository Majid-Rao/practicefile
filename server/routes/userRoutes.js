import {Router} from "express";
import { userRegister,loginUser,loggedOut } from "../controllers/userController.js";
import {upload} from "../middlewares/multerMiddleware.js";
import {verifyTokens} from "../middlewares/authMiddleware.js"
const router = Router();

router.route('/register').post(
     upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverimage", maxCount: 1 }
  ])
    ,userRegister);
router.route('/login').post(loginUser);

router.route('/logout').post(verifyTokens,loggedOut);

export default router;

