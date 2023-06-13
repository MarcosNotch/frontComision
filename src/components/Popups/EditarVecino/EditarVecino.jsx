import PopupLayout from "../../PopupLayout/PopupLayout"
import AcceptButton from "../../Buttons/AcceptButton/AcceptButton"
import CancelButton from "../../Buttons/CancelButton/CancelButton"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"

export default function EditarVecino({ setAbrirModal, setActualizar, clienteAEditar }){

    const nombreTitularRef = useRef(null)
    const emailRef = useRef(null)
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate()


    async function aceptar(e){
        e.preventDefault()
        const vecino = {...clienteAEditar}

        vecino.titular = nombreTitularRef.current.value
        vecino.email = emailRef.current.value

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                ...vecino
                })
            }

            const response = await fetch('http://localhost:8080/api/v1/vecinos', options)

            if(response.status === 403){
                navigate("/login")
            }else{
                if (response.ok) {
                    setAbrirModal(false)
                    setActualizar(e => !e)
                }
            }
        }
    

    function cancelar() {
        setAbrirModal(false)
    }

    return (

        <PopupLayout>
            <form className="fixed pt-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-azul2 max-sm:w-80  w-[500px] pb-4 rounded-sm">
                <div className="flex items-center justify-center border-b border-gray-500 py-2">
                    <h1 className="text-white text-2xl font-medium">Editar Vecino</h1>
                </div>
                <div className="flex my-6 flex-col w-full px-8 space-y-8">
                    <div className="flex flex-col space-y-4 items-start justify-between">
                        <div className="flex w-full flex-col space-y-2 items-start">
                            <span className="text-white text-center font-medium">Nombre Titular</span>
                            <input ref={nombreTitularRef} defaultValue={clienteAEditar.titular}  className="w-full bg-azul2 text-white border-b border-gray-500 focus:outline-none focus:border-white" />
                        </div>
                        <div className="flex w-full flex-col space-y-2 items-start">
                            <span className="text-white text-center font-medium">Email</span>
                            <input ref={emailRef} defaultValue={clienteAEditar.email} className="w-full bg-azul2 text-white border-b border-gray-500 focus:outline-none focus:border-white" />
                        </div>
                    </div>
                  
                    
                </div>

                <div className="flex items-center justify-center space-x-4 mt-2">
                    <AcceptButton texto="Aceptar" accion={aceptar} />
                    <CancelButton texto="Cancelar" accion={cancelar} />
                </div>
            </form>
        </PopupLayout>

    )




}