import * as React from "react";
import { useState } from "react";
import { Grid, Typography, Button, Paper, Box, Container } from "@mui/material";
import axios from "axios";
import { Buttoncomponent } from "../Components/Buttoncomp";
import { ChangeEvent } from "react";

import { DataGrid } from "@mui/x-data-grid";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { parse } from "csv-parse/browser/esm/sync";

type cvsItem = {
  id: string;
  value: string;
};

const columns = [
  {
    field: "id",
    headerName: "Id",
  },
  {
    field: "value",
    headerName: "Value",
  },
];

export default function Pricelisthome() {
  const [csvData, setCsvData] = useState<cvsItem[]>([]);
  const [filename, setFilename] = useState("");

  function csvJSON(csv: any) {
    console.log("csvdata");
    var lines = csv.split("\r\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj: any = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    setCsvData(result);
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);

    const reader = new FileReader();
    let j: any = [];
    reader.onload = () => {
      let text: any = reader.result;
      // alert(JSON.stringify(text))
      // console.log('CSV: ', text.substring(0, 100) + '...');

      //convert text to json here
      csvJSON(text);
    };
    // reader.onload = (evt) => {
    //   if (!evt?.target?.result) {
    //     return;
    //   }
    //   const { result } = evt.target;
    // alert(JSON.stringify(result))
    //   const records = parse(result as any, {
    //     columns: ["id", "value"],
    //     delimiter: ";",
    //     trim: true,
    //     skip_empty_lines: true
    //   });

    // };
    reader.readAsBinaryString(file);
    // reader.readAsText(file);

    console.log(csvData);
  };

  return (
    <>
      <Container
      //   sx={{
      //     maxWidth: "sm",
      //     display: "flex",
      //     flexDirection: "column",
      //     justifyContent: "center",
      //     alignItems: "center",
      //   }}
      >
        <Typography
          variant="h6"
          textAlign={"right"}
          justifyItems={"right"}
          sx={{ color: "Black" }}
          margin={"40px"}
          marginBottom={"5px"}
        >
          Hello User,
        </Typography>
        <div
          style={{
            flex: 1,
            height: "3px",
            backgroundColor: "darkgray",
          }}
        />
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          Upload your facility's Pricelist
        </Typography>
        <br></br>
        <Button
          component="label"
          variant="outlined"
          startIcon={<UploadFileIcon />}
          sx={{ marginRight: "1rem" }}
        >
          Upload CSV
          <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
        </Button>
        service pricelist.csv in <i>src dir</i>
        <Box>{filename}</Box>
        <DataGrid
          autoHeight
          rows={csvData}
          columns={columns}
          hideFooter
          sx={{ mt: 1 }}
        />
        <Buttoncomponent
          type="submit"
          variant="contained"
          size="large"
          color="primary"
        >
          Save
        </Buttoncomponent>
        <Buttoncomponent
          type="submit"
          variant="contained"
          size="large"
          color="primary"

          // onClick={onSubmit}
        >
          Publish
        </Buttoncomponent>
      </Container>
    </>
  );
}
