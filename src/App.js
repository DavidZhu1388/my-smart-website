import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Sidebar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Pages/Home';
import History from './components/Pages/History';
import Signin from './components/Pages/Signin/Signin';
import Register from './components/Pages/Register/Register';

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
        images: [], //array of image urls
        faceboxes: []  //array of faceboxes for each image
      }
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(console.log)
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
        images: [],
        faceboxes: []
      }
    })
  }

  loadImages = (data) => {  // todo - remember to add the images and faceboxes to the user object
    // this.setState(prevState => ({
    //   // user: {
    //   //   id: this.state.user.id,
    //   //   name: this.state.user.name,
    //   //   email: this.state.user.email,
    //   //   entries: this.state.user.entries,
    //   //   joined: this.state.user.joined,
    //   //   images: data.images,
    //   //   faceboxes: data.faceboxes
    //   // }
    //     user: {
    //       ...prevState.user,
    //       images: data.images,
    //       faceboxes: data.faceboxes
    //     }
    //   }), () => {
    //     // This will show the updated state
    //     console.log(this.state.user);
    //   });
    this.setState(() => ({
      user: {
        id: this.state.user.id,
        name: this.state.user.name,
        email: this.state.user.email,
        entries: this.state.user.entries,
        joined: this.state.user.joined,
        images: data.images,
        faceboxes: data.faceboxes
      }
    }), () => {
      // This will show the updated state
      console.log(this.state.user);
    })
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Router>
          <div style={{ zIndex: 1 }}>
            <Navbar onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          </div>
          <div style={{ zIndex: -5 }}>
            {route === 'home' ?
              <Home user={this.state.user}
              />
              : (route === 'history' ?
                <History
                  user={this.state.user}
                />
                : (route === 'signin'
                  ? <Signin loadUser={this.loadUser} loadImages={this.loadImages} onRouteChange={this.onRouteChange} />
                  : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                ))
            }
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
