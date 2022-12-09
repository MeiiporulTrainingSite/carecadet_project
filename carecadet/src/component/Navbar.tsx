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
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { routes } from "../routes";
import { NavLink, useNavigate } from "react-router-dom";
import { Buttoncomponent } from "../Components/Buttoncomp";
import { useAppDispatch, useAppSelector } from "../Redux/Hook";
import { logoutButton, storeLoginInfo } from "../Redux/LoginSlice";
import Cookies from "js-cookie";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const logout = useAppSelector((state) => state.auth.logoutButton);
  const dispatch=useAppDispatch()
  const navigate=useNavigate()

  const handleOpenNavMenu = (event: any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const onLogout=()=>{
    dispatch(logoutButton())
    dispatch(storeLoginInfo({}))
    Cookies.remove("token")
    localStorage.removeItem("pageUserType")
    navigate("/")
  }

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
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
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
              {routes.map((page) => (
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
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Box
              sx={{ marginLeft: { md: "45em" }, display: "flex" }}
            >
              {routes.map((page) => (
                <Link
                  key={page.key}
                  component={NavLink}
                  to={page.path}
                  color="primary.main"
                  underline="none"
                  variant="button"
                  sx={{ fontSize: "1.2rem", marginLeft: "2rem" }}
                >
                  {page.title}
                </Link>
              ))}
           
            {logout ? (
              <Buttoncomponent
                type="button"
                size="small"
                fullWidth={false}
                variant="contained"
                onClick={onLogout}
                sx={{
                  backgroundColor: "secondary.dark",
                  width: "7vw",
                  color: "#fff",
                  ml:"15px",
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
            ) : null}
          </Box>
          </Box>
        </Toolbar>
      </Container>
    </Paper>
  );
};

export default Navbar;

