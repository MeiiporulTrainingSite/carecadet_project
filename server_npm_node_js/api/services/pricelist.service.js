import Pricelist from "./pricelist.schema.js";
import path from "path";
import fs from "fs";
import csvjson from "csvtojson";
import pkg from "json-2-csv";
const { json2csv } = pkg;
const __dirname = path.resolve(path.dirname(""));
export default {
  uploadPricelist,
  publishPricelist,
  getPriceList,
  updatePricelist,
  deletePricelist,
  getPriceListbyFacility,
  bulkUpdate,
  bulkDelete,
};

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
      else console.log("Ok");
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
        FacilityID: 1,
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
    FacilityID: body.FacilityID,
    Organisationid: body.Organisationid,
  });
  if (findPricelist) {
    await Pricelist.findOneAndUpdate(
      {
        _id: body._id,
        FacilityID: body.FacilityID,
        Organisationid: body.Organisationid,
      },
      {
        SNo: body.SNo,
        ServiceCode: body.ServiceCode,
        DiagnosisTestorServiceName: body.DiagnosisTestorServiceName,
        Organisationid: body.Organisationid,
        OrganisationPrices: body.OrganisationPrices,
        FacilityID: body.FacilityID,
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

async function getPriceListbyFacility(FacilityID) {
  if (FacilityID) {
    const PricelistDetails = await Pricelist.aggregate([
      { $match: { FacilityID: FacilityID } },
      {
        $project: {
          SNo: 1,
          ServiceCode: 1,
          DiagnosisTestorServiceName: 1,
          Organisationid: 1,
          OrganisationPrices: 1,
          FacilityID: 1,
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
