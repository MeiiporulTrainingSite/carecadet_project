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
                    marginTop: "-25px",
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
                                bgcolor: location.pathname === list.path ? "secondary.dark": "primary.light",
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
    
                <Paper
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
                    </Paper>

         
                
                   
              
               
          
      
    );
}
