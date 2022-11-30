import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Loginstate {
  isProcessingRequest: boolean;
  accessToken?: string;
  info: any

}
const initialState: Loginstate = {
  isProcessingRequest: false,
  info: {
    userName: "",
    userID: "",
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
    token: "",
    refreshToken: ""
  }
};

export const loginSlice = createSlice({
  name: 'loginstate',
  initialState,
  reducers: {
    logininfo: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        info: action.payload
      }
    }

  },
});

export const { logininfo } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
