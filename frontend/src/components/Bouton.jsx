import React, { Children } from 'react'

function Bouton({width, bg, color, fontSize,children}) {
  return (
    <button className={`${width} ${bg} ${color} ${fontSize}  px-4 py-4 rounded-md`}>{children}</button>
  )
}

export default Bouton