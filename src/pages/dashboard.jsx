import { redirect } from "react-router-dom";
import { useState, useMemo } from "react"
import DatePicker from "react-datepicker";
import PageTitle from "../components/PageTitle/PageTitle";
import { useRef, useEffect } from "react";
import CelesteButton from "../components/Buttons/CelesteButton/CelesteButton";
import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import PageSubTitle from "../components/PageSubTitle/PageSubTitle";
import DeudaPorMes from "../components/DeudaPorMes/DeudaPorMes";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Dashboard() {

    const filtroNroAdhetente = useRef()

    var firstDayOfTheMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const lastDay = new Date();
    const navigate = useNavigate();

    const [pagina, setPagina] = useState(1)

    const [startDateMov1, setStartDateMov1] = useState(firstDayOfTheMonth);
    const [startDateMov2, setStartDateMov2] = useState(lastDay);
    const [valorFiltroNroAdherente, setValorFiltroNroAdherente] = useState(null)
    const [totalRows, setTotalRows] = useState(0)
    const [pagos, setPagos] = useState([])
    const [loading, setLoading] = useState(false)
    const token = sessionStorage.getItem("token");

    const hasNext = pagina < Math.ceil(totalRows / 10)

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

                const response = await fetch(`http://localhost:8080/api/v1/pagos?&pageNum=${pagina}${valorFiltroNroAdherente ? `&nroAdherente=${valorFiltroNroAdherente}` : ''}&fechaDesde=${dayjs(startDateMov1).format('YYYY-MM-DD')}&fechaHasta=${dayjs(startDateMov2).format('YYYY-MM-DD')}`, options)

                if (!response.ok && response.status == "403") {
                    console.log("entre aca")

                    navigate("/login")
                }

                const data = await response.json()
                setPagos(data.pagos)
                setTotalRows(data.totalPagos)
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

    }, [pagina, valorFiltroNroAdherente, startDateMov1, startDateMov2])

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
                Header: 'Titular',
                accessor: 'vecino.titular', // accessor is the "key" in the data
            },
            {
                Header: 'Nro Adherente',
                accessor: 'vecino.nroAdherente',
            },
            {
                Header: 'Fecha de Pago',
                accessor: 'fechaPago',
            },
            {
                Header: 'Fecha de Acreditacion',
                accessor: 'fechaAcreditacion',
            },
            {
                Header: 'Canal de Cobro',
                accessor: 'canalCobro.descripcion',
            },
            {
                Header: 'Importe Pagado',
                accessor: 'importePagado',
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

    function buscarCliente(e) {
        e.preventDefault()
        console.log(filtroNroAdhetente.current.value)
        setValorFiltroNroAdherente(filtroNroAdhetente.current.value)
    }


    function exportPdf() {

        const doc = new jsPDF('l', 'mm', 'a4');
        autoTable(doc, { html: '#my-table2' });
        doc.save(`pagos.pdf`);
    }

    return (
        <div className="w-full flex flex-col pb-10">
            <PageTitle text="Pagos y Deudas" />
            <form onSubmit={buscarCliente} className="flex flex-col lg:space-y-0 space-y-4 sm:flex-row flex-wrap space-x-4 items-start justify-start mb-4">
                <div className="flex flex-col space-y-1 items-start">
                    <p className="text-gray-300 ">Número de Adherente</p>
                    <input ref={filtroNroAdhetente} className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="text" name="" />
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
                        <CelesteButton accion={exportPdf} texto={"Exportar"} />
                    </div>
                  
                </div>

            </form>
      
            <PageSubTitle texto={"Pagos"} />
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


            {
                valorFiltroNroAdherente && <>
                    <PageSubTitle texto={"Deuda por mes"} />
                    <DeudaPorMes nroAdherente={valorFiltroNroAdherente} />
                </>

            }
        </div>
    )
}