import React, { Component } from 'react';
import MaterialTable from "material-table";


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
        title="Editable Preview"
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