import React from "react";
import "./index.css";

const Lists = ({data, i}) => {
    const {name, birth_year, gender } = data


    // Displaying Items on search list
    return (
        <div className="search-list">
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
