import { useEffect } from "react";

export default function PopupLayout({children}) {

    useEffect(() => {
 
          document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        }
      }, []);
    
    return (

        <>
            <div className="fixed top-0 left-0 z-40 h-screen w-screen bg-gray-500 opacity-40 overflow-hidden">

            </div>
            {children}
        </>

    )

}