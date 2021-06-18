import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import Quiz from './features/quiz/quiz';
import {update} from './features/quiz/highscoreSlice';

import './App.css';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Start />
          </Route>
          <Route path="/quiz">
            <Quiz />
          </Route>
          <Route path="/result">
            <End />
          </Route>
        </Switch>
      </div>   
    </Router>
  );
}

function Start() {
  return (
    <button>
      <Link to="/quiz">Start </Link>
    </button>
  )
}

function End(){

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const highscore = useSelector((state) => state.highscore.value);

  useEffect(saveScore, [location.state.score, highscore, dispatch]);

  function saveScore () {
    if (location.state.score > highscore) {
      dispatch(update(location.state.score))
    } 
  };

  function playAgain(){
    history.push("/");
  };

  return (
    <div>
      <p>Your actual score is : {location.state.score}</p>
      <p>Do you want to beat your highscore : {highscore}</p>
      <button onClick={playAgain}>Play again</button>
    </div>
  );
}

export default App;
