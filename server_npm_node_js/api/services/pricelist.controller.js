import { Router } from "express";
import PricelistService from "./pricelist.service.js";
import ResObject from '../../core/util/res-object.js';
const router = Router();



export default router;

router.post("/upload", uploadPricelist);
router.post("/publish", publishPricelist);
router.get('/getPriceList',getPriceList);

function getPriceList(req,res,next) {
  PricelistService.getPriceList().then(obj => {
      new ResObject(res,obj);
  }).catch(next);
}


function uploadPricelist(req, res,next) {
  // let file = req.files.screenshot;
  // console.log("Body",req.body);
  let file=req.body;
  PricelistService.uploadPricelist(file).then(obj => {
  
    new ResObject(res,obj);
  }).catch(next);
    // console.log("check");
    // res.send(200);

}

function publishPricelist(req, res,next) {
    let file = req.body;
  PricelistService.publishPricelist(file).then(obj => {
  
    new ResObject(res,obj);
  }).catch(next);
 
}
