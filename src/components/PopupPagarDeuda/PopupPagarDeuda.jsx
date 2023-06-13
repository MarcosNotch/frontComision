import PopupLayout from "../PopupLayout/PopupLayout"
import AcceptButton from "../Buttons/AcceptButton/AcceptButton"
import CancelButton from "../Buttons/CancelButton/CancelButton"


export default function PopupPagarDeuda({mes, monto, anio, nroAdherente, setAbrirModal, setActualizar}){

   async function marcarComoPagado(e){  
    e.preventDefault()
    const token = sessionStorage.getItem("token");
    const options =
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            "nroAdherente": nroAdherente,
            "mes": mes-1,
            "anio": anio,
        })
    }

        const response = await fetch(`http://localhost:8080/api/v1/pagos/marcarPagado`, options)
        if (response.status === 200){
            setActualizar(e => !e)
            cerrarModal()
        }
   }

    function cerrarModal(){

        setAbrirModal(false)

    }


    return(

        <PopupLayout>

                <form onSubmit={marcarComoPagado} className="fixed py-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-azul2 max-sm:w-80  w-[500px] h-[210px] sm:h-[190px] rounded-sm">
                    <div className="flex items-center justify-center border-b border-gray-500 py-2">
                        <h1 className="text-white text-2xl font-medium">Marcar como PAGADO</h1>
                    </div>
                    <div>
                        <p className="text-white text-center mt-4">¿Está seguro que desea marcar como pagado la deuda de {mes-1} del {anio} para el vecino {nroAdherente}?</p>
                    </div>

                    <div className="flex items-center justify-center space-x-4 mt-2">
                        <AcceptButton texto="Aceptar" accion={marcarComoPagado} />
                        <CancelButton texto="Cancelar" accion={cerrarModal} />
                    </div>
                </form>

        </PopupLayout>

    )



}