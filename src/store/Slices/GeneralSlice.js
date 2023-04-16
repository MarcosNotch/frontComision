import { createSlice } from "@reduxjs/toolkit";


export const generalSlice = createSlice({
    name: "general",
    initialState: {
        moverMain: false,
        actulizarListaClientes: false,
        actualizarCierresDeCaja: false,
        actualizarMovCaja: false,
        actualizarCostosMensuales: false,
        actualizarGastosFees: false,
        saldoPatrimonio: 0
    },
    reducers: {
        setMoverMain: (state, action) => {
            state.moverMain = !state.moverMain;
        },
        setActualizarListaClientes: (state, action) => {
            state.actulizarListaClientes = !state.actulizarListaClientes;
        },
        setActualizarCierresDeCaja: (state, action) => {
            state.actualizarCierresDeCaja = !state.actualizarCierresDeCaja;
        },
        setActualizarMovDolares: (state, action) => {
            state.actualizarMovDolares = !state.actualizarMovDolares;
        },
        setActualizarCostosMensuales: (state, action) => {
            state.actualizarCostosMensuales = !state.actualizarCostosMensuales;
        },
        setActualizarGastosFees: (state, action) => {
            state.actualizarGastosFees = !state.actualizarGastosFees;
        },
        setSaldoPatrimonio: (state, action) => {
            state.saldoPatrimonio = action.payload;
        } 
    }
});

export const { setMoverMain, setActualizarListaClientes, setActualizarCierresDeCaja,
     setActualizarMovDolares,setActualizarCostosMensuales, setActualizarGastosFees,
    setSaldoPatrimonio } = generalSlice.actions;

export const selectMoverMain = state => state.general.moverMain;
export const selectActualizarListaClientes = state => state.general.actulizarListaClientes;
export const selectActualizarCierresDeCaja = state => state.general.actualizarCierresDeCaja;
export const selectActualizarMovDolares = state => state.general.actualizarMovDolares;
export const selectActualizarCostosMensuales = state => state.general.actualizarCostosMensuales;
export const selectActualizarGastosFees = state => state.general.actualizarGastosFees;
export const selectSaldoPatrimonio = state => state.general.saldoPatrimonio;

export default generalSlice.reducer;
