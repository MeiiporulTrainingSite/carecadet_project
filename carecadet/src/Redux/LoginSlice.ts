import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./Store";

import Cookies from "js-cookie";

// Define a type for the slice state
interface CounterState {
  login: any;
  pageUser: string;
  logoutButton: boolean;
  orgEditData:any
}

// Define the initial state using that type
const initialState: CounterState = {
  login: {},
  pageUser: "",
  logoutButton: false,
  orgEditData:{}
};

export const loginSlice = createSlice({
  name: "login",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    refresh: (state) => {
      const userToken = Cookies.get("token");
      const userPage = localStorage.getItem("pageUserType");
      let token = "";
      let pageType = "";
      if (typeof userToken === "string") {
        token = JSON.parse(userToken); // ok
        console.log(token);
      }
      if (typeof userPage === "string") {
        pageType = userPage; // ok
        console.log(pageType);
      }
      if (token !== null || undefined) {
        return {
          ...state,
          login: token,
          pageUser: pageType,
        };
      }
    },
    pageUser: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        pageUser: action.payload,
      };
    },
    storeLoginInfo: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        login: action.payload,
      };
    },
    logoutButton: (state) => {
      return {
        ...state,
        logoutButton: false,
      };
    },
    loginButton: (state) => {
      return {
        ...state,
        logoutButton: true,
      };
    },
    organizationEdit:(state,action:PayloadAction<any>)=>{
      return {
        ...state,
        orgEditData:action.payload
      }
    }
  },
});

export const { storeLoginInfo, refresh, pageUser, logoutButton, loginButton,organizationEdit } =
  loginSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.login.token

export default loginSlice.reducer;
