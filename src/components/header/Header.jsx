import Categories from "../Categories/Categories"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setMoverMain } from "../../store/Slices/GeneralSlice"
import MenuButton from "../Buttons/MenuButton/MenuButton"

export default function Header() {

    const [abrirCategorias, setAbrirCategorias] = useState(false)
    const [menuAbierto, setMenuAbierto] = useState(false);
    const dispatch = useDispatch()

    const nombre = sessionStorage.getItem("user")



    const handleOnClick = () => {
  
       setMenuAbierto(!menuAbierto)
       dispatch(setMoverMain())
    }
    


    return (
        <>
            <header className="flex flex-col sm:flex-row z-20 fixed top-0 left-0 w-full bg-negro h-16 shadow-2xl" >
                <div className="w-full flex items-center justify-center p-3 sm:w-56 h-16 bg-negro flex-shrink-0 shadow-2xl">
                    <div className="w-14 h-14 flex items-center space-x-4">
                        <img className="object-contain" src="https://lithiumlandingpage.netlify.app/assets/images/whatsapp-image-2022-04-04-at-3.17.41-pm-removebg-preview-1-80x80.png" />
                    </div>  
                    <div>
                        <h1 className="text-white font-semibold text-2xl">Comisión</h1>
                    </div>
                    <div className="sm:hidden">
                     <MenuButton  abierto={menuAbierto} onClick={handleOnClick}/>
                    </div>
                    {/*<button className="ml-4 bg-slate-300  sm:hidden" onClick={handleOnClick}>
                        abrir Categrorias
                     </button>*/}
                    
                </div>
                <div className="bg-gris2 w-full items-center pl-4 pr-10 hidden sm:flex">
                  {/*  <button className="ml-4 bg-slate-300  " onClick={handleOnClick}>
                        abrir Categrorias
                    </button>*/}
                    <MenuButton  abierto={menuAbierto} onClick={handleOnClick}/>
                    
                    <div className="flex flex-grow ">

                    </div>
                    <div className="flex items-center justify-center space-x-8">
                        
                        <div className="flex items-center justify-center flex-shrink-0 space-x-2">
                    
                            <div>
                                <p className="text-gray-300 font-medium text-sm">{nombre}</p>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*<Categories abrir={abrirCategorias} />*/}
            <Categories  abrir={menuAbierto} />
          
           
        </>
    )

}