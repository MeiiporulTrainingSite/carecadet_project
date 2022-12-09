import Provider from './provider.schema.js'
import { createId } from '../../../shared/common-util.js'

export default {
    createProvider,
    updateProvider,
    getProviderList,
    deleteProvider,
}

// TO create a provider ( use createId to create unique ID)
async function createProvider(body) {
    // Check the Body parameters( atleast one parameter should be there)
    console.log("body ", body);
    if (Object.keys(body).length === 0) {
        throw Error("Invalid body parameter");
    }
    const findProvider = await Provider.findOne({ email: body.email})
    if(findProvider){
        throw Error('Already a user exists with this email')
    } else {
        const ProviderDetails = new Provider();
        ProviderDetails.providerID = await createId(Provider.collection.name);
        ProviderDetails.firstName = body.firstName;
        ProviderDetails.lastName = body.lastName;
        ProviderDetails.email = body.email;
        ProviderDetails.contact = body.contact;
        // ProviderDetails.username = body.username;//nextline duplicate for demo
        ProviderDetails.username = body.email;
        ProviderDetails.password =body.password;
        ProviderDetails.role = body.role;
        ProviderDetails.remark = body.remark;
        ProviderDetails.isActive = 'Y';
        ProviderDetails.activeStartDate = new Date();
        ProviderDetails.createdBy = body.userID;
        ProviderDetails.createdDate = new Date();
        await ProviderDetails.save();
        return { message: 'Successfully created'}
    }
}
//testing
async function updateProvider(body){
    // Check the Body parameters( atleast one parameter should be there)
    console.log("body ", body);
    if (Object.keys(body).length === 0) {
        throw Error("Invalid body parameter");
    }
    const findProvider = await Provider.findOne({ providerID: body.providerID })
    if(!findProvider){
        throw Error(' provider dose exists ')
    } else {
        await Provider.findOneAndUpdate(
            { providerID: body.providerID },
            {
                $set: {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    email: body.email,
                    contact: body.contact,
                    username: body.username,
                    role: body.role,
                    remark: body.remark,
                    updatedBy: body.userID,
                    updatedDate: new Date(),
                }
            }
        );
        return { message: 'Successfully updated'}
    }
}

async function getProviderList() {
    const ProviderList = await Provider.aggregate(
        [
            { $match: { isActive: 'Y' } },
            {
                $project: {
                    _id: 0,
                    providerID: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    contact: 1,
                    username: 1,
                    role: 1,
                    remark: 1,
                    isActive: 1,
                    activeStartDate: 1,
                    activeEndDate: 1,
                    createdBy: 1,
                    createdDate: 1,
                    updatedBy: 1,
                    updatedDate: 1
                }
            }
        ]
    );
    return { data: ProviderList, message:'success'}
}

async function deleteProvider(providerID) {
    if(providerID){
        await Provider.deleteOne({providerID: providerID});
        return { message: 'successfully deleted'};
    } else {
        throw Error('Please provide id');
    }
}