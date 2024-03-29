// import React, { FC, ReactElement } from "react";
// import {
//   Box,
//   Link,
//   Container,
//   IconButton,
//   Menu,
//   MenuItem,
//   Toolbar,
//   Typography,
//   Paper,
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import { routes } from "../routes";
// import { NavLink, useNavigate } from "react-router-dom";
// import { Buttoncomponent } from "../Components/Buttoncomp";
// import { useAppDispatch, useAppSelector } from "../Redux/Hook";
// import { logoutButton, storeLoginInfo } from "../Redux/LoginSlice";
// import Cookies from "js-cookie";

// const Navbar = () => {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const logout = useAppSelector((state) => state.auth.logoutButton);
//   const dispatch=useAppDispatch()
//   const navigate=useNavigate()

//   const handleOpenNavMenu = (event: any) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };
//   const onLogout=()=>{
//     dispatch(logoutButton())
//     dispatch(storeLoginInfo({}))
//     Cookies.remove("token")
//     localStorage.removeItem("pageUserType")
//     navigate("/")
//   }

//   return (
//     <Paper
//       sx={{
//         width: "100%",
//         height: "7vh",
//         backgroundColor: "primary.light",
//         position: "fixed",
//         zIndex: 1,
//         border: "1px solid #728AB7",
//       }}
//     >
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h5"
//             noWrap
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//             }}
//           >
//             <Box sx={{ display: "flex", fontWeight: "bold" }}>
//               Care<Box sx={{ color: "#4D77FF" }}>Cadet</Box>
//             </Box>
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>

