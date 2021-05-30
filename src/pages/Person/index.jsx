import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getData } from '../../redux/persons/actions';
import './index.css';
import Details from "../../components/PersonDetails/index"

function Person() {
  const [character, setCharacter] = useState(false)
  const params = useParams()
  const {id} = params
  const dispatch = useDispatch()
  const {data, isError, errmessege} = useSelector(state => state)

  useEffect(() => {
    if(data.length === 0){
      dispatch(getData(id))
    }
    let char = data.filter((e) => e.name === id)
      setCharacter(char[0])
  }, [data])

  return (
    <div className="person">
      <img src="https://cdn.wallpapersafari.com/14/39/ei4ygl.jpg" alt="star wars"/>
      {isError && <div>{errmessege}</div>}
      {character && <Details data = {character} />}
    </div>
  );
}

export default Person;
