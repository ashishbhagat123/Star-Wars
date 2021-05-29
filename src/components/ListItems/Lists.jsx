import React from "react";
import "./index.css";

const Lists = ({ data, i, active,setActive, handleIndex, handlePerson }) => {
    const { name, birth_year, gender } = data;

    // Displaying Items on search list
    return (
        <div
            style={active === i ? { background: "darkgoldenrod", borderRadius:"0", color:"black" } : null}
            onKeyUp = {(e) => handleIndex(e)}
            onMouseEnter = {() => setActive(i)}
            onClick={() => handlePerson(name)}
            className="search-list"
        >
            <div>
                <p>{name}</p>
                <span>{birth_year}</span>
            </div>
            <div>
                <p>{gender}</p>
            </div>
        </div>
    );
};

export default Lists;
