import React, { useCallback } from "react";
import logo from "./star-wars-logo.png";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/persons/actions";
import { debounce } from "../../utils/debouncer";
import SearchList from "../../components/ListItems/index"

function HomePage() {
    const dispatch = useDispatch();
    // getting data from store
    const { data, isLoading, isError } = useSelector((state) => state);

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
            <input
                className="search-input"
                style = {data.length? {borderBottomLeftRadius:"0", borderBottomRightRadius: "0"}: null}
                onKeyUp={(e) => memonizedFunction(e)}
                placeholder="Search by name"
            />
            <div className = "list">
              {
                !isLoading && data?.map((e, i) => (
                  <SearchList key = {i} data = {e} />
                ))
              }
            </div>
        </div>
    );
}

export default HomePage;
