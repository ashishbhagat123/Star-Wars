import React from "react"
import "./index.css";

const Details = ({ data }) => {
    const { name, eye_color, height, mass, skin_color, gender, hair_color } = data;
    console.log(data)
    return (
        <div className="person-card">
            <h1>{name}</h1>
            <hr />
            <div className = "details">
                <div >
                    <div><h2>Gender</h2></div>
                    <div><h2>{gender}</h2></div>
                </div>
                <div>
                    <div><h2>Height:</h2></div>
                    <div><h2>{height}</h2></div>
                </div>
                <div>
                    <div><h2>Mass</h2></div>
                    <div><h2>{mass}</h2></div>
                    
                    
                </div>
                <div >
                    <div><h2>Hair Color</h2></div>
                    <div><h2>{hair_color}</h2></div>
                </div>
                <div >
                    <div><h2>Eye Color</h2></div>
                    <div><h2>{eye_color}</h2></div>
                </div>
                <div>
                    <div><h2>Skin Color</h2></div>
                    <div><h2>{skin_color}</h2></div>
                </div>
            </div>
        </div>
    );
};

export default Details;
