import { useEffect, useState } from 'react';
import { Box, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { Grid, Paper } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
//comp
import { Buttoncomponent } from '../../Components/Buttoncomp'
//redux store
import { useAppSelector, useAppDispatch } from '../../Redux/Hook';
import { facilityInfo } from '../../Redux/facilitySlice';


interface forminitialValues {
    providerID: string;
    facilityID: string;
    facilityNPI?: string;
    facilityName: string;
    facilityType: string;
    address: {
        addressLine1: string;
        addressLine2?: string;
        city: string;
        state: string;
        zipCode: string;
    },
    contact: string;
    email: string;
}

export default function ViewFacility() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState([] as forminitialValues[]);
    console.log(data, 'datinfo')
    const dispatch = useAppDispatch();
    const getid = useAppSelector((state: { auth: { login: any; } }) => state.auth.login)

    const facilityinput = useAppSelector((state: { editFacility: { fData: any } }) => state.editFacility.fData)
    console.log(facilityinput, 'viewinput')

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        // const facilityDetails = await axios.get('http://localhost:5200/facility/getFacilityList')
        const facilityDetails = await axios.get(`http://localhost:5200/facility/getFacilityByProvider?providerID=${getid.userID}`)
        setData(facilityDetails.data.data);

    }

    const Pointer = { cursor: 'hand' };
  

    const deleteFacility = async (event: any, id: number) => {
        //event.persist();

        await axios.delete(`http://localhost:5200/facility/deleteFacility?facilityID=${facilityinput.facilityID}`, facilityinput)
            .then(data => {
                getData();
            })
    }

    //Table Pagination
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        page: number) => {
        setPage(page)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        // <Paper sx={{ backgroundColor: "primary.light" }}>
        <Grid container justifyContent='center' display='flex'>
            <TableContainer component={Paper} elevation={5} sx={{ backgroundColor: "primary.light", maxWidth: '78vw', borderRadius: '15px', m: '1em 0 1em 0' }}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                padding: "1.5rem",
                                textAlign: "left",
                                fontSize: "1.5rem",
                                fontWeight: 'bold'
                            }}>
                            Facility Listicle
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} sm={6} justifyContent='right'>
                        <Link to="/addFacility" style={{ textDecoration: 'none' }}>
                            <Buttoncomponent
                                fullWidth={false}
                                variant="contained"
                                type="button"
                                size="large"
                                sx={{
                                    backgroundColor: "secondary.dark",
                                    width: "12vw",
                                    color: "#fff",
                                    "&:hover": {
                                        color: "secondary.dark",
                                        border: "1px solid blue",
                                    },
                                    m: '1.5rem'
                                }} >Add Facility</Buttoncomponent>
                        </Link>
                    </Grid>
                </Grid>


                <Grid item sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Table sx={{ maxWidth: '78vw' }}>
                        <TableHead sx={{ backgroundColor: 'secondary.light' }}>
                            <TableRow>
                                <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Facility NPI</TableCell>
                                <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Facility Name</TableCell>
                                <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Facility Type</TableCell>
                                <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Address</TableCell>
                                <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Contact</TableCell>
                                <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Email</TableCell>
                                <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {(rowsPerPage > 0
                                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : data
                            ).map(facility => (
                                <TableRow key={facility.facilityNPI}>
                                    <TableCell sx={{ fontSize: '1rem', textAlign: 'center' }}>{facility.facilityNPI}</TableCell>
                                    <TableCell sx={{ fontSize: '1rem', textAlign: 'center' }}>{facility.facilityName}</TableCell>
                                    <TableCell sx={{ fontSize: '1rem', textAlign: 'center' }}>{facility.facilityType}</TableCell>
                                    <TableCell sx={{ fontSize: '1rem', textAlign: 'center' }}>
                                        <p style={{ margin: "0px" }}>{facility.address.addressLine1}<span style={{ marginLeft: '10px' }}>{facility.address.addressLine2}</span> </p>
                                        <p style={{ margin: "0px" }}>{facility.address.city}<span style={{ marginLeft: '10px' }}>{facility.address.zipCode}</span> </p>
                                        <p style={{ margin: "0px " }}>{facility.address.state}</p>
                                    </TableCell>
                                    <TableCell sx={{ fontSize: '1rem', textAlign: 'center' }}>{facility.contact}</TableCell>
                                    <TableCell sx={{ fontSize: '1rem', textAlign: 'center' }}>{facility.email}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }} >
                                        <IconButton style={Pointer}>
                                            <EditIcon style={Pointer} onClick={() => {
                                                dispatch(facilityInfo(facility))
                                                navigate('/update')
                                            }} />
                                        </IconButton>
                                        <IconButton style={Pointer}>
                                            <DeleteIcon style={Pointer}
                                                onClick={() => {
                                                    dispatch(facilityInfo({ facility }));
                                                    axios.delete(`http://localhost:5200/facility/deleteFacility?facilityID=${facility.facilityID}`, facilityinput)
                                                        .then(() => {
                                                            toast.success('Successfully Deleted')
                                                            getData();
                                                        })
                                                }} />
                                        </IconButton>
                                        <IconButton>
                                            <MedicalServicesIcon onClick = {() => navigate('/pricelistlanding')} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    labelDisplayedRows={({ from, to, count }) =>
                                        `${from}-${to} of ${count !== -1 ? count : ` ${to}}`}`
                                    }
                                    backIconButtonProps={{
                                        color: "secondary"
                                    }}
                                    nextIconButtonProps={{ color: "secondary" }}
                                    showFirstButton={true}
                                    showLastButton={true}
                                    labelRowsPerPage={<span>Rows:</span>}
                                    sx={{
                                        ".MuiTablePagination-toolbar": {
                                            backgroundColor: "primary.light"
                                            // "rgba(100,100,100,0.5)"
                                        },
                                        ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
                                            fontWeight: "bold",
                                            color: "#173A5E"
                                        }
                                    }}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Grid>
            </TableContainer>
        </Grid>
        // </Paper>
    )
}