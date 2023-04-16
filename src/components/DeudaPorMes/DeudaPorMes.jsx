import { useRef, useEffect, useMemo, useState} from "react";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import { useTable } from "react-table";
import CelesteButton from "../Buttons/CelesteButton/CelesteButton";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import PopupPagarDeuda from "../PopupPagarDeuda/PopupPagarDeuda";

export default function DeudaPorMes({nroAdherente}){

    const filtroAno = useRef()
    const [valorFiltroAno, setValorFiltroAno] = useState(2022)


    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const [actualizar, setActualizar] = useState(false)

    const [mes, setMes] = useState("")
    const [monto, setMonto] = useState(0)
    const [anio, setAnio] = useState(0)

    const token = sessionStorage.getItem("token");

    const [abrirNewModal, setAbrirNewModal] = useState(false)

    useEffect(() => {

        async function obtenerDatos(){
            setLoading(true)
            const options =
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }
            const response = await fetch(`http://localhost:8080/api/v1/pagos/deudas?anio=${valorFiltroAno}&nroAdherente=` + nroAdherente, options)
            const data = await response.json()
            console.log(data)

            const pagosPorMes = {};
            const final = []

            for (const pago of data) {
              pagosPorMes[pago.mes] = pago.montoPagado;
            
            }
            final.push(pagosPorMes)
            console.log(final)

            setData(final)
            setLoading(false)
        }

        obtenerDatos()
    }, [nroAdherente, token, filtroAno, valorFiltroAno, actualizar])



    const columns = useMemo(
        () => [
            {
                Header: 'Enero',
                accessor: 'JANUARY', // accessor is the "key" in the data
            },
            {
                Header: 'Febrero',
                accessor: 'FEBRUARY',
            },
            {
                Header: 'Marzo',
                accessor: 'MARCH',
            },
            {
                Header: 'Abril',
                accessor: 'APRIL',
            },
            {
                Header: 'Mayo',
                accessor: 'MAY',
            },
            {
                Header: 'Junio',
                accessor: 'JUNE',
            },
            {
                Header: 'Julio',
                accessor: 'JULY',
            },
            {
                Header: 'Agosto',
                accessor: 'AUGUST',

            },
            {
                Header: 'Septiembre',
                accessor: 'SEPTEMBER',
            },
            {
                Header: 'Octubre',
                accessor: 'OCTOBER',
            },
            {
                Header: 'Noviembre',
                accessor: 'NOVEMBER',
            },
            {
                Header: 'Diciembre',
                accessor: 'DECEMBER',
            }
        ],
        []
    )

    const tableInstance = useTable({ columns, data })


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    function buscarDeuda(e){
        e.preventDefault()
        setValorFiltroAno(filtroAno.current.value)
    }

    function exportPdf() {

        const doc = new jsPDF('l', 'mm', 'a4');
        autoTable(doc, { html: '#my-table' });
        doc.save(`Deuda.pdf` );
    }

    function abrirPopup(info){

  
        if (info.column.Header === "Enero"){
            setMes(2)
        }
        if (info.column.Header === "Febrero"){
            setMes(3)
        }
        if (info.column.Header === "Marzo"){
            setMes(4)
        }
        if (info.column.Header === "Abril"){
            setMes(5)
        }
        if (info.column.Header === "Mayo"){
            setMes(6)
        }
        if (info.column.Header === "Junio"){
            setMes(7)
        }
        if (info.column.Header === "Julio"){
            setMes(8)
        }
        if (info.column.Header === "Agosto"){
            setMes(9)
        }
        if (info.column.Header === "Septiembre"){
            setMes(10)
        }
        if (info.column.Header === "Octubre"){
            setMes(11)
        }
        if (info.column.Header === "Noviembre"){
            setMes(12)
        }
        if (info.column.Header === "Diciembre"){
            setMes(12)
        }

        setMonto(info.value)
        setAnio(filtroAno.current.value)

        setAbrirNewModal(true)
        console.log("entre")
        console.log(info)
    }


    return (
        <>
   
        <div>
             <form onSubmit={buscarDeuda} className="flex flex-col lg:space-y-0 space-y-4 sm:flex-row flex-wrap space-x-4 items-start justify-start mb-4">
                <div className="flex flex-col space-y-1 items-start">
                    <p className="text-gray-300 ">año</p>
                    <input ref={filtroAno} defaultValue={2022} className="rounded-sm bg-azul2 outline-none px-2 h-10 text-gray-300 border border-gray-400" type="number" name="" />
                </div>
                
                <div className="flex flex-col space-y-1 items-start">
                    <div className="mt-6">

                    </div>
                    <CelesteButton texto={"Buscar deuda"} />
                </div>

            </form>
            <CelesteButton accion={exportPdf} texto={"Exportar"} />

            <div className="w-full overflow-x-auto mb-8">
                <table className="w-full max-sm:w-[700px]  sm:min-w-[830px] bg-azul2 flex flex-col rounded-sm" id="my-table">

                    <thead className="h-20 w-full flex  items-center border-b border-gray-400">
                        {
                            tableInstance.headerGroups.map((headerGroup) => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="w-full flex items-center justify-center">
                                    {
                                        headerGroup.headers.map((column) => (
                                            <th {...column.getHeaderProps()} className="flex items-center justify-center w-1/12">
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
                                                    <td {...cell.getCellProps()} className="w-1/12 flex items-center justify-center hover:cursor-pointer" onClick={() => abrirPopup(cell)}>
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
                    
                </table>
            </div>
        </div>
           {abrirNewModal &&
                <PopupPagarDeuda setActualizar={setActualizar} mes={mes} monto={monto} anio={anio} nroAdherente={nroAdherente} setAbrirModal={() => setAbrirNewModal(false)} />
           }
           </>
    )



}