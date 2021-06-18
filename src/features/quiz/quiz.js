import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';



export default function Quiz() {

  const history = useHistory();

  const [actor, setActor] = useState("");
  const [movie, setMovie] = useState("");
  const [answer, setAnswer] = useState(undefined);
  const [timer, setTimer] = useState(60);
  const [timerInterval, setTimerInterval] = useState(undefined);
  const [score, setScore] = useState(0);
  const [end, setEnd] = useState(false)

  function getQuiz(){
    const number = Math.random();
    if (number > 0.5 ) {
      getTrueQuiz();
    } else {
      getFalseQuiz();
    }
  };

  function getTrueQuiz(){

    const moviePageID = Math.floor(Math.random() * 100 +1 );
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=7ea5f490261a949e52930517e1b4657c&page=${moviePageID}`;

    //Get one of the most popular Movie and get a member of the cast 

    axios.get(url)
      .then( response => {
        
        const movieIndex =  Math.floor(Math.random() * response.data.results.length);
        const selectedMovie = response.data.results[movieIndex]

        setMovie(selectedMovie.original_title);
        const personURL = `https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?api_key=7ea5f490261a949e52930517e1b4657c`
        axios.get(personURL)
          .then( response => {
            const castIndex =  Math.floor(Math.random() * response.data.cast.length);
            setActor(response.data.cast[castIndex].name);
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })

      setAnswer(true)
  };

  function getFalseQuiz(){

    const personPageID = Math.floor(Math.random() * 100 + 1);    
    const url = `https://api.themoviedb.org/3/person/popular?api_key=7ea5f490261a949e52930517e1b4657c&page=${personPageID}`;

    //Get one of the most popular actor

    axios.get(url)
      .then( response => {

        const personIndex =  Math.floor(Math.random() * response.data.results.length);
        const selectPerson = response.data.results[personIndex];
        
        //Save actor name

        const personURL = `https://api.themoviedb.org/3/person/${selectPerson.id}?api_key=7ea5f490261a949e52930517e1b4657c`
        axios.get(personURL)
        .then( response => {
          setActor(response.data.name);
        })
        .catch(error => {
          console.log(error)
        })

      })
      .catch(error => {
        console.log(error)
      })

    


   

    //Get one of the most know movie and save it in state

    const moviePageID = Math.floor(Math.random() * 100+1);    
    const movieURL = `https://api.themoviedb.org/3/movie/popular?api_key=7ea5f490261a949e52930517e1b4657c&page=${moviePageID}`;
    axios.get(movieURL)
    .then( response => {
      const movieIndex =  Math.floor(Math.random() * response.data.results.length);
      setMovie(response.data.results[movieIndex].original_title);
    })
    .catch(error => {
      console.log(error)
    })

    setAnswer(false)

  };

  function checkResult(userAnswer) {
    if (userAnswer === answer){
      setScore(score + 1);
      getQuiz();
    } else {
      setEnd(true);
    }
  };


  useEffect(getQuiz, []);  

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t - 1)
    }, 1000);
    setTimerInterval(interval);
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {
    if (timer === 0){
      clearInterval(timerInterval)
      setEnd(true);
    }
  }, [timer, timerInterval, score]);

  useEffect(() => {
    if (end === true) {
      history.push({
        pathname: "/result",
        state: {score: score}
      });
    }
  });

 

  return (
    <div>
      <div><p>Time remaining : {timer}</p></div>
      <div>      
        <p>Your score : {score}</p>
        <p>Did {actor} played in {movie}</p>
      </div>
      <div>
        <p>Your answer:</p>
        <button onClick={() => checkResult(true)}>True</button>
        <button onClick={() => checkResult(false)}>False</button>
      </div>
    </div>
  );
}
