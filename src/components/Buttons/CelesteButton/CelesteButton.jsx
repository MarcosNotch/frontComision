

export default function CelesteButton({texto, accion}){

    return (
        <button className="bg-celeste text-white font-normal text-md rounded-md px-4 py-2 active:bg-azul3 h-10" onClick={accion}>
            {texto}
        </button>
    )


}