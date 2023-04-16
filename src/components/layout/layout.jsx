import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { useSelector } from "react-redux";
import { selectMoverMain } from "../../store/Slices/GeneralSlice";

export default function Layout(){

    const moverMain = useSelector(selectMoverMain)

    return(
        <>
            <Header />
            <main className={` ease-in-out duration-300 sm:pr-10 max-sm:px-6 pt-8  ${moverMain ? 'sm:ml-10' : 'sm:ml-64' } mt-20`}>
                <Outlet />
            </main>
        </>
    )
}