import React from 'react';
import ReactDOM from "react-dom";
import './FetchComponent.js';


function App() {
  return (
    <div className="App">

    <FetchComponent />

    </div>
    );
}

class FetchComponent extends React.Component{
  

  render(){
    let data = this.props.data;
    return <p>FetchComponent: {data} </p>
  }
}
export default App;

