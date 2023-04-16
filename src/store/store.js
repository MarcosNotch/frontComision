import { configureStore } from "@reduxjs/toolkit";
import GeneralSlice from "./Slices/GeneralSlice";

export default configureStore({
    reducer: {
        general: GeneralSlice,
    },
});
