import Pricelist from "./pricelist.schema.js";
import path from "path";
import mongoose from "mongoose";
import fs from "fs";
import csv from "fast-csv";
// import csv from "convert-csv-to-json";
import csvjson from "csvtojson";
import pkg from "json-2-csv";
const { json2csv } = pkg;
const __dirname = path.resolve(path.dirname(""));
export default { uploadPricelist, publishPricelist, getPriceList, updatePricelist,
  deletePricelist,
  getPriceListbyFacility };

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

// async function publishPricelist(file) {
//   const filedata = file.csv;
//   // if (!file) return res.status(400).send("No files were uploaded.");
//   if (!filedata) {
//     console.log("No files were uploaded");
//   }
//   var authorFile = filedata;

//   var authors = [];
//   // const originaldata = [];
//   //   let CSVstring = await fs.promises.readFile(authorFile );
//   //   const CSVoptions = {
//   //     trim: true,
//   //     quote: '"',
//   //     delimiter: ",",
//   //     headers: headers =>
//   //       headers.map(header => header.replace(/ /gi, "-").toLowerCase()),
//   //     objectMode: true,
//   //     ignoreEmpty: true,

//   //   };

//   //   let TRXN = [];
//   //   console.log(CSVstring.trim().split("\n").length);

//   //   await new Promise((resolve, reject) => {
//   //     csv
//   //       .parseString(CSVstring, CSVoptions)
//   //       .on("error", error => reject(error))
//   //       .on("data", async data => {

//   //           TRXN.push(data);
//   //           console.log(data);

//   //       })
//   //       .on("end", () => resolve());
//   //   });

//   //   console.log(TRXN.length);
//   // };

//   // const loadData = () => {
//   //   let json = csv.getJsonFromCsv(
//   //     authorFile
//   //   );
//   //   console.log(json);
//   //   return json;
//   // };

//   csv
//     .fromString(req.file.path, {
//       headers: true,
//       ignoreEmpty: true,
//     })

//     .on("data", function (data) {
//       data["_id"] = new mongoose.Types.ObjectId();

//       //  ["Service Code"]=serviceCode

//       // let destructureddata={
//       //   _id:data._id,
//       //   slno:data.S.No,
//       //   serviceCode:data.[Service,

//       // }
//       // console.log("datacheck", data);
//       authors.push(data);
//     })
//     .on("end", function () {
//       console.log("checkcsv");

//       // authors.map(
//       //   ({
//       //     ["_id"]: _id,
//       //     ["SNo"]: SNo,
//       //     ["Service Code"]: serviceCode,
//       //     ["Diagnosis Test/Service Name"]: DiagnosisTestorServiceName,
//       //     ["Organisation Prices"]: OrganisationPrices,

//       //     ["Facility 1 Prices"]: Facility1Prices,
//       //     ["Facility 2 Prices"]: Facility2Prices,
//       //     ["Facility 3 Prices"]: Facility3Prices,
//       //   }) => {
//       //     let destructureddata = {
//       //       _id: _id,
//       //       SNo: SNo,
//       //       serviceCode: serviceCode,
//       //       DiagnosisTestorServiceName: DiagnosisTestorServiceName,
//       //       OrganisationPrices: OrganisationPrices,
//       //       Facility1Prices: Facility1Prices,
//       //       Facility2Prices: Facility2Prices,
//       //       Facility3Prices: Facility3Prices,
//       //       createdDate: new Date(),
//       //     };
//       //     originaldata.push(destructureddata);
//       //     // console.log(destructureddata);
//       //   }
//       // );
//       // console.log("original", originaldata);
//       // Pricelist.create(originaldata, function (err, documents) {
//       //   if (err) throw err;
//       // });
//     });
// }
async function getPriceList() {
  const PriceList = await Pricelist.aggregate([
    {
      $project: {
        SNo: 1,
        ServiceCode: 1,
        DiagnosisTestorServiceName: 1,
        Organisationid:1,
        OrganisationPrices: 1,
        FacilityNPI:1,
        FacilityPrices:1,
        createdBy: 1,
        createdDate: 1,
          updatedBy: 1,
          updatedDate: 1,

      },
    },
  ]);
  return { data: PriceList };
}

// async function publishPricelist(file) {
//   // if (!file) return res.status(400).send("No files were uploaded.");
//   if (!file) {
//     console.log("No files were uploaded");
//   }
//   var authorFile = file;
//   const fileName = file.csv;
//   // var authors = [];
//   // const originaldata = [];

//   //convert csvfile to jsonArray
//   csv()
//     .fromFile(fileName())
//     .then((jsonObj) => {
//       //insertmany is used to save bulk data in database.
//       //saving the data in collection(table)
//       authorFile.insertMany(jsonObj, (err, data) => {
//         if (err) {
//           res.status(400).json({
//             message: "Something went wrong!",
//           });
//         } else {
//           res.status(200).json({
//             message: "File Uploaded Successfully!",
//             result: data,
//           });
//         }
//       });
//     });
// }

