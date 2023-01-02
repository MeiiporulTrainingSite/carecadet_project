//pages
import Patient from "./Pages/Patient";
import Provider from "./Pages/Provider";
import Payer from "./Pages/Payer";
import Contact from "./Pages/Contact";

// other
import { FC } from "react";
import OrganizationInfo from "./Pages/Organization/OrganizationInfo";
import EditOrganization from "./Pages/Organization/EditOrganization";
import CreateFacility from "./Pages/Facility/CreateFacility";
import UpdateFacility from "./Pages/Facility/EditFacility";
import ViewFacility from "./Pages/Facility/ViewFacility";
import Pricelist from "./Pages/Services/pricelist";
import PricelistUpload from "./Pages/Services/PricelistUpload";
import PricelistEditpage from "./Pages/Services/pricelisteditpage";
import Pricelistlandingpage from "./Pages/Services/pricelistlandingpage";
import Servicelandingpage from "./Pages/Services/servicelandpage";
import ServiceViewPage from "./Pages/Services/serviceview";
import ServiceEditpage from "./Pages/Services/ServiceEditpage";
import PricelistthroFacility from "./Pages/Services/pricelistthrofacility";
import PricelistUploadthroFacility from "./Pages/Services/PricelistUploadthrofacility";

import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import ProviderLandingPage from "./Pages/Landingpage";

import Searchone from "./Pages/Searchone";
import Searchtwo from "./Pages/Searchtwo";

interface Route {
  key: string;
  title?: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
}

export const routes: Array<Route> = [
  {
    key: "patient",
    title: "Patient",
    path: "/patient",
    enabled: true,
    component: Patient,
  },
  {
    key: "provider",
    title: "Provider",
    path: "/login",
    enabled: true,
    component: Login,
  },
  {
    key: "payer",
    title: "Payer",
    path: "/payer",
    enabled: true,
    component: Payer,
  },
  {
    key: "contact",
    title: "Contact",
    path: "/contact",
    enabled: true,
    component: Contact,
  },
];

export const login: Array<Route> = [
  {
    key: "home",
    path: "/",
    enabled: true,
    component: Home,
  },
  {
    key: "login",
    path: "/login",
    enabled: true,
    component: Login,
  },
  {
    key: "signup",
    path: "/signup",
    enabled: true,
    component: Signup,
  },
  // {
  //   key: "contact",
  //   title: "Contact",
  //   path: "/contact",
  //   enabled: true,
  //   component: Contact,
  // }
];

export const routespages: Array<Route> = [
  {
    key: "patient",
    title: "Patient",
    path: "/patient",
    enabled: true,
    component: Patient,
  },
  {
    key: "provider",
    title: "Provider",
    path: "/provider",
    enabled: true,
    component: Provider,
  },
  {
    key: "payer",
    title: "Payer",
    path: "/payer",
    enabled: true,
    component: Payer,
  },
  // {
  //   key: "contact",
  //   title: "Contact",
  //   path: "/contact",
  //   enabled: true,
  //   component: Contact,
  // },
  {
    key: "providerorg",
    title: "providerOrg",
    path: "/providerlanding",
    enabled: true,
    component: ProviderLandingPage,
  },

  {
    key: "org",
    title: "Org",
    path: "/org",
    enabled: true,
    component: OrganizationInfo,
  },
  {
    key: "editorg",
    title: "editOrg",
    path: "/editOrg",
    enabled: true,
    component: EditOrganization,
  },
  {
    key: "viewFacility",
    title: "Facility",
    path: "/facility",
    enabled: true,
    component: ViewFacility,
  },
  {
    key: "createFacility",
    title: "Facility",
    path: "/addFacility",
    enabled: true,
    component: CreateFacility,
  },
  {
    key: "updateFacility",
    title: "Facility",
    path: "/update",
    enabled: true,
    component: UpdateFacility,
  },
  {
    key: "pricelist",
    title: "Pricelist",
    path: "/pricelist",
    enabled: true,
    component: Pricelist,
  },
  {
    key: "pricelistupload",
    title: "PricelistUpload",
    path: "/PricelistUpload",
    enabled: true,
    component: PricelistUpload,
  },
  {
    key: "pricelistedit",
    title: "Pricelistedit",
    path: "/pricelistedit",
    enabled: true,
    component: PricelistEditpage,
  },
  {
    key: "pricelistlanding",
    title: "Pricelistlanding",
    path: "/pricelistlanding",
    enabled: true,
    component: Pricelistlandingpage,
  },
  {
    key: "servicelanding",
    title: "Servicelanding",
    path: "/servicelanding",
    enabled: true,
    component: Servicelandingpage,
  },
  {
    key: "serviceview",
    title: "Serviceview",
    path: "/serviceview",
    enabled: true,
    component: ServiceViewPage,
  },
  {
    key: "serviceedit",
    title: "ServiceEdit",
    path: "/ServiceEditPage",
    enabled: true,
    component: ServiceEditpage,
  },
  {
    key: "pricelistthrofacility",
    title: "Pricelistthrofacility",
    path: "/pricelistthrofacility",
    enabled: true,
    component: PricelistthroFacility,
  },
  {
    key: "pricelistuploadthrofacility",
    title: "PricelistUploadthroFacility",
    path: "/PricelistUploadthrofacility",
    enabled: true,
    component: PricelistUploadthroFacility,
  },
  {
    key: "searchone",
    title: "Searchone",
    path: "/searchone",
    enabled: true,
    component: Searchone,
  },
  {
    key: "searchtwo",
    title: "Searchtwo",
    path: "/searchtwo",
    enabled: true,
    component: Searchtwo,
  },
];