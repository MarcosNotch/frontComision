import BlueButton from "../components/Buttons/BlueButton/BlueButton"
import { useState } from "react"
import PageTitle from "../components/PageTitle/PageTitle"
import { useMemo } from "react"
import { useTable } from "react-table"
import CelesteButton from "../components/Buttons/CelesteButton/CelesteButton"
import { useRef } from "react"
import { useFetch } from "../hooks/useFetch"


export default function Vecinos() {

    const filtroTitular = useRef()
    const filtroNroAdhetente = useRef()
    const [recargarPagina, setRecargarPagina] = useState(false)
    const [abrirNewModal, setAbrirNewModal] = useState(false)
    const [valorFiltroTitular, setValorFiltroTitular] = useState(null)
    const [valorFiltroNroAdherente, setValorFiltroNroAdherente] = useState(null)
    const [pagina, setPagina] = useState(1)
    const { data: clients, loading: loadingF, error: errorF, totalRows} = useFetch(`http://localhost:8080/api/v1/vecinos?idZona=1&pageNum=${pagina}${valorFiltroTitular ? `&nombre=${valorFiltroTitular}` : ''}${valorFiltroNroAdherente ?`&nroAdherente=${valorFiltroNroAdherente}` : '' }`, recargarPagina)
    const [clienteEditar, setClienteEditar] = useState(null)
    const comboRef = useRef()
    const hasNext = pagina < Math.ceil(totalRows / 10)
    console.log(totalRows)

    const hasPrev = pagina > 1
    const disabledPrev = !hasPrev || loadingF
    const disabledNext = !hasNext || loadingF

    const next = () => {
        setPagina(pagina + 1)
    }

    const prev = () => {
        setPagina(pagina - 1)
    }

    const columns = useMemo(
        () => [
            {
                Header: 'Titular',
                accessor: 'titular', // accessor is the "key" in the data
            },
            {
                Header: 'Nro Adherente',
                accessor: 'nroAdherente',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Domicilio',
                accessor: 'domicilio',
            },
            {
                Header: 'Fecha Posesión',
                accessor: 'fechaPosecion',
            },
        ],
        []
    )

    const tableInstance = useTable({ columns, data: clients })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance


    const buscarCliente = (e) => {
        e.preventDefault()
        setValorFiltroTitular(filtroTitular?.current?.value)
        setValorFiltroNroAdherente(filtroNroAdhetente?.current?.value)
        setPagina(1)
    }

    function abrirEditar(cliente){
        setClienteEditar(cliente)
        setAbrirNewModal(true)
    }

    return (
        <div>
            <PageTitle text="Agenda de Vecinos" />
           
        
                <form onSubmit={buscarCliente} className="grid mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px]">
                    <div className="flex flex-col space-y-1 items-start">
                        <p className="text-gray-300 ">Titular</p>
                        <input ref={filtroTitular} className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />
                    </div>
                    <div className="flex flex-col space-y-1 items-start">
                        <p className="text-gray-300 ">Número de Adherente</p>
                        <input ref={filtroNroAdhetente} className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />
                    </div>
                    <div className="flex flex-col space-y-1 items-start">
                        <div className="w-full h-5">

                        </div>
                        <CelesteButton texto={"Buscar Vecino"} />
                    </div>                  
                </form>


            <div className="w-full overflow-x-auto">
                <table className="w-full max-sm:w-[700px]  sm:min-w-[830px] bg-azul2 flex flex-col rounded-sm">

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
                                                    <td {...cell.getCellProps()} onClick={() => abrirEditar(cell.row.original)} className="w-1/5 flex items-center justify-center hover:cursor-pointer" >
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
    )
}