

export default function GreenButton({texto, accion}){

    return (
        <button className="bg-emerald-500 text-white font-normal text-md rounded-md px-4 py-2 active:bg-yellow-800" onClick={accion}>
            {texto}
        </button>
    )
}