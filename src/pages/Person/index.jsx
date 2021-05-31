import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getData } from "../../redux/persons/actions";
import "./index.css";
import Details from "../../components/PersonDetails/index";
import NotFound from "../NotFound/index"
import { Link } from "react-router-dom";

function Person() {
    const [character, setCharacter] = useState(false);
    const params = useParams();
    const { id } = params;
    const dispatch = useDispatch();
    const { data, isError, errmessege } = useSelector((state) => state);

    // calling api on refresh of page if data is not available in store
    useEffect(() => {
        if (data.length === 0) {
            dispatch(getData(id));
        }
        let char = data.filter((e) => e.name === id);
        if(data.length){
          setCharacter(char[0]);
        }        
    }, [data]);

    // clear all search data in homepage when user click on back button
    const clearStoreData = () => {
        dispatch(getData(""))
    }
    
    return (
        <div className="person">
          <img src= "https://c4.wallpaperflare.com/wallpaper/975/888/22/humor-star-wars-darth-vader-cigarettes-wallpaper-preview.jpg" alt="vadar"/>
            {isError && <div>{errmessege}</div>}
            {character &&  <Details data = {character} />}
            {character === undefined && <NotFound />}
            <Link onClick = {clearStoreData} to = "/">Go Back</Link>
        </div>
    );
}

export default Person;
