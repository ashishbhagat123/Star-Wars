import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getData } from "../../redux/persons/actions";
import "./index.css";

const Details = ({ data }) => {
    const { name, eye_color, height, mass, skin_color } = data;
    const dispatch = useDispatch()

    // clear all search data in homepage when user click on back button
    const clearStoreData = () => {
        dispatch(getData(""))
    }

    return (
        <div className="person-card">
            <h1>{name}</h1>
            <hr />
            <div>
                <div>
                    <h2>Eye Color:</h2>
                    <h2>{eye_color}</h2>
                </div>
                <div>
                    <h2>Skin Color:</h2>
                    <h2>{skin_color}</h2>
                </div>
                <div>
                    <h2>Height:</h2>
                    <h2>{height}</h2>
                </div>
                <div>
                    <h2>Mass</h2>
                    <h2>{mass}</h2>
                </div>
            </div>
            <Link onClick = {clearStoreData} to = "/">Go Back</Link>
        </div>
    );
};

export default Details;
