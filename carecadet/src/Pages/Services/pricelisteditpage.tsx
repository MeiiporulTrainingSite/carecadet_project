import { useEffect, useState } from "react";
import { Paper, TextField , Box, Typography} from "@mui/material";
import axios from "axios";
import {
  GridRowsProp,
  GridValueSetterParams,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
  randomId
} from "@mui/x-data-grid-generator";
import {
  CheckBoxOutlineBlankSharp,
  ConstructionOutlined
} from "@mui/icons-material";
import { Routes, Route, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Buttoncomponent } from "../../Components/Buttoncomp";
interface forminitialValues {
  SNo: "string";
  ServiceCode: "string";
  DiagnosisTestorServiceName: "string";
  OrganisationPrices: "string";
  
}

export default function PricelistEditpage() {
  const [data, setData] = useState([] as forminitialValues[]);
  const [pageSize, setPagesize] = useState(5);
  const [csvEdit, setcsvEdit] = useState([] as forminitialValues[]);
  const [csvdel, setcsvDel] = useState([] as forminitialValues[]);
  const [filename, setFilename] = useState("");

  const getData = async () => {
    const pricelistdetails = await axios.get(
      "http://localhost:4000/getPriceList"
    );
    setData(pricelistdetails.data.data);
    console.log(pricelistdetails.data, "pricelist");
  };
  useEffect(() => {
    getData();
  }, []);

  const handleDeleteClick = (id: GridRowId) => () => {
    setData(data.filter((row) => row.SNo !== id));
    let store = data.filter((row) => row.SNo === id);
    setcsvDel([...csvdel, ...store]);
  };

  const onCellEditCommit = async (cellData: any) => {
    const { id, field, value } = cellData;
    console.log(cellData);
    let d = data.filter((data1) => data1.SNo === id);

    let dd = csvEdit.filter((ddd) => ddd.SNo=== id);

    if (dd.length !== 0) {
      let r = csvEdit.map((dd) => {
        if (dd.SNo === id) {
          return { ...dd, [field]: value };
        }

        return dd;
      });
      setcsvEdit(r);
    } else {
      setcsvEdit([...csvEdit, { ...d[0], [field]: value }]);
    }
  };

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
    setData(result);
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  } const upload = (e: any) => {
    e.preventDefault();
    // if(output){
    //    let formData = new FormData();
    //  formData.append("screenshot", output);
    let datacheck={name:filename,csv:data}
    axios
      .post(
        "http://localhost:4000/upload",
      datacheck
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      )
      .then((res) => {
        console.log("Success ", res);
        alert("success");
      });
    //  }
  };
  
  

  const columns = [
    {
      field: "SNo",
      headerName: "S.No",
      editable: true,
      width: 100,
    },
    {
      field: "ServiceCode",
      headerName: "Service Code",
      editable: true,
      width:150,
    },
    {
      field: "DiagnosisTestorServiceName",
      headerName: "Diagnosis Test/Service Name",
      editable: true,
      width: 400,
    },
    {
      field: "OrganisationPrices",
      headerName: "Organisation Prices",
      editable: true,
      width: 200,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (data: any) => {
        let id = data.id;

        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />
        ];
      }
    }
  ];

  const navigate = useNavigate();
  
  const navigateToAdd = () => {
  
    // This will navigate to second component
    navigate('/Pricelisthome'); 
  };


  return (
    <>
      <Paper
        elevation={9}
        sx={{
          backgroundColor: "primary.light",
          padding: "1.5rem",
          borderRadius: "15px",
          height: "88.8vh",
        }}
      >
        <Typography
                mb={"0.5rem"}
                sx={{
                  backgroundColor: "#B4C8FC",
                  padding: "0.7rem",
                  textAlign: "center",
                  fontSize: "1.5rem",
                }}
              >
                Pricelist Edit Page
              </Typography>
        <>
        <Box sx={{ display: "flex", gap: "2rem" }} >
        
        <DataGrid
          autoHeight
          autoPageSize
          getRowId={(row) => row.SNo}
          rows={data}
          columns={columns}
          
          pagination={true}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPagesize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          onCellEditCommit={onCellEditCommit}
          sx={{ m: 10, fontSize: "1rem", backgroundColor: "lightgray" }}
        />
</Box>
<Buttoncomponent
            type="submit"
            variant="contained"
            size="large"
            color="primary"
            // onClick={onSave}
            onClick={(e) => upload(e)}
            sx={{
              mt: 2,
              backgroundColor: "secondary.dark",
              width: "10vw",
              color: "#fff",
              "&:hover": {
                color: "secondary.dark",
                border: "1px solid blue",
                letterSpacing: "0.2rem",
                fontSize: "1rem",
              },
            }}
          >
            Save
          </Buttoncomponent>
{JSON.stringify(csvEdit)}
      <br />
      
      {JSON.stringify(csvdel)}
        </>
      </Paper>
    </>

  );
}
