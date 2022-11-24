import * as React from "react";
import profilephoto from "../images/profile.jpg";
import { menuItems } from "./MenuItem";
import { Link,useLocation } from 'react-router-dom';
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



const drawerWidth = 240;

export default function SideNavBar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
 
const location = useLocation();
    const drawer = (
        <List>
            <Toolbar
                sx={{
                    //   bgcolor: "#FEB224",
                    marginTop: "-15px",
                    borderRadius: { xs: "0", md: "20px 20px 0 0" },
                    height: "30vh",
                }}
            >
                <img
                    src={profilephoto}
                    alt="profile"
                    style={{
                        width: "220px",
                        height: "230px",
                        position: "relative",
                        top: "35px",
                        left: "13%",
                        border: "2px solid white",
                        borderRadius: "50%",
                    }}
                />

            </Toolbar>
            <Typography
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "800",
                    // fontFamily: "Poppins",
                    fontSize: "30px",
                    margin: "20px 0 20px 0"
                }}
            >
                ABC UrgentCare
            </Typography>
            <Divider />

            {menuItems.map((list, i) => (
                <Box key={i}>
                    <Link to={list.path}  >
                       {/* className = {location.pathname === list.path ? "side_active": "side_inactive"} */}
                        <ListItem
                            sx={{
                                ":hover ": {
                                    transition: "all .3s ease",
                                    // color: "#ff451b",                                   
                                    borderRadius: "10px"
                                },
                                bgcolor: location.pathname === list.path ? "red": "green",
                                diplay: "flex",
                                gap: "15px",
                                padding: "5%",
                                textTransform: "capitalize",
                                justifyContent: "flex-start",
                                alignItems: "center"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 700,
                                    // fontFamily: "Poppins",
                                    fontSize: "20px",
                                    color: "primary.contrastText",
                                    marginLeft: "25px"
                                }}
                            >
                                {list.title}
                            </Typography>
                        </ListItem>
                    </Link>
                    <Divider />
                </Box>
            ))}
        </List>
    );

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <MenuList
                    sx={{ display: { xs: "none", md: "block" } }}
                >
                    <Paper
                        sx={{
                            display: { xs: "none", md: "block" },
                            height: "100vh",
                            width: "19vw",
                            borderRadius: "15px",
                            margin: "5px"
                        }}
                        elevation={9}
                    >
                        {drawer}
                    </Paper>
                </MenuList>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", md: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                >
                    <Box sx={{ overflow: "hidden" }}>{drawer}</Box>
                </Drawer>
            </Box>
        </>
    );
}
