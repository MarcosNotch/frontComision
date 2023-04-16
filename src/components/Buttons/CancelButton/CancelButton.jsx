

export default function CancelButton({accion}){

    return(

        <button className="bg-red-500 text-white font-normal text-md rounded-md px-4 py-2 active:bg-red-700" onClick={accion}>
            <p className="text-white">Cancelar</p>
        </button>

    )


}