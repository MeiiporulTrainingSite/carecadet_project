import * as React from "react";
import profilephoto from "../images/profile.jpg";
import { menuItems } from "./MenuItem";
import { Link, useLocation } from 'react-router-dom';
import {
    Typography,
    Toolbar,
    Paper,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    List,
    ListItem,
    MenuList,

} from "@mui/material";


import ListSubheader from '@mui/material/ListSubheader';
import { listItemClasses } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function SideNavBar() {
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };


    const location = useLocation();

    const drawerWidth = 240;
    const menu = {
        fontSize: "1.2rem",
        marginLeft: "40px",
        color: "#173A5E",
        fontWeight: "bold",

    }
    const submenu = {
        fontSize: "1.2rem",
        marginLeft: "40px",
        color: "#173A5E",
        padding: "5px 0 5px 10px",

    }
    const button = {
        "&$selected": {
            backgroundColor: "red",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        "&:hover": {
            backgroundColor: "secondary.dark",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },

    }
    const submenubutton = {
        "&:hover": {
            backgroundColor: "secondary.dark",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        "&$selected": {
            backgroundColor: "red",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        "&$selected:hover": {
            backgroundColor: "purple",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        selected: {}
    }


    // export default function SideNavBar() {
    //     const [mobileOpen, setMobileOpen] = React.useState(false);

    //     const handleDrawerToggle = () => {
    //         setMobileOpen(!mobileOpen);
    //     };

    const drawer = (
        <List>
            <Toolbar
                sx={{
                    marginTop: "-25px",
                    borderRadius: { xs: "0", md: "20px 20px 0 0" },
                    height: "30vh",
                }}
            >
                <img
                    src={profilephoto}
                    alt="profile"
                    style={{
                        width: "200px",
                        height: "200px",
                        position: "relative",
                        top: "35px",
                        left: "19%",
                        border: "2px solid white",
                        borderRadius: "50%",
                    }}
                />
            </Toolbar>
            <Typography
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "600",
                    fontSize: "1.5rem",
                    margin: "20px 0 20px 0"
                }}
            >
                ABC UrgentCare
            </Typography>

            {/* <Divider /> */}





            {/* {menuItems.map((list, i) => (
                <Box key={i}>
                    <Link to={list.path} style = {{textDecoration:'none'}} > */}
            {/* className = {location.pathname === list.path ? "side_active": "side_inactive"} */}
            {/* <ListItem
                            sx={{
                                ":hover ": {
                                    transition: "all .3s ease",
                                    bgcolor: "secondary.dark",                                    */}
            {/* // borderRadius: "10px" */}
            {/* },
                                bgcolor: location.pathname === list.path ? "secondary.dark": "primary.light",
                                diplay: "flex",
                                gap: "15px",
                                padding: "5%",
                                textTransform: "capitalize",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                
                            }}
                        >
                            <Typography
                                sx={{ */}
            {/* // fontWeight: 400,
                                    // fontFamily: "Poppins",
                                    fontSize: "1.3rem",
                                    color: "primary.contrastText",
                                    marginLeft:"40px"
                                   
                                }}
                            >
                                {list.title}
                            </Typography>
                        </ListItem>
                    </Link> */}
            {/* <Divider /> */}
            {/* </Box>
            ))} */}
        </List>
    );

    // return (

    {/* <Paper
                        sx={{
                            display: { xs: "none", md: "block" },
                            height: "100vh",
                             width: "20vw",
                            borderRadius: "15px",
                            position:"fixed",
                            bgcolor:"primary.light"
                        }}
                        elevation={9}
                    >
                        {drawer}
                    </Paper> */}


    return (
        <>
            <Paper
                sx={{
                    display: { xs: "none", md: "block" },
                    height: "89vh",
                    width: "20vw",
                    borderRadius: "15px",
                    position: "fixed",
                    bgcolor: "primary.light"
                }}
                elevation={9}
            >
                {drawer}
                <Box sx={{}}>
                    <List
                        sx={{
                            width: '100%', 
                            bgcolor: 'primary.light',
                            // hover states
                            '& .MuiListItemButton-root:hover': {
                                bgcolor: 'secondary.dark',
                            },
                        }}
                        component="nav"
                    >

                        <ListItemButton onClick={handleClick} >
                            <ListItemText primaryTypographyProps={{ style: menu }} primary="Profile" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <Link to="/org" style={{ textDecoration: "none" }}>
                                    <ListItemButton sx={{ pl: 4, bgcolor: location.pathname === "/org" ? "secondary.dark" : "primary.light" }}>
                                        <ListItemText primaryTypographyProps={{ style: submenu }} primary="Organization" />
                                    </ListItemButton>
                                </Link>
                                <Link to="/facility" style={{ textDecoration: "none" }}>
                                    <ListItemButton sx={{ pl: 4, bgcolor: location.pathname === "/facility" ? "secondary.dark" : "primary.light" }} >
                                        <ListItemText primaryTypographyProps={{ style: submenu }} primary="Facility" />
                                    </ListItemButton>
                                </Link>
                            </List>
                        </Collapse>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <ListItemButton onClick={handleClick} >
                                <ListItemText primaryTypographyProps={{ style: menu }} primary="Price listing" />
                            </ListItemButton>
                        </Link>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <ListItemButton onClick={handleClick} >
                                <ListItemText primaryTypographyProps={{ style: menu }} primary="Review price listing" />
                            </ListItemButton>
                        </Link>
                    </List>
                </Box>
            </Paper>
        </>
    );
}








    // );
// }
