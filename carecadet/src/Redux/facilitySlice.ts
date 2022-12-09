import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface Ifacility {
    fData: any;
}
const initialState: Ifacility = {
    fData: {}
};

export const facilitySlice = createSlice({
    name: 'facilitydata',
    initialState,
    reducers: {
        facilityInfo: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                fData: action.payload
            }
        },  
     },
});


export const { facilityInfo } = facilitySlice.actions;
export const facilityReducer = facilitySlice.reducer;