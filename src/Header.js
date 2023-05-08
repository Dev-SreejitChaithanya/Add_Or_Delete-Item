import React from 'react'

//with normal props
function Headers(props) {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  )
}

//with destructuring..
// function Headers({title}) {
//   return (
//     <header>
//       <h1>{title}</h1>
//     </header>
//   )
// }


//with default props defined i.e. if no props are passed it takes this
Headers.defaultProps={
  title:"Default title"
}

export default Headers
