import { useEffect, useState } from "react";
import { Paper, TextField, Box, Typography } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

import { DataGrid, GridColumns, GridRow } from "@mui/x-data-grid";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputAdornment } from "@mui/material";
import { margin } from "@mui/system";
import { Buttoncomponent } from "../../Components/Buttoncomp";
import Avatar from "@mui/material/Avatar";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Redux/Hook";
import {  tabValueNav } from "../../Redux/LoginSlice";
import AddIcon from "@mui/icons-material/Add";
import clsx from "clsx";

interface forminitialValues {
  SNo: "string";
  ServiceCode: "string";
  DiagnosisTestorServiceName: "string";
  Organisationid: "string";
  OrganisationPrices: "string";
  FacilityID: "string";
  FacilityPrices: "string";
}

export default function Pricelistlandingpage() {
  const [data, setData] = useState([] as forminitialValues[]);
  const [pageSize, setPagesize] = useState(5);
  const dispatch = useAppDispatch();
  // const facilityid=useAppSelector((state)=>state.editFacility.service);
  // console.log("facilityid", facilityid);
  // const [totalPages, setTotalPages] = useState(10);

  const facilityinput = useAppSelector(
    (state: { editFacility: { service: any } }) => state.editFacility.service
  );
  console.log(facilityinput, "facip");
  const getData = async () => {
    const pricelistdetails = await axios.get(
      `http://localhost:5200/getPriceListbyFacility?facilityID=FAC-59`
    );
    setData(pricelistdetails.data.data);
    console.log(pricelistdetails.data, "pricelist");
  };
  useEffect(() => {
    getData();
  }, []);

  const columns: GridColumns = [
    {
      field: "SNo",
      headerName: "S.No",
      headerClassName: "super-app-theme--header",
      width: 90,
    },
    {
      field: "ServiceCode",
      headerName: "Service Code",
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "DiagnosisTestorServiceName",
      headerName: "Diagnosis Test/Service Name",
      headerClassName: "super-app-theme--header",
      width: 360,
    },
    {
      field: "Organisationid",
      headerName: "Organisation ID",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "OrganisationPrices",
      headerName: "Organisation Prices",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "FacilityID",
      headerName: "FacilityID",
      headerClassName: "super-app-theme--header",
      width: 170,
    },
    {
      field: "FacilityPrices",
      headerName: "Facility Prices",
      headerClassName: "super-app-theme--header",
      width: 170,
    },
  ];

  const navigate = useNavigate();

  const navigateToAdd = () => {
    // This will navigate to second component
    // dispatch(editButton());
    navigate("/Pricelist");
  };
  const navigateToEdit = () => {
    // This will navigate to second component
    navigate("/PricelistEdit");
  };

  function CustomRow(props: any) {
    const { className, index, ...other } = props;

    return (
      <GridRow
        index={index}
        className={clsx(className, index % 2 === 0 ? "odd" : "even")}
        {...other}
      />
    );
  }

  return (
    <>
      <Paper
        elevation={9}
        sx={{
          backgroundColor: "primary.light",
          padding: "0.2rem",
          borderRadius: "15px",
          height: "88.8vh",
        }}
      >
        <>
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
          <Typography
            sx={{
              padding: "1.5rem",
              textAlign: "left",
              fontSize: "2.5rem",
              fontWeight: "bold",
              mr: 10,
            }}
          >
            Services
          </Typography>
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

                fontSize: "0.9rem",
              },
            }}
            onClick={() => {
              // dispatch(editButton());
              dispatch(tabValueNav(1));
              navigate("/providerlanding");
            }}
          >
            Facilities info
          </Buttoncomponent>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            sx={{
              gap: "2rem",
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                // backgroundColor: "secondary.dark",

                borderRadius: "100 100 100 100",

                color: "#fff",
                "&:hover": {
                  color: "secondary.dark",
                  // border: "1px solid blue",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
              onClick={navigateToAdd}
            >
              <AddIcon />
            </Avatar>
            <Avatar
              sx={{
                // backgroundColor: "secondary.dark",

                borderRadius: "100 100 100 100",

                color: "#fff",
                "&:hover": {
                  color: "secondary.dark",
                  // border: "1px solid blue",
                  letterSpacing: "0.2rem",
                  fontSize: "1rem",
                },
              }}
              onClick={navigateToEdit}
            >
              <EditIcon />
            </Avatar>
          </Box>
          <Box
            sx={{
              "& .super-app-theme--header": {
                backgroundColor: "#4D77FF",
              },
              height: 400,
              width: 1,
              "& .odd": {
                bgcolor: "white",
              },
              "& .even": {
                bgcolor: "secondary.light",
              },
            }}
          >
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
              sx={{
                fontSize: "1rem",
                backgroundColor: "lightgray",
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "white",
                },
              }}
              components={{ Row: CustomRow }}
            />
          </Box>
        </>
      </Paper>
    </>
  );
}
