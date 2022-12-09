import { Router } from "express";
import ResObject from "../../../core/util/res-object.js";
import LoginService from "./login.service.js";
// test
const router = Router();

export default router;

router.post('/login',login);
router.post('/logout',logout);

function login(req,res,next) {
    var body = req.body ?? {};
    LoginService.login(body)
        .then(obj => {
            console.log(obj)
            new ResObject(res,obj);
        }).catch(next);
}

function logout(req,res,next) {
    var body = req.body ?? {};
    LoginService.logout(body)
        .then(obj => {
            console.log(obj)
            new ResObject(res,obj);
        }).catch(next);
}