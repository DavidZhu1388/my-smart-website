import React, { Component } from 'react'
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../FaceRecognition/FaceRecognition';
window.process = {};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      box: []
    }
  }

  calculateFaceLocation = (data) => {
    console.log(data);
    const clarifaiFace = data.region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    const { user } = this.props;

    this.setState({ imageUrl: this.state.input });  //submit image url to server then fetch the results

    fetch('https://my-smart-website-api.onrender.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://my-smart-website-api.onrender.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(user, { entries: count }))
            })
            .catch(console.log)
        }

        const faceLocations = []; // Accumulate face locations here

        // Loop through all faces and display their locations
        for (let i = 0; i < response.outputs[0].data.regions.length; i++) {
          const faceBox = this.calculateFaceLocation(response.outputs[0].data.regions[i]);
          faceLocations.push(faceBox);
        }

        this.setState({ box: faceLocations }); // Update state after loop

        // Initialize arrays if they are undefined
        user.images = user.images || [];
        user.faceboxes = user.faceboxes || [];

        user.images.push(this.state.input);
        user.faceboxes.push(faceLocations);

        // console.log(user.images);
        // console.log(user.faceboxes);


        fetch('https://my-smart-website-api.onrender.com/saveimage', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
              input: this.state.input,
              boxes: faceLocations
            })
          })
          .then(response => response.json())
          .then(response => {
            if (response) {
              console.log("rendered successfully");
            }
          })
          .catch(console.log)
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div style={{zIndex: -5}}>
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    )
  }
}

export default Home