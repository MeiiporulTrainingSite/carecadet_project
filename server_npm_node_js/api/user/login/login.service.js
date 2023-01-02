import Provider from '../provider/provider.schema.js';
import UserSession from '../user-session/user-session.schema.js';
import { uuid } from '../../../shared/common-util.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default {
    logout,
    login,
}

async function logout(body){
    var userName = body.userName;
    await UserSession.updateMany({ userName: userName },{
        $set: {
            isActive: "N",
            updatedBy: "Admin",
            updatedDate: new Date(),
            endDate: new Date(),
            activeEndDate: new Date()
        }
    });
    return { message: "Successfully loged out"};
}

async function login(body){
    // var userType = body.userType;
    // if(userType == "PROVIDER") {
        var username = body.userName;
        var password = body.password;
        var sessionKey = await uuid();
        const findProvider = await Provider.findOne({ username: username });
        console.log('findProvider',findProvider);
        if(findProvider) {
            let comparePassword = await bcrypt.compare(password, findProvider.password);
            if(comparePassword){
                const token = jwt.sign({ userName: findProvider.username }, process.env.SECRET_KEY + username + sessionKey, { expiresIn: process.env.TOKEN_EXPIRY_TIME });
                const refreshToken = jwt.sign({ userName: findProvider.username },process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRY_TIME });
                console.log("token", token);
                let responseObj = {};
                responseObj.userName = findProvider.username;
                responseObj.userID = findProvider.providerID;
                responseObj.firstName = findProvider.firstName;
                responseObj.lastName = findProvider.lastName;
                responseObj.email = findProvider.email;
                responseObj.isActive = findProvider.isActive;
                if(responseObj.isActive!="Pending")
                    {
                        // return res.status(401).send({
                        //   message: "Pending Account. Please Verify Your Email!",
                        // });
                        throw Error('Pending Account');
                      }
                
                responseObj.userType = "PROVIDER";
                responseObj.token = token;
                responseObj.refreshToken = refreshToken;
                await createUserSession(findProvider.username,sessionKey, "Provider", findProvider.providerID)
                return {data: responseObj};
            } else {
                throw Error('Incorrect password');
                            }
        }
    // } 
    else {
        throw Error("User not found")
    }
}

async function createUserSession(userName,sessionKey, collectionName, userID) {
    console.log("collectionName", collectionName);
    let findUserSession = await UserSession.findOne({ userName: userName });
    if(!findUserSession){
        var userSession = new UserSession(); 
        userSession.userSessionID = sessionKey;
        userSession.sessionKey = sessionKey;
        userSession.applicationId = process.env.APP_ID;
        userSession.userName = userName;
        userSession.collectionName = collectionName;
        userSession.isActive = 'Y';
        userSession.createdBy = userID;
        await userSession.save();
    } else {
        let activeUserSession = await UserSession.updateMany(
            { userName: userName, isActive: 'Y'},
            {
                $set: {
                    isActive: "N",
                    updatedBy: userID,
                    updatedDate: new Date(),
                    endDate: new Date(),
                    activeEndDate: new Date()
                }
            }
        );
        if(activeUserSession){
            var userSession = new UserSession();
            userSession.userSessionID = sessionKey;
            userSession.sessionKey = sessionKey;
            userSession.applicationId = process.env.APP_ID;
            userSession.userName = userName;
            userSession.collectionName = collectionName;
            userSession.isActive = 'Y';
            userSession.createdBy = userID;
            await userSession.save();
        }
    }

}