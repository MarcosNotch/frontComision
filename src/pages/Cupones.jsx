import PageTitle from "../components/PageTitle/PageTitle"
import PageSubTitle from "../components/PageSubTitle/PageSubTitle"
import { useMemo, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import CelesteButton from "../components/Buttons/CelesteButton/CelesteButton";
import PopupNuevoValorCuota from "../components/PopupNuevoValorCuota/PopupNuevoValorCuota";
import EstadoCupones from "../components/EstadoDeCupones/EstadoCupones";

export default function Cupones(){
    const [loading, setLoading] = useState(false)
    const [pagina, setPagina] = useState(1)
    const [totalRows, setTotalRows] = useState(0)

    const [actualizar, setActualizar] = useState(false)

    const hasNext = pagina < Math.ceil(totalRows / 10)
    const navigate = useNavigate();
    const [pagos, setPagos] = useState([])
    const token = sessionStorage.getItem("token");
    const idZona = sessionStorage.getItem("idZona")
    const [abrirPopupNuevoValorCuota, setAbrirPopupNuevoValorCuota] = useState(false)

    const hasPrev = pagina > 1
    const disabledPrev = !hasPrev || loading
    const disabledNext = !hasNext || loading

    const next = () => {
        setPagina(pagina + 1)
    }

    const prev = () => {
        setPagina(pagina - 1)
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

                const response = await fetch(`https://rl6ffmie96.execute-api.us-east-1.amazonaws.com/production/api/v1/valorCuota?pageNum=${pagina}&idZona=${idZona}`, options)


                if (!response.ok && response.status == "403") {
                    navigate("/login")
                }

                const data = await response.json()

                setPagos(data.valores)
                setTotalRows(data.total)
                setLoading(false)
            } catch (e) {
      
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

    }, [pagina, actualizar])


    const columns = useMemo(
        () => [
            {
                Header: 'Desde',
                accessor: 'fechaDesde', // accessor is the "key" in the data
            },
            {
                Header: 'Hasta',
                accessor: 'fechaHasta',
            },
            {
                Header: 'Monto',
                accessor: 'primerValor',
            },
            {
                Header: 'Segundo Vencimiento',
                accessor: 'segundoValor',
            },
            {
                Header: 'Tercer Vencimiento',
                accessor: 'tercerValor',
            },
        ],
        []
    )

    const tableInstance = useTable({ columns, data: pagos })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance



    return(

        <>
            <PageTitle text="Cupones" />


            <div className="pb-16">
                <PageSubTitle texto="Valor normal de la cuota" />
                <div className="my-8">
                    <CelesteButton texto={"Nuevo Valor"} accion={() => setAbrirPopupNuevoValorCuota(true)} />
                </div>
                
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
          
      
            </div>

            <EstadoCupones />
        {abrirPopupNuevoValorCuota && <PopupNuevoValorCuota setAbrirModal={setAbrirPopupNuevoValorCuota} setActualizar={setActualizar}/>}
        </>

    )


}