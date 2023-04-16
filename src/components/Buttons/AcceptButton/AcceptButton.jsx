

export default function AcceptButton({ accion }) {

    return (

        <button className="bg-emerald-500 text-white font-normal text-md rounded-md px-4 py-2 active:bg-emerald-700" onClick={accion}>
            <p className="text-white">Aceptar</p>
        </button>

    )

}