//             <Menu
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {routes.map((page) => (
//                 <Link
//                   key={page.key}
//                   component={NavLink}
//                   to={page.path}
//                   color="black"
//                   underline="none"
//                   variant="button"
//                 >
//                   <MenuItem onClick={handleCloseNavMenu} sx={{ width: 250 }}>
//                     <Typography textAlign="center">{page.title}</Typography>
//                   </MenuItem>
//                 </Link>
//               ))}
//             </Menu>
//           </Box>
//           <Typography
//             variant="h6"
//             // noWrap
//             component="div"
//             sx={{ display: { xs: "flex", md: "none" } }}
//           >
//             <Box
//               sx={{
//                 flexGrow: "1",
//                 cursor: "pointer",
//                 display: { xs: "flex", md: "none", fontWeight: "bold" },
//               }}
//             >
//               CareCadet
//             </Box>
//           </Typography>
//           <Box sx={{ display: { xs: "none", md: "flex" } }}>
//             <Box
//               sx={{ marginLeft: { md: "40em", xl: "55em" }, display: "flex" }}
//             >
//               {routes.map((page) => (
//                 <Link
//                   key={page.key}
//                   component={NavLink}
//                   to={page.path}
//                   color="primary.main"
//                   underline="none"
//                   variant="button"
//                   sx={{ fontSize: "1.2rem", marginLeft: "2rem" }}
//                 >
//                   {page.title}
//                 </Link>
//               ))}
//             </Box>
//             {logout ? (
//               <Buttoncomponent
//                 type="button"
//                 size="small"
//                 fullWidth={false}
//                 variant="contained"
//                 onClick={onLogout}
//                 sx={{
//                   backgroundColor: "secondary.dark",
//                   width: "7vw",
//                   color: "#fff",
//                   "&:hover": {
//                     color: "secondary.dark",
//                     border: "1px solid blue",
//                     // letterSpacing: "0.2rem",
//                     // fontSize: "1rem",
//                   },
//                 }}
//               >
//                 Logout
//               </Buttoncomponent>
//             ) : null}
//           </Box>
//         </Toolbar>
//       </Container>
//     </Paper>
//   );
// };

// export default Navbar;

import React, { FC, ReactElement } from "react";
import {
  Box,
  Link,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Paper,
  Grid
} from "@mui/material";
import {toast} from "react-toastify"


import MenuIcon from "@mui/icons-material/Menu";
import { navRoutes } from "../routes";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Buttoncomponent } from "../Components/Buttoncomp";
import { useAppDispatch, useAppSelector } from "../Redux/Hook";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { axiosPrivate } from "../axios/axios";


import {
  logoutButton,
  pageUser,
  storeLoginInfo,
} from "../Redux/ProviderRedux/LoginSlice";
import { patientLogoutButton } from "../Redux/PatientRedux/patientAuth";
import { refrestState } from "../Redux/ProviderRedux/orgSlice";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const providerLogout = useAppSelector((state) => state.providerAuth.providerLogoutButton);
  const patientLogout=useAppSelector((state)=>state.patientAuth.patientLogoutButton)
  const userID=useAppSelector((state)=>state.providerAuth.login.userID)
  const userName=useAppSelector(state=>state.providerAuth.login.userName)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const char =location.pathname.split("/")[1] === ""? "patient": location.pathname.split("/")[1];

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  

  const onPageUser = (user: any, path: string) => {
    dispatch(pageUser(user));
    navigate(path);
  };
  const onLogout = (type:string) => {
    if(type==="patient"){
      dispatch(patientLogoutButton());
      navigate("/");
    }
    if(type==="provider"){
    axiosPrivate.post("/user/logout",userName).then(res=>{
        console.log(res,"logout")
        dispatch(logoutButton());
        dispatch(refrestState());
        toast.success(res.data.message)
        navigate("/provider/home");
    })
  }
  };
  return (
    <Paper
      sx={{
        width: "100%",
        height: "7vh",
        backgroundColor: "primary.light",
        position: "fixed",
        zIndex: 1,
        border: "1px solid #728AB7",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:"flex",justifyContent:"space-between"}}>
          <Typography
            variant="h5"
            noWrap
            sx={{
              // mr: 2,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Box sx={{ display: "flex", fontWeight: "bold" }}>
              Care<Box sx={{ color: "#4D77FF" }}>Cadet</Box>
            </Box>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navRoutes.map((page) => (
                <Link
                  key={page.key}
                  component={NavLink}
                  to={page.path}
                  color="black"
                  underline="none"
                  variant="button"
                >
                  <MenuItem onClick={handleCloseNavMenu} sx={{ width: 250 }}>
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            // noWrap
            component="div"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <Box
              sx={{
                flexGrow: "1",
                cursor: "pointer",
                display: { xs: "flex", md: "none", fontWeight: "bold" },
              }}
            >
              CareCadet
            </Box>
          </Typography>
         <Box sx={{width:"30%",display:{ xs: "none", md: "flex",xl:"flex" },justifyContent:"flex-end"}}>
            <Box sx={{ display:"flex" }}>
              {navRoutes.map((page) => (
                <Typography
                  key={page.key}
                  color={char === page.color ? "#4D77FF" : "primary.main"}
                  variant="button"
                  onClick={() => {
                    onPageUser(page.title, page.path);
                  }}
                  sx={{ fontSize: "1.2rem", marginLeft: "2rem" ,cursor:"pointer"}}
                >
                  {page.title}
                </Typography>
                // <Link
                //   key={page.key}
                //   component={NavLink}
                //   to={page.path}
                //   color="primary.main"
                //   underline="none"
                //   variant="button"
                //   sx={{ fontSize: "1.2rem", marginLeft: "2rem" }}
                // >
                //   {page.title}
                // </Link>
              ))}

             
            </Box>
            {providerLogout ? (
          <Box sx={{display:"flex"}}>
           
          <Buttoncomponent
            type="button"
            size="small"
            fullWidth={false}
            variant="contained"
            onClick={()=>{onLogout("provider")}}
            sx={{
              backgroundColor: "secondary.dark",
              width: "7vw",
              color: "#fff",
              ml: "15px",
              "&:hover": {
                color: "secondary.dark",
                border: "1px solid blue",
                // letterSpacing: "0.2rem",
                // fontSize: "1rem",
              },
            }}
          >
            Logout
          </Buttoncomponent>
          <Box sx={{width:"7vw",display:"flex",flexWrap:"nowrap",gap:"0.5rem",margin:"0 0 0 1.5rem"}}>
              <AccountCircleOutlinedIcon fontSize="large"/>
              <Typography sx={{margin:"0.2rem 0 0 0"}}>{userID}</Typography>
              </Box>
        </Box>
      ) : null}
           {patientLogout ? (
        <Box  >
           {/* <Box sx={{width:"7vw",display:"flex",flexWrap:"nowrap",gap:"0.5rem",margin:"0 0 0 1.5rem"}}>
              <AccountCircleOutlinedIcon fontSize="large"/>
              <Typography sx={{margin:"0.2rem 0 0 0"}}>{userID}</Typography>
              </Box> */}
          <Buttoncomponent
            type="button"
            size="small"
            fullWidth={false}
            variant="contained"
            onClick={()=>{onLogout("patient")}}
            sx={{
              backgroundColor: "secondary.dark",
              width: "7vw",
              color: "#fff",
              ml: "15px",
              "&:hover": {
                color: "secondary.dark",
                border: "1px solid blue",
                // letterSpacing: "0.2rem",
                // fontSize: "1rem",
              },
            }}
          >
            Logout
          </Buttoncomponent>
        </Box>
      ) : null}
      </Box>
          
        
        </Toolbar>
      </Container>
    </Paper>
  );
};

export default Navbar;
