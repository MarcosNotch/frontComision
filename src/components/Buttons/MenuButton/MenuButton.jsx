import React from 'react';
import "../../../css/menuButton.css";

function MenuButton({ abierto,onClick }) {
  return (
    <button className={`boton-menu ${abierto ? 'abierto' : 'cerrado'}`} onClick={onClick}>
      {/*{abierto ? <>&lt;</> : <>&gt;</>}*/}
      {abierto ? <>&gt;</> : <>&lt;</>}
    </button>
  );
}

export default MenuButton;