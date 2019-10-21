import React, { Component } from 'react';
import MaterialTable from "material-table";

//Axios
const axios = require('axios');
const uriApi = ('http://localhost:8080/api/restaurants');

//Function Fetch with Axios
const getDatas = async function(){
  let data = await axios.get(uriApi);
}

//Call Function Fetch Axios
getDatas();


class FetchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: 'Nom', field: 'name' },
        { title: 'Cuisine', field: 'cuisine', initialEditValue: 'initial edit value' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
          title: 'Adresse',
          field: 'address',
        },
      ],
      data: [        
        { name: 'StarBuck NY', cuisine: 'Coffee', address: "13 wall street ,NY" },
        { name: 'Tour restaurant', cuisine: 'Gastronomique', address: "Paris" },
      ]
    }
  }

  render() {
    return (
      <MaterialTable
        title="Liste de restaurants"
        columns={this.state.columns}
        data={this.state.data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  data.push(newData);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = this.state.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  this.setState({ data }, () => resolve());
                }
                resolve()
              }, 1000)
            }),
        }}
      />
    )
  }
}
  

export default FetchComponent;