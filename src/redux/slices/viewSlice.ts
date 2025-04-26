import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ViewType from "../../interfaces/View";
import { RootState } from "../store";

interface View {
	value: ViewType;
}

const initialState: View = {
	value: 'grid',
};

const viewSlice = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<ViewType>) => {
			state.value = action.payload;
		},
    }
});

export const {
    setView,
} = viewSlice.actions;
export const selectView = (state: RootState) => state.view.value;
export default viewSlice.reducer;