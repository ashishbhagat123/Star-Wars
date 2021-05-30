import React from "react";
import "./index.css";

const ListItem = ({ data, index, activeIndex,setActiveIndex, handleIndex, showCharacterDetails,onRef}) => {
    const { name, birth_year, gender } = data;

    // Displaying Items on suggestion list
    return (
        <div
            ref={(el) => onRef(el)}
            style={activeIndex === index ? { background: "darkgoldenrod", borderRadius:"0", color:"black" } : null}
            onKeyUp = {(e) => handleIndex(e)}
            onMouseEnter = {() => setActiveIndex(activeIndex)}
            onClick={() => showCharacterDetails(name)}
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

export default ListItem;
