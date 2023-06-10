import React from 'react'
import './SideDrawer.css'
import ReactDOM from 'react-dom'

function SideDrawer(props) {
  const content = (
    <aside
      className={`side-drawer ${props.show && 'open'}`}
      onClick={props.onClick}>
      {props.children}
    </aside>
  )

  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'))
}

export default SideDrawer