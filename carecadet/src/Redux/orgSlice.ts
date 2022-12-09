import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./Store";

import Cookies from "js-cookie";

// Define a type for the slice state
interface CounterState {
  orgEditData: any;
}

// Define the initial state using that type
const initialState: CounterState = {
  orgEditData: {},
};

export const editSlice = createSlice({
  name: "edit",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    organizationEdit: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        orgEditData: action.payload,
      };
    },
  },
});

export const { organizationEdit } = editSlice.actions;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.auth.login.token

export default editSlice.reducer;
