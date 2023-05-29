import { Link } from "react-router-dom"
import { useState } from "react"
import PopupLayoutBlack from "../PopupLayoutBlack/PopupLayoutBlack"
import { useSelector } from "react-redux"
import { selectMoverMain } from "../../store/Slices/GeneralSlice"

export default function Categories({ abrir }) {

    const [abrirClientes, setAbrirClientes] = useState(false)
    const [abrirBanco, setAbrirBanco] = useState(false)
    const [abrirCaja, setAbrirCaja] = useState(false)

    const moverMain = useSelector(selectMoverMain)
    return (
        <>
            {moverMain &&
                <PopupLayoutBlack>
                </PopupLayoutBlack>}
            <div className={`w-56 h-full overflow-auto bg-azul2 z-30 fixed  top-16 ease-in-out duration-300 max-sm:-translate-x-60 ${abrir ? '-translate-x-60 max-sm:translate-x-0' : 'translate-x-0'}`}>
                <nav className="flex items-center justify-center pt-8 space-y-4">
                    <ul className="flex flex-col space-y-8">
                        <li>
                            <Link to="/" className="flex items-center space-x-2">
                            
                                <img src="https://img.icons8.com/ios-filled/32/FFFFFF/scales--v1.png" alt="CategoryIcon" />
                                <p className="hover:text-white text-gray-300 text-sm tracking-wide">Pagos y Deudas</p>
                            </Link>
                        </li>


                        <li>
                            <Link to="/vecinos" className="flex items-center space-x-2">
                                <img src="https://img.icons8.com/ios-filled/32/FFFFFF/cash-in-hand.png" alt="ExpensesIcon" />
                                <p className="hover:text-white text-gray-300 text-sm tracking-wide">Vecinos</p>
                            </Link>
                        </li>

                        <li>
                            <Link to="/cupones" className="flex items-center space-x-2">
                                <img src="https://img.icons8.com/ios-glyphs/30/FFFFFF/purchase-order.png" alt="ExpensesIcon" />
                                <p className="hover:text-white text-gray-300 text-sm tracking-wide">Cupones</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/configuracion" className="flex items-center space-x-2">
                                <img src="https://img.icons8.com/ios-filled/30/FFFFFF/settings.png" alt="ExpensesIcon" />
                                <p className="hover:text-white text-gray-300 text-sm tracking-wide">Configuracion</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

        </>
    )

}