import React from 'react';
import MaterialTable from "material-table";
import axios from 'axios';

//Axios
const uriApi = 'http://localhost:8080/api/restaurants';


class FetchComponent extends React.Component {
  state = {
    columns: [
      { title: 'Nom', field: 'name' },
      { title: 'Cuisine', field: 'cuisine', initialEditValue: 'initial edit value' },
      {
        title: 'id',field: 'id',
      },
    ],
    data: [        
      /*{ name: 'StarBuck NY', cuisine: 'Coffee', address: "13 wall street ,NY" },
      { name: 'Tour restaurant', cuisine: 'Gastronomique', address: "Paris" },*/
    ],
  }

  componentDidMount () {
    this.getRestaurants();
  }

  getRestaurants = async () => {
    let response = await axios.get(uriApi);
    console.log(response);
    this.setState({ data : response.data })
  };
  
  render() {
    console.log('DATA !!! ', this.state.data);


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