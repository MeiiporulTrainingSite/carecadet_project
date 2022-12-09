import Pricelist from "./pricelist.schema.js";
import path from "path";
import mongoose from "mongoose";
import fs from "fs";
import csv from "fast-csv";
// import csv from "convert-csv-to-json";
// import csvjson from "csvtojson";
import pkg from "json-2-csv";
const { json2csv } = pkg;
const __dirname = path.resolve(path.dirname(""));
export default { uploadPricelist, publishPricelist, getPriceList };

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

  // console.log("fileop", filedata);

  // json2csv(filedata, (err, csv) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(csv,"csvop");
  //   const filename = Date.now() + "_" + file.name;
  //   let uploadPath = __dirname + "/uploads/" + filename;
  //   // csv.mv(uploadPath, (err) => {
  //   //     if (err) {
  //   //       // return res.send(err);
  //   //       console.log("error");
  //   //     }
  //   //   });
  //   // print CSV string

  //   // fs.writeFile("filename.csv", csv);
  // });

  // console.log("file", file)
  // const filename = Date.now() + "_" + file.name;
  // const file1 = file;
  // let uploadPath = __dirname + "/uploads/" + filename;
  // file1.mv(uploadPath, (err) => {
  //   if (err) {
  //     // return res.send(err);
  //     console.log("error");
  //   }
  // });
}

// async function publishPricelist(file) {
//   // if (!file) return res.status(400).send("No files were uploaded.");
//   if (!file) {
//     console.log("No files were uploaded");
//   }
//   var authorFile = file;

//   var authors = [];
//   const originaldata = [];
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
        OrganisationPrices: 1,
      },
    },
  ]);
  return { data: PriceList };
}

async function publishPricelist(file) {
  // if (!file) return res.status(400).send("No files were uploaded.");
  if (!file) {
    console.log("No files were uploaded");
  }
  var authorFile = file;
  const fileName = file.csv;
  // var authors = [];
  // const originaldata = [];

  //convert csvfile to jsonArray
  csv()
    .fromFile(fileName())
    .then((jsonObj) => {
      //insertmany is used to save bulk data in database.
      //saving the data in collection(table)
      authorFile.insertMany(jsonObj, (err, data) => {
        if (err) {
          res.status(400).json({
            message: "Something went wrong!",
          });
        } else {
          res.status(200).json({
            message: "File Uploaded Successfully!",
            result: data,
          });
        }
      });
    });
}

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
