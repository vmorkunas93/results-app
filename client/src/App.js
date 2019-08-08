import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications'
import Home from './components/Home';
import addScore from './components/AddScore';
import Random from './components/Random';
import Scores from './components/Scores';
import NavBar from './components/NavBar';
import Stats from './components/Stats';
import './App.css';

function App() {
  return (
    <ToastProvider placement="top-center">
      <div className="App">
        <Router>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/random/" component={Random} />
          <Route path="/addScore/" component={addScore} />
          <Route path="/scores/" component={Scores} />
          <Route path="/stats/" component={Stats} />
        </Router>
      </div>
    </ToastProvider>
  );
}

export default App;
