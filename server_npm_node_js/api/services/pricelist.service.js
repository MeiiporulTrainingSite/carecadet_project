import Pricelist from "./pricelist.schema.js";
import path from "path";
import fs from "fs";
import csvjson from "csvtojson";
import pkg from "json-2-csv";
const { json2csv } = pkg;
const __dirname = path.resolve(path.dirname(""));

import nodemailer from "nodemailer";

export default {
  uploadPricelist,
  publishPricelist,
  getPriceList,
  updatePricelist,
  deletePricelist,
  getPriceListbyFacility,
  bulkUpdate,
  bulkDelete,
  // getPriceListone,
  getPriceListbyService,
  createService,
};

const useremail = "carecadet.demo@gmail.com";
const emailpass = "iiwcefbinvtgqjyc";

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: useremail,
    pass: emailpass,
  },
  port: 587,
  secure: false,
});
// var date = new Date();
// var mail = {
//     "id":ProviderDetails.providerID,
//     "created":date.toDateString()
// }
// const token_mail_verification = jwt.sign(mail,config.jet_secret_mail,{ expiresIn: '1d' })
// var url = "http://localhost:5200+confirm?id=+token_mail_verification";

function sendConfirmationEmail(emailData) {
  console.log("Check");
  transport.sendMail(
    {
      from: "carecadet.demo@gmail.com",
      to: "divyag.meiiporul@gmail.com",
      subject: "Please confirm your account",
      html: `<h1>PriceList Confirmation</h1>
          <h2>Hello Admin</h2>
          <p>Pleas ${emailData.userID}, ${emailData.name} , ${emailData.email}</p>
          
          </div>`,
    },
    function (error, info) {
      console.log("sentMail returned!");
      if (error) {
        console.log("Error!!!!!", error);
      } else {
        console.log("Email sent:" + info.response);
      }
    }
  );
  // .catch(err => console.log(err));
}

async function uploadPricelist(file) {
  const filedata = file.csv;

  console.log("fileop", filedata);
  json2csv(filedata, (err, csvData) => {
    if (err) {
      throw err;
    }
    const filename = Date.now() + "_" + file.name;
    let uploadPath = __dirname + "/uploads/" + filename;
    fs.writeFile(uploadPath, csvData, (err) => {
      if (err) console.error(err);
      else {
        console.log("Ok");
        // sendConfirmationEmail(file.emailData);
        console.log(file.emailData);
      }
    });
  });
}

async function getPriceList() {
  const PriceList = await Pricelist.aggregate([
    {
      $project: {
        SNo: 1,
        ServiceCode: 1,
        DiagnosisTestorServiceName: 1,
        Organisationid: 1,
        OrganisationPrices: 1,
        FacilityNPI: 1,
        FacilityName: 1,
        FacilityPrices: 1,
        createdBy: 1,
        createdDate: 1,
        updatedBy: 1,
        updatedDate: 1,
      },
    },
  ]);
  return { data: PriceList };
}

async function publishPricelist(file) {
  const originaldata = file.csv;
  Pricelist.create(originaldata, function (err, documents) {
    if (err) throw err;
  });
}

async function bulkUpdate(body) {
  console.log("body ", body);
  if (Object.keys(body).length === 0) {
    throw Error("Invalid body parameter");
  }
  for (var item of body.PriceList) {
    await updatePricelist(item);
  }
}

async function updatePricelist(body) {
  console.log("body ", body);
  if (Object.keys(body).length === 0) {
    throw Error("Invalid body parameter");
  }
  const findPricelist = await Pricelist.findOne({
    _id: body._id,
    FacilityNPI: body.FacilityNPI,
    Organisationid: body.Organisationid,
    DiagnosisTestorServiceName: body.DiagnosisTestorServiceName,
  });
  if (findPricelist) {
    await Pricelist.findOneAndUpdate(
      {
        _id: body._id,
        FacilityNPI: body.FacilityNPI,
        Organisationid: body.Organisationid,
        DiagnosisTestorServiceName: body.DiagnosisTestorServiceName,
      },
      {
        SNo: body.SNo,
        ServiceCode: body.ServiceCode,
        DiagnosisTestorServiceName: body.DiagnosisTestorServiceName,
        Organisationid: body.Organisationid,
        OrganisationPrices: body.OrganisationPrices,
        FacilityNPI: body.FacilityNPI,
        FacilityName: body.FacilityName,
        FacilityPrices: body.FacilityPrices,
        createdBy: body.FacilityNPI,
        createdDate: body.createdDate,
        updatedBy: body.FacilityNPI,
        updatedDate: new Date(),
      }
    );
    return { message: "Successfully saved" };
  } else {
    throw Error("Service not found");
  }
}
async function bulkDelete(body) {
  console.log("body ", body);
  if (Object.keys(body).length === 0) {
    throw Error("Invalid body parameter");
  }
  for (var id of body.PriceList) {
    await deletePricelist(id);
  }
}
async function deletePricelist(id) {
  if (id) {
    await Pricelist.deleteOne({ _id: id });
    return { message: "successfully deleted" };
  } else {
    throw Error("Service not found");
  }
}

