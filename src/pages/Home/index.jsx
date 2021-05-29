import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "./star-wars-logo.png";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/persons/actions";
import { debounce } from "../../utils/debouncer";
import ListItem from "../../components/ListItems";
import { IoSearch } from "react-icons/io5";
import { useHistory } from "react-router";
import { IoClose } from "react-icons/io5";


function HomePage() {
    const dispatch = useDispatch();
    const [characters, setCharacters] = useState([]);
    const [query, setQuery] = useState("")
    const [activeIndex, setActiveIndex] = useState(-1);
    const [loader, setLoader] = useState(false);
    const history = useHistory();
    const ref = useRef();
    const itemRefs = {};

    useEffect(() => {
        ref.current.focus();
    }, []);

    // getting data from store
    const { data,success,messege,errmessege,isError } = useSelector((state) => state);

    useEffect(() => {
        setCharacters(data);
        setLoader(false);
    }, [data]);

    // Called when user clicks on character in suggestion list
    const handleChange = (e) => {
        setQuery(e)
        dispatch(getData(e));
    };

    // Only called when input is different to avoid unnecessary api calls
    const memonizedFunction = useCallback(debounce((e) => handleChange(e)), []);

    // Called when user clicks on character
    const showCharacterDetails = (name) => {
        history.push(`/person/${name}`);
    };

    // called when user click on cancel button in search bar
    const onCancel = () => {
        ref.current.value = "";
        setQuery("")
        setCharacters([]);
    };

    // For scrolling through suggestion list
    const scrollTo = (id) => {
        if (itemRefs[id]) {
            itemRefs[id].scrollIntoView({behavior: "smooth"});
        }
    };

    // called when user scroll through search result using arrow keys
    const onListScroll = (e) => {
        switch (e.keyCode) {
            case 40:
                if (activeIndex >= characters.length) {
                    setActiveIndex(0);
                    scrollTo(0);
                } else {
                    scrollTo(activeIndex + 1);
                    setActiveIndex((prev) => prev + 1);
                }
                break;

            case 38:
                if (activeIndex <= 0) {
                    setActiveIndex(characters.length);
                } else {
                    scrollTo(activeIndex - 1);
                    setActiveIndex((prev) => prev - 1);
                }
                break;
            case 13:
                let name = characters[activeIndex].name;
                showCharacterDetails(name);
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
            <div onKeyUp={onListScroll}>
                <div className="search-div">
                    <input
                        ref={ref}
                        className="search-input"
                        style={
                            !loader && characters.length !== 0
                                ? {
                                      borderBottomLeftRadius: "0",
                                      borderBottomRightRadius: "0",
                                      borderBottom: "1px solid black",
                                  }
                                : null
                        }
                        onChange={(e) => {
                            memonizedFunction(e)
                            setLoader(true)
                        }}
                        placeholder="Search by name"
                    />
                    {!loader && query.length !== 0 && (
                        <div className="cross" onClick={onCancel}>
                            <IoClose color = "white" /> <span>|</span>{" "}
                        </div>
                    )}
                    {!loader ? (
                        <div onClick={handleChange} className="search-button">
                            <IoSearch />
                        </div>
                    ) : (
                        <div className="loader"></div>
                    )}
                </div>
                {/* Error handling and data Displaying */}
                {isError ? (
                    <div className="no_data_alert">
                        <h2>{errmessege}</h2>
                    </div>
                ) : !loader && !success && query.length > 0? (
                    <div className="no_data_alert">
                        <h2>{messege}</h2>
                    </div>
                ) : (
                    <div className="list">
                        {!loader &&
                            characters?.map((e, i) => (
                                <ListItem
                                    onRef={(el) => {
                                        itemRefs[i] = el;
                                    }}
                                    key={i}
                                    data={e}
                                    index={i}
                                    activeIndex={activeIndex}
                                    showCharacterDetails={showCharacterDetails}
                                    setActiveIndex={setActiveIndex}
                                />
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
