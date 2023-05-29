import PageTitle from "../components/PageTitle/PageTitle"
import PageSubTitle from "../components/PageSubTitle/PageSubTitle"
import CelesteButton from "../components/Buttons/CelesteButton/CelesteButton"

export default function Configuracion(){
    return(
        <div className="w-full flex flex-col pb-10">
            <PageTitle text="Configuracion" />

            <div className="flex flex-col space-y-8">
                <div>
                    <PageSubTitle texto={"SIRO"}/>
                    <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0  sm:space-x-8">
                        <div>
                            <p className="text-gray-300 ">Usuario</p>
                            <input className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />   
                        </div>
                        <div>
                            <p className="text-gray-300 ">Contraseña</p>
                            <input className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />   
                        </div>
                        <div className="flex items-end justify-start sm:justify-end">
                            <CelesteButton texto={"Guardar Siro"} />
                        </div>
                    </div>
                </div>
               
                <div>
                    <PageSubTitle texto={"GMAIL"}/>
                    <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0  sm:space-x-8">
                        <div>
                            <p className="text-gray-300 ">Usuario</p>
                            <input className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />   
                        </div>
                        <div>
                            <p className="text-gray-300 ">Contraseña</p>
                            <input className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />   
                        </div>
                        <div className="flex items-end justify-start sm:justify-end">
                            <CelesteButton texto={"Guardar gmail"} />
                        </div>
                    </div>
                </div>

                <div>
                    <PageSubTitle texto={"Cuenta"}/>
                    <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0  sm:space-x-8">
                        <div>
                            <p className="text-gray-300 ">Contraseña</p>
                            <input className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />   
                        </div>
                        <div className="flex items-end justify-start sm:justify-end">
                            <CelesteButton texto={"Guardar Contraseña"} />
                        </div>
                    </div>
                </div>
                

            </div>
        </div>
    )
}