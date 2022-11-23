import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 import { routes as appRoutes } from "./routes";
import Layout from "./component/Layout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "./Pages/Login";
import Home from "./Pages/Home";

// //pages
// import Patient from "./Pages/Patient";
// import Provider from "./Pages/Provider";
// import Payer from "./Pages/Payer";
// import Contact from './Pages/Contact';


// // other
// import {FC} from "react";

// interface Route {
//   key: string,
//   title: string,
//   path: string,
//   enabled: boolean,
//   component: FC<{}>
// }

// const routes: Array<Route> = [
//   {
//       key: 'patient',
//       title: 'Patient',
//       path: '/patient',
//       enabled: true,
//       component: Patient
//   },
//   {
//       key: 'provider',
//       title: 'Provider',
//       path: '/provider',
//       enabled: true,
//       component: Provider
//   },
//   {
//       key: 'payer',
//       title: 'Payer',
//       path: '/payer',
//       enabled: true,
//       component: Payer
//   },
//   {
//       key: 'contact',
//       title: 'Contact',
//       path: '/contact',
//       enabled: true,
//       component: Contact
//   },
  
// ]

function App() {
  // define theme
  const theme = createTheme({
    palette: {
      primary: {
        light: "#EBF3FA", // page background
        main: "#687B9E",  //dark
        dark: "#E4ECF7",  // nav background
        contrastText: "#000",
      },
      secondary: {
        main: "#4db6ac",
        light: "#728AB7", // Title background
        dark: "#4D77FF", //button
        contrastText: "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>

          {/* <Route
    path="/provider"
    element={(
      <ProtectedRoute>
       <Provider/>
      </ProtectedRoute>
    )}
  />
   <Route
    path="/patient"
    element={(
      <ProtectedRoute>
       <Patient/>
      </ProtectedRoute>
    )}
  />
  <Route
    path="/contact"
    element={(
      <ProtectedRoute>
       <Contact/>
      </ProtectedRoute>
    )}
    />*/}
  <Route path="/" element={<Home/>}/> 
  <Route path="/login" element={<Login/>}/> 
            {/* <Route path = '/patient' element = {<Patient/>}/> */}
          {/* <Route
                key={routes[0].key}
                path={routes[0].path}
                element={<Patient/>}/> */}
          
            {appRoutes.map((route) => (
              <Route
              key={route.key}
              path={route.path}
              element={(
                <ProtectedRoute>
               <route.component />
                </ProtectedRoute>
              )}
            />
            ))}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;



// import React from "react";

// import "./App.css";
// import TextField from "@mui/material/TextField";
// import FormTextField from "./Components/Textfield";
// import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
// import SelectField from "./Components/Select";
// import * as Yup from "yup";
// import Check from "./Components/Checkbox";
// import ErrorProps from "./Components/Errorprops";
// import { Buttoncomponent } from "./Components/Buttoncomp";
// import RadioComp from "./Components/Radiocomponent";
// import SwitchComponent from "./Components/Switchcomponent";
// import DatePickerField from "./Components/Datepicker";
// import { Dayjs } from "dayjs";

// interface FormValues {
//   fname: string;
//   select: any;
//   multiCheckbox: {
//     [key: string]: boolean;
//     one: boolean;
//     two: boolean;
//     three: boolean;
//   };
//   gender: string;
//   toggle: boolean;
//   date?: Dayjs | null;
// }

// const App: React.FC<{}> = () => {
//   const initialValues: FormValues = {
//     fname: "",
//     select: "",
//     multiCheckbox: {
//       one: false,
//       two: false,
//       three: false,
//     },
//     gender: "",
//     toggle: false,
//     date: null,
//   };

//   const optionRadio = [
//     {
//       label: "one",
//     },
//     {
//       label: "two",
//     },
//     {
//       label: "three",
//     },
//   ];
//   const validationSchema = Yup.object().shape({
//     fname: Yup.string().required("Required"),
//     select: Yup.string().required("Required"),
//     multiCheckbox: Yup.object({
//       one: Yup.boolean().notRequired().default(false),
//       two: Yup.boolean().notRequired().default(false),
//       three: Yup.boolean().notRequired().default(false),
//     })
//       .required("Required")
//       .test(
//         "multiCheckbox",
//         "At least one of the checkbox is required",
//         (val) => {
//           return Object.values(val).some((v) => v === true);
//         }
//       ),
//     gender: Yup.string().required("Required"),
//     date: Yup.string().nullable().required("Required"),
//     // toggle: Yup.boolean().required("Required").default(false),
//   });
//   const optionscheck = [
//     {
//       name: "one",
//       label: "one",
//     },
//     {
//       name: "two",
//       label: "two",
//     },
//     {
//       name: "three",
//       label: "three",
//     },
//   ];

//   const options = [
//     {
//       item: "one",
//       value: 1,
//     },
//     {
//       item: "two",
//       value: 2,
//     },
//     {
//       item: "three",
//       value: 3,
//     },
//   ];
//   return (
//     <Formik
//     initialValues={initialValues}
//     validationSchema={validationSchema}
//     onSubmit={(values, actions) => {
//       let checkValue = values.multiCheckbox;
//       let filteredOutput = Object.keys(checkValue).filter(
//         (key) => checkValue[key] === true
//       );
//       // const justStrings = Object.assign({}, filteredOutput);
//       // let filterop=  OK.filter(key => checkValue[key]===true)
//       // console.log("FOP", justStrings);

//       // .map((key, index) => {
//       //   return <div key={key}>

//       //            <p>{checkValue[key].main}</p>
//       //          </div>
//       // }
//       // )
     
     
//       let result = {
//         fname: values.fname,
//         select: values.select,
//         filteredOutput: filteredOutput,
//         gender: values.gender,
//         toggle: values.toggle,
//     date:values.date?.format("DD-MM-YYYY")
//       };
//       console.log("result", result);
//       alert(JSON.stringify(result, null, 2));
//       actions.resetForm({
//         values: {
//           fname: "",
//           select: "",
//           multiCheckbox: {
//             one: false,
//             two: false,
//             three: false,
//           },
//           gender: "",
//           toggle: false,
//           date: null
//         },
//       });
//     }}
//   >
//     <Form>
//       <label>name</label>
//       <FormTextField
//         container={{ ...TextField }}
//         name="fname"
//         placeholder="name"
//         type="text"
//       />
//       <SelectField name="select" selectData={options} />
//       {/* <Text data={options} name="select"  label="select" /> */}

//       {/* <CheckBox name="check" checkdata={optionscheck} /> */}
//       {/* <label>One</label> */}
//       <Check name={"multiCheckbox.one"} label="one" />
//       {/* <label>Two</label> */}
//       <Check name={"multiCheckbox.two"} label="two" />
//       {/* <label>Three</label> */}
//       <Check name={"multiCheckbox.three"} label="three" />

//       <ErrorMessage name="multiCheckbox">
//         {(error) => <ErrorProps>{error}</ErrorProps>}
//       </ErrorMessage>

//       <RadioComp name="gender" radioarray={optionRadio} />

//       <SwitchComponent name="toggle" label="toggle" />

//       <DatePickerField label="Date" name="date" />

//       <Buttoncomponent
//         type="submit"
//         variant="contained"
//         size="large"
//         color="success"
//       >
//         Submit
//       </Buttoncomponent>
//     </Form>
//   </Formik>
//   );
// };

// export default App;

