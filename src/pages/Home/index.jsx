import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "./star-wars-logo.png";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/persons/actions";
import { debounce } from "../../utils/debouncer";
import SearchList from "../../components/ListItems/Lists";
import { IoSearch } from "react-icons/io5";
import { useHistory } from "react-router";
import { ImCross } from "react-icons/im";

function HomePage() {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("")
    const [lists, setLists] = useState([]);
    const [active, setActive] = useState(-1);
    const [revolve, setRevolve] = useState(false);
    const history = useHistory();
    const ref = useRef();

    useEffect(() => {
        ref.current.focus();
    }, []);

    let length = lists.length;
    // getting data from store
    const { data, isError } = useSelector((state) => state);

    useEffect(() => {
        setLists(data);
        setRevolve(false);
    }, [data]);

    // Dispatching api request
    const handleChange = (e) => {
        setQuery(e)
        dispatch(getData(e));
    };

    // Memoized function
    const memonizedFunction = useCallback(debounce((e) => handleChange(e)));

    // Handle page
    const handlePerson = (name) => {
        history.push(`/person/${name}`);
    };

    // handle cross
    const handleCross = () => {
        ref.current.value = ""
        setLists([])
    };

    const handleIndex = (e) => {
        let val;
        let max;
        if (val === undefined) {
            val = 1;
        }
        if (length > 2) {
            max = 2;
        } else {
            max = length;
        }

        switch (e.keyCode) {
            case 40:
                if (active >= max) {
                    setActive(0);
                } else {
                    setActive((prev) => prev + val);
                }
                break;

            case 38:
                if (active <= 0) {
                    setActive(max);
                } else {
                    setActive((prev) => prev - 1);
                }
                break;
            case 13:
                let name = lists[active].name;
                handlePerson(name);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <div className="logo">
                <img src={logo} alt="Star Wars Logo" />
            </div>
            <div onKeyUp={handleIndex}>
                <div className="search-div">
                    <input
                        ref={ref}
                        className="search-input"
                        style={
                            !revolve && length !== 0
                                ? {
                                      borderBottomLeftRadius: "0",
                                      borderBottomRightRadius: "0",
                                      borderBottom: "1px solid black",
                                  }
                                : null
                        }
                        onKeyUp={(e) => memonizedFunction(e)}
                        onChange={() => setRevolve(true)}
                        placeholder="Search by name"
                    />
                    {!revolve && length !== 0 && (
                        <div className="cross" onClick={handleCross}>
                            <ImCross /> <span>|</span>{" "}
                        </div>
                    )}
                    {!revolve ? (
                        <div onClick={handleChange} className="search-button">
                            <IoSearch />
                        </div>
                    ) : (
                        <div className="loader"></div>
                    )}
                </div>
                {/* Error handling and data Displaying */}
                {isError ? (
                    <div className="list">
                        <h2>Error fetching the data</h2>
                    </div>
                ) : !revolve && typeof lists === "string" ? (
                    <div className="list">
                        <h2>No Result Found</h2>
                    </div>
                ) : (
                    <div className="list">
                        {!revolve &&
                            lists?.map((e, i) => (
                                <SearchList
                                    key={i}
                                    data={e}
                                    i={i}
                                    active={active}
                                    handlePerson={handlePerson}
                                    setActive={setActive}
                                />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
