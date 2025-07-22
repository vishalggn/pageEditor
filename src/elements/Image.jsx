import React from 'react'

function Image({style}) {
  return (
    <div>
      <img
      src={style.src || 'https://vishalprajapati.top/project/mock-vpflix.jpg'}
      alt="Dropped"
      style={{ ...style }}
      className="rounded max-w-[300px] h-auto"
    />
    </div>
  )
}

export default Image
