import React from 'react'
import { useParams } from 'react-router-dom';

// import {withRouter} from 'react-router-dom'
const PlayerDetails = (prop) => {
    let { id } = useParams();

    console.log(id,"$@#%@#")
  return (
    <div>PlayerDetails</div>
  )
}

export default PlayerDetails