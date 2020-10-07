import React, { useState, useEffect } from "react";
import DeviceDataService from "../services/deviceService";
import { Link } from "react-router-dom";

const DevicesList = () => {
  const [devices, setDevices] = useState([]);
  const [currentDevice, setCurrentDevice] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveDevices();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveDevices = () => {
    DeviceDataService.getAll()
      .then((response) => {
        setDevices(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveDevices();
    setCurrentDevice(null);
    setCurrentIdx(-1);
  };

  const setActiveDevice = (device, idx) => {
    setCurrentDevice(device);
    setCurrentIdx(idx);
  };

  const removeAllDevices = () => {
    DeviceDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    DeviceDataService.findByName(searchName)
      .then((response) => {
        setDevices(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Device List</h4>

        <ul className="list-group">
          {devices &&
            devices.map((device, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIdx ? "active" : "")
                }
                onClick={() => setActiveDevice(device, index)}
                key={index}
              >
                {device.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllDevices}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentDevice ? (
          <div>
            <h4>Device</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentDevice.id}
            </div>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentDevice.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentDevice.description}
            </div>
            <div>
              <label>
                <strong>Path:</strong>
              </label>{" "}
              {currentDevice.path}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentDevice.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/devices/" + currentDevice.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Device...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicesList;
