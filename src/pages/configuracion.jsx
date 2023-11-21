import PageTitle from "../components/PageTitle/PageTitle"
import PageSubTitle from "../components/PageSubTitle/PageSubTitle"
import CelesteButton from "../components/Buttons/CelesteButton/CelesteButton"
import { useEffect, useState, useRef } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Configuracion(){

    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");

    const [siro, setSiro] = useState({})
    const [gmail, setGmail] = useState({})

    const usuarioSiroRef = useRef()
    const passwordSiroRef = useRef()
    const usuarioGmailRef = useRef()
    const passwordGmailRef = useRef()
    const passwordRef = useRef()

    useEffect(() => {
        getSiro()
        getGmail()
    }, [])

    async function getSiro(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        }
        const response = await fetch('https://rl6ffmie96.execute-api.us-east-1.amazonaws.com/production/api/v1/siro?id_user='+ id, options)
        const data = await response.json()
        setSiro(data)
    }


    async function getGmail(){
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            }
        }
        const response = await fetch('https://rl6ffmie96.execute-api.us-east-1.amazonaws.com/production/api/v1/gmail?id_user=' + id, options)
        const data = await response.json()
        setGmail(data)
        if (response.ok) {
        }
    }

    async function guardarSiro(){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                idSiro: siro.idSiro,
                usuario: usuarioSiroRef.current.value,
                password: passwordSiroRef.current.value
            })
        }
        const response = await fetch('https://rl6ffmie96.execute-api.us-east-1.amazonaws.com/production/api/v1/siro', options)
        if (response.ok) {
            toast.success('Credenciales actualizadas con exito');
        }
    }


    async function guardarGmail(){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                email: usuarioGmailRef.current.value,
                password: passwordGmailRef.current.value
            })
        }
        const response = await fetch('https://rl6ffmie96.execute-api.us-east-1.amazonaws.com/production/api/v1/gmail', options)
        if (response.ok) {
            toast.success('Credenciales actualizadas con exito');
        }
    }

    async function updatePassword(){
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                id:id,
                password: passwordRef.current.value
            })
        }
        const response = await fetch('http://54.89.184.151:8080/api/v1/user', options)
        if (response.ok) {
            toast.success('Contraseña actualizada con exito');
        }
    }


    return(
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
   
        <div className="w-full flex flex-col pb-10">
            <PageTitle text="Configuracion" />

            <div className="flex flex-col space-y-8">
                <div>
                    <PageSubTitle texto={"SIRO"}/>
                    <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0  sm:space-x-8">
                        <div>
                            <p className="text-gray-300 ">Usuario</p>
                            <input ref={usuarioSiroRef} defaultValue={siro?.usuario} className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />   
                        </div>
                        <div>
                            <p className="text-gray-300 ">Contraseña</p>
                            <input ref={passwordSiroRef} defaultValue={siro?.password} className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />   
                        </div>
                        <div className="flex items-end justify-start sm:justify-end">
                            <CelesteButton texto={"Guardar Siro"} accion={guardarSiro}/>
                        </div>
                    </div>
                </div>
               
                <div>
                    <PageSubTitle texto={"GMAIL"}/>
                    <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0  sm:space-x-8">
                        <div>
                            <p className="text-gray-300 ">Usuario</p>
                            <input ref={usuarioGmailRef} defaultValue={gmail?.email} className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />   
                        </div>
                        <div>
                            <p className="text-gray-300 ">Contraseña</p>
                            <input ref={passwordGmailRef} defaultValue={gmail?.password} className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />   
                        </div>
                        <div className="flex items-end justify-start sm:justify-end">
                            <CelesteButton texto={"Guardar gmail"} accion={guardarGmail}/>
                        </div>
                    </div>
                </div>

                <div>
                    <PageSubTitle texto={"Cuenta"}/>
                    <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0  sm:space-x-8">
                        <div>
                            <p className="text-gray-300 ">Contraseña</p>
                            <input ref={passwordRef} className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />   
                        </div>
                        <div className="flex items-end justify-start sm:justify-end">
                            <CelesteButton texto={"Guardar Contraseña"} accion={updatePassword}/>
                        </div>
                    </div>
                </div>
                

            </div>
        </div>
        </>
    )
}