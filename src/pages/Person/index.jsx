import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getData } from '../../redux/persons/actions';
import './index.css';
import PersonCard from "../../components/PersonCard/index"

function Person() {
  const [character, setCharacter] = useState(false)
  const params = useParams()
  const {id} = params
  const dispatch = useDispatch()
  const {data,isLoading, isError} = useSelector(state => state)


  useEffect(() => {
    dispatch(getData(id))
    console.log(data)
    let char = data.filter((e) => e.name === id)
      setCharacter(char[0])
  }, [isLoading, id])

  return (
    <div className="person">
      <img src="https://swall.teahub.io/photos/small/24-247478_star-wars-4k-hd-desktop-wallpaper-for.jpg" alt="star wars"/>
      {isError && "something not right"}
      {character && <PersonCard data = {character} />}
    </div>
  );
}

export default Person;
