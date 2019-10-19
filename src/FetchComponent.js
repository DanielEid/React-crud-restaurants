import React, { Component } from 'react';

class FetchComponent extends React.Component{
  

  render(){
    let data = this.props.data;
    return <p>FetchComponent: {data} </p>
  }
}