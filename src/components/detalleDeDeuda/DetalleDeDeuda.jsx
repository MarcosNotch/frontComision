import PageSubTitle from "../PageSubTitle/PageSubTitle"
import { useRef, useState, useMemo, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";

export default function DetalleDeDeuda({nroAdherente, fechaDesde, fechaHasta}){

    const [pagina, setPagina] = useState(0)
    const [totalRows, setTotalRows] = useState(0)
    const [loading, setLoading] = useState(false)
    const [detalleDeudas, setDetalleDeudas] = useState([])
    const token = sessionStorage.getItem("token")
    const navigate = useNavigate();


    useEffect(() => {
        async function obtenerDetalle(){
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
            
                    const response = await fetch(`https://rl6ffmie96.execute-api.us-east-1.amazonaws.com/production/api/v1/deudas/periodosAdeudados?${nroAdherente ? `&nroAdherente=${nroAdherente}` : ''}`, options)
    
                    if (!response.ok && response.status == "403") {
                        navigate("/login")
                    }
    
                    const data = await response.json()
                    setDetalleDeudas(data)
                    setTotalRows(10)
                    setLoading(false)
                } catch (e) {
                    if (!signal.aborted) {
                        setDetalleDeudas([]);
                    }
                } finally {
                    if (!signal.aborted) {
                        setLoading(false);
                    }
                }
        }

        obtenerDetalle()
    }, [pagina, nroAdherente, fechaDesde, fechaHasta])


    const hasNext = pagina < totalRows - 1
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
                Header: 'Mes',
                accessor: 'mes',
            },
            {
                Header: 'Año',
                accessor: 'anio',
            },
            {
                Header: 'Total',
                accessor: 'total',
            }
        ],
        []
    )

    const tableInstance = useTable({ columns, data: detalleDeudas })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return(
        <>
            <div>
                <PageSubTitle texto="Detalle de deuda"/>
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
            </div>
        
        </>
    )


}