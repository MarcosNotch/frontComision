

export default function PopupLayoutBlack({children}) {


    return (

        <>
            <div className="fixed top-0 left-0 z-10 h-screen w-screen bg-black opacity-40 sm:hidden">

            </div>
            {children}
        </>

    )

}