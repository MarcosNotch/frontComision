import PageSubTitle from "../PageSubTitle/PageSubTitle"
import { useState, useRef } from "react"
import CelesteButton from "../Buttons/CelesteButton/CelesteButton";
import PageTitle from "../PageTitle/PageTitle";

export default function GenerarCuponIndividual() {

    const nroAdherenteRef = useRef(null)
    const anioRef = useRef(null)
    const mesRef = useRef(null)
    const [selectedOption, setSelectedOption] = useState('1');
    const token = sessionStorage.getItem("token");


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    async function GenerarCuponIndividual(){
        const nroAdherente = nroAdherenteRef.current.value
        const idTipoCupon = selectedOption
        const anio = anioRef.current.value
        const mes = selectedOption
        const data = [{
            nroAdherente,
            idTipoCupon,
            mes,
            anio
        }]

        const response = await fetch('http://localhost:8080/api/v1/cupones/cuponIndividual', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documento.pdf';
        a.click();
        window.URL.revokeObjectURL(url);

    }


    return (

        <div>
            <PageTitle text="Generar Cupones individuales" />
            <div className="flex flex-col space-y-8">
                <div className="flex space-x-8">
                    <div className="flex flex-col space-y-2 items-start">
                        <span className="text-gray-300  text-center">Nro de Adherente</span>
                        <input ref={nroAdherenteRef} type="number" className="rounded-sm px-2 w-40 h-8 bg-azul2 text-gray-300 font-poppins border-b border-gray-500 focus:outline-none focus:border-white" />
                    </div>
                    <div className="flex flex-col space-y-2 items-start">
                        <span className="text-gray-300  text-center">Tipo de cupon</span>
                        <select className="rounded-sm px-2 w-40 h-8 bg-azul2 text-gray-300 font-poppins border-b border-gray-500 focus:outline-none focus:border-white" onChange={handleOptionChange} value={selectedOption}>
                            <option value="1">Cuota normal</option>
                            <option value="2">Moratoria/Deuda</option>
                        </select>
                    </div>
                </div>
                <div className="flex space-x-8">


                    <div className="flex flex-col space-y-2 items-start">
                        <span className="text-gray-300  text-center">Año</span>
                        <input ref={anioRef} type="number" className="rounded-sm px-2 w-40 h-8 bg-azul2 text-gray-300 font-poppins border-b border-gray-500 focus:outline-none focus:border-white" />
                    </div>
                    <div className="flex flex-col space-y-2 items-start">
                        <span className="text-gray-300  text-center">Mes</span>
                        <select className="rounded-sm px-2 w-40 h-8 bg-azul2 text-gray-300 font-poppins border-b border-gray-500 focus:outline-none focus:border-white" onChange={handleOptionChange} value={selectedOption}>
                            <option value="1">Enero</option>
                            <option value="2">Febrero</option>
                            <option value="3">Marzo</option>
                            <option value="4">Abril</option>
                            <option value="5">Mayo</option>
                            <option value="6">Junio</option>
                            <option value="7">Julio</option>
                            <option value="8">Agosto</option>
                            <option value="9">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                        </select>
                    </div>

                    <div className="mt-7">
                        <CelesteButton texto={"Generar Cupon"} accion={GenerarCuponIndividual} />
                    </div>
                </div>
            </div>
        </div>
    )








}