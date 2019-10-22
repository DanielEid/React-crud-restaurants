import React from 'react';
import MaterialTable from "material-table";
import axios from 'axios';

//Axios CRUD
const uriApi = 'http://localhost:8080/api/restaurants';


class FetchComponent extends React.Component {
  state = {
    columns: [
      { title: 'Nom', field: 'name' },
      { title: 'Cuisine', field: 'cuisine'},
      { title: 'id',field: '_id', editable : false, hidden :true
      },
    ],
    data: []
  }

  componentDidMount () {
    this.getRestaurants();
  }

/*CRUD*/

  getRestaurants = async (page,pagesize) => {  
    let response = await axios.get(uriApi + '?page=' + page + '&pagesize=' + pagesize);
    this.setState({ data : response.data.data })
  };

  postRestaurant = async (name,cuisine) => {
    let response = await axios.post(uriApi,{
      nom : name,
      cuisine: cuisine
    })
  }
  putRestaurant = async (id,name,cuisine) =>{
    let response = await axios.put(uriApi +'/'+ id,{
      nom : name,
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
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = this.state.data;                  
                  data.push(newData);
                  //CRUD POST
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
                  //CRUD PUT
                    console.log(this.putRestaurant(newData._id,newData.name,newData.cuisine));
                  //
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
                  let dataToDelete = data[index];
                  //CRUD DELETE
                  console.log(dataToDelete._id);
                  this.deleteRestaurant(dataToDelete._id);
                  //
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