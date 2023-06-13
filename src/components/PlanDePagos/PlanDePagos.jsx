import PageSubTitle from "../PageSubTitle/PageSubTitle"
import CelesteButton from "../Buttons/CelesteButton/CelesteButton"
import { useState, useMemo, useEffect } from "react"
import { useTable } from "react-table";
import NuevoPlanDePagos from "../Popups/NuevoPlanDePagos/NuevoPlanDePagos";

export default function PlanDePagos(){
    const [loading, setLoading] = useState(false)
    const [pagina, setPagina] = useState(1)
    const [totalRows, setTotalRows] = useState(0)
    const hasNext = pagina < Math.ceil(totalRows / 10)
    const [pagos, setPagos] = useState([])
    const token = sessionStorage.getItem("token");

    const [abrirPopUp, setAbrirPopUp] = useState(false)
    
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
                Header: 'Cuotas',
                accessor: 'cantidadCuotas', // accessor is the "key" in the data
            },
            {
                Header: 'Valor',
                accessor: 'valorCuota',
            },
            {
                Header: 'Total',
                accessor: 'valorTotal',
            },
            {
                Header: 'Cuota 1',
                accessor: 'cuota1',
            },
            {
                Header: 'Cuota 2',
                accessor: 'cuota2',
            },
            {
                Header: 'Cuota 3',
                accessor: 'cuota3',
            },
        ],
        []
    )

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

                const response = await fetch(`http://54.89.184.151:8080/api/v1/planDePago?pageNum=${pagina}`, options)

                const data = await response.json()

                console.log(data)


                setPagos(data.planDePagos)
                setTotalRows(data.total)
                setLoading(false)
            } catch (e) {
                console.log(e)
                if (!signal.aborted) {
                    setPagos([]);
                }
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }

        }

        obtenerPagos()

    }, [pagina])

    const tableInstance = useTable({ columns, data: pagos })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (

        <div>
            <PageSubTitle texto="Plan de pagos para deudores" />

            <CelesteButton texto={"Nuevo Valor"} accion={() => setAbrirPopUp(true)}/>
            <div className="w-full overflow-x-auto mb-8">
                <table className="w-full max-sm:w-[700px]  sm:min-w-[830px] bg-azul2 flex flex-col rounded-sm" id="my-table2">

                    <thead className="h-20 w-full flex  items-center border-b border-gray-400">
                        {
                            tableInstance.headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="w-full flex items-center justify-center">
                                    {
                                        headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()} className="flex items-center justify-center w-1/5">
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
                                                    <td {...cell.getCellProps()} className="w-1/5 flex items-center justify-center hover:cursor-pointer" >
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
                {abrirPopUp &&
                    <NuevoPlanDePagos setAbrirModal={setAbrirPopUp} />
                }
        </div>



    )



}