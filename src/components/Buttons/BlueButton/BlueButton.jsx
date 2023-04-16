

export default function BlueButton({texto, accion}){

    return (
        <button className="bg-azul4 text-white font-normal text-md rounded-md px-4 py-2 active:bg-azul3" onClick={accion}>
            {texto}
        </button>
    )


}