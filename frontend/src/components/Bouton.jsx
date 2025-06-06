import React, { Children } from 'react'

function Bouton({width, bg, color,height, fontSize,children}) {
  return (
    <button className={`${width} ${bg} ${color} ${fontSize} ${height} font-bold px-4 py-4 rounded-md`}>{children}</button>
  )
}

export default Bouton