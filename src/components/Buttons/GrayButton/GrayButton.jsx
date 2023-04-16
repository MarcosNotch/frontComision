

export default function GrayButton({texto, accion}){

    return (
        <button className="bg-slate-500 text-white font-normal text-md rounded-md px-4 py-2 active:bg-azul3" onClick={accion}>
            {texto}
        </button>
    )


}