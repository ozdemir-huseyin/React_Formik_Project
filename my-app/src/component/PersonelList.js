import React from "react";
import { fetchUrl } from "./FetchApi";
import DeleteIcon from "./DeletIcon";
function PersonelList({ participant, getList }) {
  const handleDelete = async (Id) => {
    try {
      const response = await fetch(`${fetchUrl}/${Id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);
      getList();
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {participant.map((item) => (
            <tr className="hover" key={item.id}>
              <td>{item.id}</td>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email} </td>
              <td className="trash">
                <button onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default PersonelList;
