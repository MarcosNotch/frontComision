import PageTitle from "../components/PageTitle/PageTitle"
import DatePicker from "react-datepicker";
import CelesteButton from "../components/Buttons/CelesteButton/CelesteButton";
import { useRef, useState, useMemo, useEffect } from "react";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DetalleDeDeuda from "../components/detalleDeDeuda/DetalleDeDeuda";

export default function Deudas(){

    const filtroNroAdherente = useRef()

    var firstDayOfTheMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const lastDay = new Date();
    const [startDateMov1, setStartDateMov1] = useState(firstDayOfTheMonth);
    const [startDateMov2, setStartDateMov2] = useState(lastDay);
    const [totalRows, setTotalRows] = useState(0)
    const [deudas, setDeudas] = useState([])
    const [loading, setLoading] = useState(false)
    const [valorFiltroNroAdherente, setValorFiltroNroAdherente] = useState(null)
    const [pagina, setPagina] = useState(1)
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();
    const anioRef = useRef();
    const idZona = sessionStorage.getItem("idZona")

    const hasNext = pagina < totalRows - 1

    function buscarCliente(e) {
        e.preventDefault()
        setValorFiltroNroAdherente(filtroNroAdherente.current.value)
    }

    async function exportarReporte(e){
        e.preventDefault()
        console.log(anioRef.current.value)
        if (anioRef.current.value === null || anioRef.current.value === "" ){
            toast.error("Error debe ingresar un año");
            return
        }

        const toastId = toast.loading("Generando reporte de deudas...")
        const options =
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        }

        const response = await fetch(`https://rl6ffmie96.execute-api.us-east-1.amazonaws.com/production/api/v1/pagos/descargarExcel?idZona=${idZona}&year=${anioRef.current.value}`, options)
        
        toast.update(toastId, { render: "Reporte Generado con Exito!", type: "success", isLoading: false,
        hideProgressBar:false, autoClose:3000 });

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'deudas.xls';
        a.click();
        window.URL.revokeObjectURL(url);
    }


        useEffect(() => {

            async function obtenerPagos() {
                const abortCont = new AbortController();
                const signal = abortCont.signal;
                setLoading(true)
    
                try {
                    const options =
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        }
                    }

                    const response = await fetch(`https://rl6ffmie96.execute-api.us-east-1.amazonaws.com/production/api/v1/deudas/deudaVecinal?&pageNum=${pagina}${valorFiltroNroAdherente ? `&nroAdherente=${valorFiltroNroAdherente}` : ''}&fechaDesde=${dayjs(startDateMov1).format('YYYY-MM-DD')}&fechaHasta=${dayjs(startDateMov2).format('YYYY-MM-DD')}`, options)
    
                    if (!response.ok && response.status == "403") {
                        navigate("/login")
                    }
                  
                    const data = await response.json()
             
                    setDeudas(data.deudas)
                    setTotalRows(data.paginas)
                 
                    setLoading(false)
                } catch (e) {
                    if (!signal.aborted) {
                        setDeudas([]);
                    }
                } finally {
                    if (!signal.aborted) {
                        setLoading(false);
                    }
                }
    
            }
    
            obtenerPagos()
    
        }, [pagina, startDateMov1, startDateMov2, valorFiltroNroAdherente])


    const hasPrev = pagina > 1
    const disabledPrev = !hasPrev || loading
    const disabledNext = !hasNext || loading

    const next = () => {
        setPagina(pagina + 1)
    }

    const prev = () => {
        setPagina(pagina - 1)
    }

    const columns = useMemo(
        () => [
            {
                Header: 'Nro Adherente',
                accessor: 'nroAdherente',
            },
            {
                Header: 'Cuotas adheudadas',
                accessor: 'ctd',
            },
            {
                Header: 'Total adeudado',
                accessor: 'total',
            }
        ],
        []
    )

    const tableInstance = useTable({ columns, data: deudas })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance
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
                
            <div className="w-full flex flex-col pb-10">
            <PageTitle text="Deudas" />
            <form onSubmit={buscarCliente} className="flex flex-col lg:space-y-0 space-y-4 sm:flex-row flex-wrap space-x-4 items-start justify-start mb-4">
            <div className="flex flex-col space-y-1 items-start">
                <p className="text-gray-300 ">Número de Adherente</p>
                <input ref={filtroNroAdherente} className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />
            </div>
            <div className="flex space-x-0 sm:space-x-8 space-y-4 sm:space-y-0 sm:flex-row flex-col ">
                <div className="flex flex-col space-y-1 items-start">
                    <p className="text-gray-300 ">Pagos Desde</p>
                    <DatePicker className="relative rounded-sm bg-azul2 w-32 outline-none px-2 h-10 text-gray-300 border border-gray-400" dateFormat={"dd/MM/yyyy"} selected={startDateMov1} onChange={(date) => setStartDateMov1(date)} />
                </div>
                <div className="flex flex-col space-y-1 items-start">
                    <p className="text-gray-300 ">Pagos Hasta</p>
                    <DatePicker className="relative rounded-sm bg-azul2 w-32 outline-none px-2 h-10 text-gray-300 border border-gray-400" dateFormat={"dd/MM/yyyy"} selected={startDateMov2} onChange={(date) => setStartDateMov2(date)} />
                </div>
            </div>
            <div className="flex flex-col space-y-1 items-start">
                <div className="mt-6">
                </div>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <CelesteButton texto={"Buscar Vecino"} />
                    <input placeholder="Año " ref={anioRef} className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="number" name="" />
                    <CelesteButton texto={"Exportar Excel"} accion={exportarReporte}/>
                </div>
              
            </div>
        </form>
        <div className="w-full overflow-x-auto mb-8">
                <table className="w-full max-sm:w-[700px]  sm:min-w-[830px] bg-azul2 flex flex-col rounded-sm" id="my-table2">

                    <thead className="h-20 w-full flex  items-center border-b border-gray-400">
                        {
                            tableInstance.headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="w-full flex items-center justify-center">
                                    {
                                        headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()} className="flex items-center justify-center w-1/3">
                                                <p className="text-gray-300">{column.render('Header')}</p>
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody>
                        {
                            tableInstance.rows.map((row) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()} className="h-14 w-full flex  items-center border-b border-gray-400">
                                        {
                                            row.cells.map((cell) => {
                                                return (
                                                    <td {...cell.getCellProps()} className="w-1/3 flex items-center justify-center hover:cursor-pointer" >
                                                        <p className="text-gray-300 text-sm ">{cell.render('Cell')}</p>
                                                    </td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                    <div className="h-16 w-full flex  items-center">
                        <div className="w-full flex-grow">

                        </div>
                        <button
                            className={`${disabledPrev
                                ? 'bg-orange-500 opacity-50 cursor-not-allowed'
                                : 'bg-orange-500 hover:bg-orange-400'
                                } shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
                            disabled={disabledPrev}
                            onClick={prev}
                        >

                            <span>Atras</span>
                        </button>
                        <button

                            className={`${disabledNext
                                ? 'bg-orange-500 opacity-50 cursor-not-allowed'
                                : 'bg-orange-500 hover:bg-orange-400'
                                } shadow focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
                            disabled={disabledNext}
                            onClick={next}
                        >
                            <span>Siguiente</span>

                        </button>


                    </div>
                </table>
            </div>
            {
                valorFiltroNroAdherente &&
                <DetalleDeDeuda nroAdherente={valorFiltroNroAdherente} fechaDesde={dayjs(startDateMov1).format('YYYY-MM-DD')} fechaHasta={dayjs(startDateMov2).format('YYYY-MM-DD')}/>
            }
            </div>
        </>
        
    )






}
