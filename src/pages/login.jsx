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
            const response  = await post("http://localhost:8080/api/v1/auth/authenticate", { email:username , password })
            console.log(response)
            sessionStorage.setItem("token", response.token);
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
                        <div className="w-16 h-16 flex items-center space-x-4">
                            <img className="object-contain" src="https://lithiumlandingpage.netlify.app/assets/images/whatsapp-image-2022-04-04-at-3.17.41-pm-removebg-preview-1-80x80.png" />
                        </div>
                        <div>
                            <h1 className="text-white font-semibold text-3xl">LITHIUM</h1>
                        </div>

                    </div>
                    <div className="w-full">
                        <div className="flex flex-col space-y-2 mb-4">
                            <span className="text-gray-300 text-sm">Email</span>
                            <input type="text" ref={emailRef} className="outline-none px-2 bg-azul2 border border-gris1 text-gray-300 p-4 rounded-md h-10 text-sm" placeholder="Ingrese su email" />
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