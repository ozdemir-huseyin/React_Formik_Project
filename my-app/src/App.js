import React, { useEffect, useState } from "react";
import PersonelList from "./component/PersonelList";
import { fetchUrl } from "./component/FetchApi";
import "./App.css";
import FormikForm from "./component/FormikForm";

function App() {
  const [participant, setParticipant] = useState([]);
  async function getList() {
    const response = await fetch(fetchUrl);
    const data = await response.json();
    setParticipant(data);
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className=" App_container">
      <div className="App">
        <h1 className="form_title"> Add participant</h1>
        <FormikForm getList={getList} />
      </div>

      <div className="Personel_List">
        <PersonelList participant={participant} getList={getList} />
      </div>
    </div>
  );
}

export default App;
