


export default function SmallBoxContainer({ children }) {

    return(
    <div className="w-auto flex flex-col items-start justify-between h-32 bg-azul2 rounded-sm px-6 py-2">
        {children}
    </div>
    )

}