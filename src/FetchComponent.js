import React from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import { func } from 'prop-types';

//Axios
const uriApi = 'http://localhost:8080/api/restaurants';


class FetchComponent extends React.Component {
  state = {
    columns: [
      { title: 'Nom', field: 'name' },
      { title: 'Cuisine', field: 'cuisine', initialEditValue: 'initial edit value' },
      {
        title: 'id',field: '_id',
      },
    ],
    data: [        
      /*{ name: 'StarBuck NY', cuisine: 'Coffee', address: "13 wall street ,NY" },
      { name: 'Tour restaurant', cuisine: 'Gastronomique', address: "Paris" },
    */],
  }

  componentDidMount () {
    //this.getRestaurants();
    //this.postRestaurant('AAA','BBB');
    //this.putRestaurant('5d9dd9540e36bccc0b016e46','Bonjoir','AmericaHAHAH');
    //this.deleteRestaurant('5d9dd9540e36bccc0b016e46');
    this.getRestaurants();

  }

  /*TABLEPAGINATION*/ 
/*CRUD*/

  getRestaurants = async (page,pagesize) => {  
    let response = await axios.get(uriApi + '?page=' + page + '&pagesize=' + pagesize);
    this.setState({ data : response.data.data })
  };

  postRestaurant = async (name,cuisine) => {
    let response = await axios.post(uriApi,{
      name : name,
      cuisine: cuisine
    })
  }
  putRestaurant = async (id,name,cuisine) =>{
    let response = await axios.put(uriApi +'/'+ id,{
      name : name,
      cuisine: cuisine
    })
  }
  deleteRestaurant = async (id) =>{
    let response = await axios.delete(uriApi +'/'+ id)
  }
  
  render() {
    return (
      <MaterialTable
        title="Liste de restaurants"
        columns={this.state.columns}
        data={this.state.data}
       /* onSearchChange=/*TOn get*/
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;                  
                  data.push(newData);
                  //Ajout d'un restaurant dans la BDD//
                  this.postRestaurant(newData.name,newData.cuisine);
                  //
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