async function getPriceListbyFacility(body) {
  const FacilityNPI = body.facilityNPI;
  const Organisationid = body.Organisationid;
  if (FacilityNPI) {
    const PricelistDetails = await Pricelist.aggregate([
      { $match: { FacilityNPI: FacilityNPI, Organisationid: Organisationid } },
      {
        $project: {
          // SNo: 1,
          ServiceCode: 1,
          DiagnosisTestorServiceName: 1,
          Organisationid: 1,
          OrganisationPrices: 1,
          FacilityNPI: 1,
          FacilityName: 1,
          FacilityPrices: 1,
          createdBy: 1,
          createdDate: 1,
          updatedBy: 1,
          updatedDate: 1,
        },
      },
    ]);
    return { data: PricelistDetails };
  } else {
    throw Error("please provide facility npi");
  }
}

// async function getPriceListone() {
//   // const PriceList = await Pricelist.aggregate([
//   //   {
//   //     $project: {
//   //       SNo: 1,
//   //       ServiceCode: 1,
//   //       DiagnosisTestorServiceName: 1,
//   //       Organisationid: 1,
//   //       OrganisationPrices: 1,
//   //       FacilityNPI: 1,
//   //       FacilityPrices: 1,
//   //       createdBy: 1,
//   //       createdDate: 1,
//   //       updatedBy: 1,
//   //       updatedDate: 1,
//   //     },
//   //   },
//   // ]);
//   // return { data: PriceList };
//   // if (DiagnosisTestorServiceName) {
//   //   await Pricelist.unique({ DiagnosisTestorServiceName: DiagnosisTestorServiceName });
//   //   return { message: "successfully filtered" };

//   // }
//   // await Pricelist.aggregate([
//   const PriceList = Pricelist.find().distinct("DiagnosisTestorServiceName");
//   return { data: PriceList }
//   // console.log("checked", PriceList);
//   // ]);
// }

async function getPriceListbyService(body) {
  const DiagnosisTestorServiceName = body.DiagnosisTestorServiceName;
  const Organisationid = body.Organisationid;
  if (DiagnosisTestorServiceName) {
    const PricelistDetails = await Pricelist.aggregate([
      {
        $match: {
          DiagnosisTestorServiceName: DiagnosisTestorServiceName,
          Organisationid: Organisationid,
        },
      },
      {
        $project: {
          SNo: 1,
          ServiceCode: 1,
          DiagnosisTestorServiceName: 1,
          Organisationid: 1,
          OrganisationPrices: 1,
          FacilityNPI: 1,
          FacilityName: 1,
          FacilityPrices: 1,
          createdBy: 1,
          createdDate: 1,
          updatedBy: 1,
          updatedDate: 1,
        },
      },
    ]);
    return { data: PricelistDetails };
  } else {
    throw Error("please provide service");
  }
}

async function createService(body) {
  // Check the Body parameters( atleast one parameter should be there)
  console.log("body ", body);
  if (Object.keys(body).length === 0) {
    throw Error("Invalid body parameter");
  }
  // const findOrganization = await Organization.findOne({ providerID: body.providerID });
  // if(!findOrganization){
  const pricelist = new Pricelist();
  (pricelist.Organisationid = body.Organisationid),
    (pricelist.ServiceCode = body.ServiceCode),
    (pricelist.DiagnosisTestorServiceName = body.DiagnosisTestorServiceName),
    (pricelist.OrganisationPrices = body.OrganisationPrices),
    (pricelist.FacilityNPI = body.FacilityNPI),
    (pricelist.FacilityName = body.FacilityName),
    (pricelist.FacilityPrices = body.FacilityPrices),
    // createdBy: body.FacilityNPI,
    // createdDate: body.createdDate,
    // updatedBy: body.FacilityNPI,
    // updatedDate: new Date(),
    await pricelist.save();
  return { message: "Successfully created" };
}
