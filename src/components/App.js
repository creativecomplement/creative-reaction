import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Story, Creation, Nasa, About, Sheets, Todos } from ".";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/mystory" exact component={() => <Story />} />
          <Route path="/creative" exact component={() => <Creation />} />
          <Route path="/nasa" exact component={() => <Nasa />} />
          <Route path="/sheets" exact component={() => <Sheets />} />
          <Route path="/todos" exact component={() => <Todos />} />
          <Route path="/about" exact component={() => <About />} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
