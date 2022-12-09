import { Router } from "express";
import OrganizationService from "./organization.service.js";
import ResObject from '../../core/util/res-object.js';

const router = Router();

export default router;

router.get('/getOrganizationList',getOrganizationList);
router.get('/getOrganizationByProvider',getOrganizationByProvider);
router.post('/createOrganization',createOrganization);
router.put('/updateOrganization',updateOrganization);
router.delete('/deleteOrganization',deleteOrganization);

function getOrganizationList(req,res,next) {
    OrganizationService.getOrganizationList().then(obj => {
        new ResObject(res,obj);
    }).catch(next);
}

function getOrganizationByProvider(req,res,next) {
    const providerID = req.query.providerID;
    OrganizationService.getOrganizationByProvider(providerID).then(obj => {
        new ResObject(res,obj);
    }).catch(next);
}

function createOrganization(req,res,next) {
    const body = req.body ?? {};
    OrganizationService.createOrganization(body).then(obj => {
        new ResObject(res,obj);
    }).catch(next);
}

function updateOrganization(req,res,next) {
    const body = req.body ?? {};
    OrganizationService.updateOrganization(body).then(obj => {
        new ResObject(res,obj);
    }).catch(next);
}

function deleteOrganization(req,res,next) {
    const organizationID = req.query.organizationID ?? null;
    OrganizationService.deleteOrganization(organizationID).then(obj => {
        new ResObject(res,obj);
    }).catch(next);
}