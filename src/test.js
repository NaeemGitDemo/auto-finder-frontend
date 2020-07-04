import React from 'react';


const imageURL = 'https://autofinder-car-images.s3.us-east-2.amazonaws.com/Accord.jpg'


class Header extends React.Component {

  render() {
    return <img src={imageURL} alt="Logo" />;
  }
}




export default Header;