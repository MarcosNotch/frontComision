

export default function OrangeButton({texto, accion}){

    return (
        <button className="bg-orange text-white font-normal text-md rounded-md px-4 py-2 active:bg-yellow-800" onClick={accion}>
            {texto}
        </button>
    )


}