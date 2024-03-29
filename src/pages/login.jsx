import { Link } from "react-router-dom"
import BlueButton from "../components/Buttons/BlueButton/BlueButton"
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import usePost from "../hooks/usePost";

export default function Login() {

    const {post} = usePost()
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false)


    const iniciarSesion = (e) => {
        e.preventDefault();

        !emailRef.current.value ? setErrorEmail(true) : setErrorEmail(false)
        !passwordRef.current.value ? setErrorPassword(true) : setErrorPassword(false)

        if (emailRef.current.value && passwordRef.current.value) {

            signIn()
        }

    }


    async function signIn() {
        const username = emailRef.current.value;
        const password = passwordRef.current.value;
        try {
            const response  = await post("https://rl6ffmie96.execute-api.us-east-1.amazonaws.com/production/api/v1/auth/authenticate", { email:username , password })
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("id", response.id);

            if (response.id === 4){
                sessionStorage.setItem("idZona", 2)
            }else{
                sessionStorage.setItem("idZona", response.id)
            }

            navigate("/")
            
        } catch (error) {
            console.log('error signing in', error);
        }
    }


    return (
        <div className="mx-auto max-w-screen-lg h-full px-10">
            <div className=" h-full flex items-center justify-center flex-col">
                <form onSubmit={iniciarSesion} className="w-full  sm:w-[580px] h-96 sm:h-[480px] sm:bg-azul2 rounded-md flex flex-col items-center px-10 py-7 justify-between">
                    <div className="flex items-center">
                    <div className="flex items-center sm:mb-4 max-sm:mb-8">
                        <img src={require("../imgs/fotoblanca.png")} className="w-64" alt="" />
                    </div>
                     

                    </div>
                    <div className="w-full">
                        <div className="flex flex-col space-y-2 mb-4">
                            <span className="text-gray-300 text-sm">Usuario</span>
                            <input type="text" ref={emailRef} className="outline-none px-2 bg-azul2 border border-gris1 text-gray-300 p-4 rounded-md h-10 text-sm" placeholder="Ingrese su usuario" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <span className="text-gray-300 text-sm">Contraseña</span>
                            <input type="password" ref={passwordRef} className="outline-none px-2 bg-azul2 border border-gray-400 text-gray-300 p-4 rounded-md h-10 text-sm" placeholder="Ingrese su constraseña" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <span className="text-azul4 text-xs">¿Olvido su constraseña?</span>
                        </div>
                    </div>
                    <div className="">
                        <BlueButton texto="Iniciar Sesión" />
                    </div>
                </form>
            </div>
        </div>
    )


}