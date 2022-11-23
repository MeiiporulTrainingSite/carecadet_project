//pages
import Patient from "./Pages/Patient";
import Provider from "./Pages/Provider";
import Payer from "./Pages/Payer";
import Contact from './Pages/Contact';


// other
import {FC} from "react";
import OrganizationInfo from "./Pages/OrganizationInfo";

interface Route {
  key: string,
  title: string,
  path: string,
  enabled: boolean,
  component: FC<{}>
}

export const routes: Array<Route> = [
  {
      key: 'patient',
      title: 'Patient',
      path: '/patient',
      enabled: true,
      component: Patient
  },
  {
      key: 'provider',
      title: 'Provider',
      path: '/provider',
      enabled: true,
      component: Provider
  },
  {
      key: 'payer',
      title: 'Payer',
      path: '/payer',
      enabled: true,
      component: Payer
  },
  {
      key: 'contact',
      title: 'Contact',
      path: '/contact',
      enabled: true,
      component: Contact
  },
  {
    key: 'org',
    title: 'Org',
    path: '/org',
    enabled: true,
    component: OrganizationInfo
},
  
]
