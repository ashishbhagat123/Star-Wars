import React from 'react'
import "./index.css"

const index = ({data}) => {
    const { name, eye_color, height, homeworld, mass, skin_color} = data
    return (
        <div className = "person-card">
             <h1>{name}</h1>
             <hr/>
             <div>
                 <div>
                    <h2>Eye Color: <span>{eye_color}</span></h2>
                    <h2>Height: <span>{height}</span></h2>
                 </div>
                 <div>
                    <h2>Skin Color: <span>{skin_color}</span></h2>
                    <h2>Mass: <span>{mass}</span></h2>
                 </div>
             </div>
        </div>
    )
}

export default index
