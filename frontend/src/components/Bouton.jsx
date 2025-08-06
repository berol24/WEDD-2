import React from 'react'

function Bouton({width, bg, color, height, fontSize, children, rounded, shadow}) {
  return (
    <button className={`${width} ${bg} ${color} ${fontSize} ${height} ${rounded} ${shadow} font-bold px-4 py-2 rounded-md`}>{children}</button>
  )
}

export default Bouton