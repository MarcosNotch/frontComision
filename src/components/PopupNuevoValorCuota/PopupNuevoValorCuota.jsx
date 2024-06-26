import PopupLayout from "../PopupLayout/PopupLayout"
import AcceptButton from "../Buttons/AcceptButton/AcceptButton"
import CancelButton from "../Buttons/CancelButton/CancelButton"
import { useRef } from "react"
import dayjs from "dayjs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PopupNuevoValorCuota({ setAbrirModal, setActualizar }) {

    const primerValor = useRef(null)
    const segundoValor = useRef(null)
    const tercerValor = useRef(null)
    const idZona = sessionStorage.getItem("idZona")

    async function aceptar(e) {

        e.preventDefault()

        if (primerValor.current.value == "" || primerValor.current.value == null ||
            segundoValor.current.value == "" || segundoValor.current.value == null
            || tercerValor.current.value == "" || tercerValor.current.value == null
        ) {
            toast.error("Error! Complete todos los valores");
            return
        }

    
        const token = sessionStorage.getItem("token");
        const options =
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "fechaDesde": dayjs(new Date()).format('YYYY-MM-DD'),
                "primerValor": primerValor.current.value,
                "segundoValor": segundoValor.current.value,
                "tercerValor": tercerValor.current.value,
                "idZona": idZona
            })
        }

        const response = await fetch(`https://rl6ffmie96.execute-api.us-east-1.amazonaws.com/production/api/v1/valorCuota`, options)

        if (response.ok) {
            setActualizar(e => !e)
            cancelar()
        }



    }

    function cancelar() {
        setAbrirModal(false)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            <PopupLayout>

                <form className="fixed py-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-azul2 max-sm:w-80  w-[500px] h-[390px] sm:h-[390px] rounded-sm">
                    <div className="flex items-center justify-center border-b border-gray-500 py-2">
                        <h1 className="text-white text-2xl font-medium">Nuevo valor de cuota</h1>
                    </div>
                    <div className="flex my-6 flex-col w-full px-8 space-y-8">
                        <div className="flex flex-col space-y-2 items-start">
                            <span className="text-white text-center">Primer valor</span>
                            <input ref={primerValor} type="number" className="w-full bg-azul2 text-white border-b border-gray-500 focus:outline-none focus:border-white" />
                        </div>
                        <div className="flex flex-col space-y-2 items-start">
                            <span className="text-white text-center">Segundo valor</span>
                            <input ref={segundoValor} type="number" className="w-full bg-azul2 text-white border-b border-gray-500 focus:outline-none focus:border-white" />
                        </div>
                        <div className="flex flex-col space-y-2 items-start">
                            <span className="text-white text-center">Tercer valor</span>
                            <input ref={tercerValor} type="number" className="w-full bg-azul2 text-white border-b border-gray-500 focus:outline-none focus:border-white" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center space-x-4 mt-2">
                        <AcceptButton texto="Aceptar" accion={aceptar} />
                        <CancelButton texto="Cancelar" accion={cancelar} />
                    </div>
                </form>

            </PopupLayout>

        </>
    )






}