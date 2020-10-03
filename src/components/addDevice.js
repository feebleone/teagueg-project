import React, { Component } from "react";

export default class AddDevice extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveDevice = this.saveDevice.bind(this);
    this.newDevice = this.newDevice.bind(this);

    this.state = {
      id: null,
      name: "",
      path: "",
      description: "",
      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  saveDevice() {
    const data = {
      name: this.state.name,
      description: this.state.description,
      path: this.state.path,
      id: this.state.id,
    };

    var myInit = { method: "POST", headers: {}, body: data };
    fetch("/device", myInit)
      .then((response) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          path: response.data.path,
          submitted: true,
        });
        return response.json();
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
      })
      .catch((e) => console.log(e));
  }

  newDevice() {
    this.setState({
      id: null,
      name: "",
      path: "",
      description: "",
      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newDevice}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveDevice} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