// async function publishPricelist(file) {
//   if (!file)
//       return res.status(400).send('No files were uploaded.');

//   var authorFile = file;

//   var authors = [];

//   csv
//    .fromString(authorFile.data.toString(), {
//        headers: true,
//        ignoreEmpty: true
//    })
//    .on("data", function(data){
//        data['_id'] = new mongoose.Types.ObjectId();

//        authors.push(data);
//    })
//    .on("end", function(){
//        Pricelist.create(authors, function(err, documents) {
//           if (err) throw err;
//        });

//        res.send(authors.length + ' authors have been successfully uploaded.');
//    });
// };
// async function publishPricelist(file) {
//   const filedata = file.csv;
//   //convert csvfile to jsonArray     
//   // csv()  
//   // .fromFile(file)  
//   // .then((jsonObj)=>{  
//   // console.log(jsonObj);  }
//   csvjson()
//  .fromFile(filedata)
//  .then((jsonObj)=>{  
//  console.log(jsonObj);  })
//  //.then(function(jsonArrayObj){ //when parse finished, result will be emitted here.
//   // mongoose.connection.db.listCollections({name: 'students'})
//   // .next(function(err, collinfo) {
//   //   if (collinfo) {
//   //    mongoose.connection.db.hltest('students', function(err, result) {

//   //     jsonArrayObj.forEach(element => {
//   //          student.create(element)
//   //      });
//   //    });

//   //   }else{
//   //    jsonArrayObj.forEach(element => {
//   //         student.create(element)
//   //     });
//   //   }
//   // });
  
//  }
async function publishPricelist(file){
  const originaldata=file.csv
  Pricelist.create(originaldata, function (err, documents) {
            if (err) throw err;
          });
}

// async function publishPricelist(file) {
//   // if (!file) return res.status(400).send("No files were uploaded.");
//   if (!file) {
//     console.log("No files were uploaded");
//   }
//   var authorFile = file;
//   const fileName = file.csv;
//   // var authors = [];
//   // const originaldata = [];

//   //convert csvfile to jsonArray
//   csvjson()
//     .fromFile("./uploads/(${file.name}")
//     .then((fileName) => {
// console.log("fileName", fileName)
//       //insertmany is used to save bulk data in database.
//       //saving the data in collection(table)
//       // authorFile.insertMany(jsonObj, (err, data) => {
//       //   if (err) {
//       //     res.status(400).json({
//       //       message: "Something went wrong!",
//       //     });
//       //   } else {
//       //     res.status(200).json({
//       //       message: "File Uploaded Successfully!",
//       //       result: data,
//       //     });
//       //   }
//       // });
//     });
// }

async function updatePricelist(body) {
  console.log("body ", body);
  if (Object.keys(body).length === 0) {
      throw Error("Invalid body parameter");
  }
  const findPricelist = await Pricelist.findOne({SNo: body.SNo });
  if(findSNo){
      await Pricelist.findOneAndUpdate(
          { SNo: body.SNo },
          {
            SNo: body.SNo,
            ServiceCode: body.ServiceCode,
            DiagnosisTestorServiceName: body.DiagnosisTestorServiceName,
            Organisationid: body.Organisationid,
            OrganisationPrices: body.OrganisationPrices,
            FacilityNPI :body.FacilityNPI,
            FacilityPrices:body.FacilityPrices,
            createdBy: body.FacilityNPI,
            createdDate: body.createdDate,
              updatedBy: body.FacilityNPI,
              updatedDate: new Date(),
          }
      );
      return { message: 'Successfully saved' };
  } else {
      throw Error('Service not found');
  }
}

async function deletePricelist(SNo) {
  if(SNo){
      await Pricelist.deleteOne( { SNo: SNo });
      return { message: 'successfully deleted'};
  } else {
      throw Error('Service not found');
  }
}

async function getPriceListbyFacility(FacilityNPI) {
  if(FacilityNPI){
      const PricelistDetails = await Pricelist.aggregate(
          [
              { $match: { FacilityNPI: FacilityNPI }},
              {
                $project: {
                  SNo: 1,
                  ServiceCode: 1,
                  DiagnosisTestorServiceName: 1,
                  Organisationid:1,
                  OrganisationPrices: 1,
                  FacilityNPI:1,
                  FacilityPrices:1,
                  createdBy: 1,
                  createdDate: 1,
                    updatedBy: 1,
                    updatedDate: 1,
          
                },
              },
              { $limit: 1 },
          ]
      );
      return { data: PricelistDetails };
  } else {
      throw Error('please provide facility npi')
  }
} 
 
