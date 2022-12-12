import { useEffect, useState } from "react";
import { Paper, TextField, Box } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

import { DataGrid } from "@mui/x-data-grid";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputAdornment } from "@mui/material";
import { margin } from "@mui/system";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import Avatar from "@mui/material/Avatar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Redux/Hook";
import { editButton, tabValueNav } from "../../Redux/LoginSlice";

interface forminitialValues {
  SNo: "string";
  ServiceCode: "string";
  DiagnosisTestorServiceName: "string";
  OrganisationPrices: "string";
}

export default function Pricelistlandingpage() {
  const [data, setData] = useState([] as forminitialValues[]);
  const [pageSize, setPagesize] = useState(5);
  const dispatch=useAppDispatch()

  // const [totalPages, setTotalPages] = useState(10);

  const getData = async () => {
    const pricelistdetails = await axios.get(
      "http://localhost:5200/getPriceList"
    );
    setData(pricelistdetails.data.data);
    console.log(pricelistdetails.data, "pricelist");
  };
  useEffect(() => {
    getData();
  }, []);

  //   const handlePrevPage = (prevPage: number) => {
  //     setPage((prevPage) => prevPage - 1);
  //   };

  //   const handleNextPage = (nextPage: number) => {
  //     setPage((nextPage) => nextPage + 1);
  //   };

  const columns = [
    {
      field: "SNo",
      headerName: "S.No",

      width: 100,
    },
    {
      field: "ServiceCode",
      headerName: "Service Code",

      width: 100,
    },
    {
      field: "DiagnosisTestorServiceName",
      headerName: "Diagnosis Test/Service Name",

      width: 350,
    },
    {
      field: "Organisationid",
      headerName: "Organisation ID",

      width: 100,
    },
    {
      field: "OrganisationPrices",
      headerName: "Organisation Prices",

      width: 100,
    },
    {
      field: "FacilityNPI",
      headerName: "FacilityNPI",

      width: 100,
    },
    {
      field: "FacilityPrices",
      headerName: "Facility Prices",

      width: 100,
    },
  ];

  const navigate = useNavigate();

  const navigateToAdd = () => {
    // This will navigate to second component
    dispatch(editButton())
    navigate("/Pricelist");
  };
  const navigateToEdit = () => {
    // This will navigate to second component
    navigate("/PricelistEdit");
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
        <>
          <Box sx={{ display: "flex", gap: "2rem" }}>
            {/* <TextField
              placeholder="Search"
              sx={{ letterSpacing: "0.2rem", ml: 10, mr: 110 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            ></TextField> */}
             <Buttoncomponent
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              // onClick={onSave}
              // onClick={(e) => upload(e)}
              sx={{
                justifycontent: "right",
                alignitems: "right",
                textalign: "right",
                backgroundColor: "secondary.dark",
                width: "10vw",
                mr: 2,
                color: "#fff",
                "&:hover": {
                  color: "secondary.dark",
                  border: "1px solid blue",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
              onClick={()=>{dispatch(editButton())
                dispatch(tabValueNav(1))
              navigate("/providerlanding")}}
            >
              Back
            </Buttoncomponent>
            <Buttoncomponent
              type="submit"
              variant="contained"
              size="large"
              color="primary"
              // onClick={onSave}
              // onClick={(e) => upload(e)}
              sx={{
                justifycontent: "right",
                alignitems: "right",
                textalign: "right",
                backgroundColor: "secondary.dark",
                width: "10vw",
                mr: 2,
                color: "#fff",
                "&:hover": {
                  color: "secondary.dark",
                  border: "1px solid blue",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
              onClick={navigateToAdd}
            >
              Add
            </Buttoncomponent>
            <Avatar
              sx={{
                backgroundColor: "secondary.dark",
                width: "10vw",
                height: "4.3vw",
                borderRadius: "5px",
                mr: 10,
                color: "#fff",
                "&:hover": {
                  color: "secondary.dark",
                  border: "1px solid blue",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
              variant="square"
              onClick={navigateToEdit}
            >
              <EditIcon />
            </Avatar>
          </Box>
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
            // initialState={{
            //   pagination: {
            //     pageSize: 100
            //   }
            // }}
            // hideFooter
            sx={{ m: 10, fontSize: "1rem", backgroundColor: "lightgray" }}
          />
        </>
      </Paper>
    </>
  );
}
