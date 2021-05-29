import React, { useCallback, useEffect, useState } from "react";
import logo from "./star-wars-logo.png";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/persons/actions";
import { debounce } from "../../utils/debouncer";
import SearchList from "../../components/ListItems/Lists";
import { IoSearch } from "react-icons/io5";

function HomePage() {
    const dispatch = useDispatch();
    const [lists, setLists] = useState([]);
    let length = lists.length;
    // getting data from store
    const { data, isError } = useSelector((state) => state);

    useEffect(() => {
        setLists(data);
    }, [data]);

    // Dispatching api request
    const handleChange = (e) => {
        dispatch(getData(e));
    };

    // Memoized function
    const memonizedFunction = useCallback(debounce((e) => handleChange(e)));

    return (
        <div>
            <div className="logo">
                <img src={logo} alt="Star Wars Logo" />
            </div>
            <div className="search-div">
                <input
                    className="search-input"
                    style={
                        length !== 0
                            ? {
                                  borderBottomLeftRadius: "0",
                                  borderBottomRightRadius: "0",
                              }
                            : null
                    }
                    onKeyUp={(e) => memonizedFunction(e)}
                    placeholder="Search by name"
                />
                <div onClick={handleChange} className="search-button">
                    <IoSearch />
                </div>
            </div>
            {/* Error handling and data Displaying */}
            {isError ? (
                <div className="list">
                    <h2>Error fetching the data</h2>
                </div>
            ) : typeof lists === "string" ? (
                <div className="list">
                    <h2>No Result Found</h2>
                </div>
            ) : (
                <div className="list">
                    {lists?.map((e, i) => (
                        <SearchList key={i} data={e} i = {i}/>
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomePage;
