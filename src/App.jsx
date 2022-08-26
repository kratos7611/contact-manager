import React from "react";
import "./App.css";
import {Routes, Route, Navigate} from "react-router-dom"
import ContactList from "./components/contacts/ContactList/ContactList";
import ViewContact from "./components/contacts/ViewContact/ViewContact";
import AddContact from "./components/contacts/AddContact/AddContact";
import EditContact from "./components/contacts/EditContact/EditContact";
import Navbar from "./components/navbar/Navbar";
import "./css/Style.css"
// import Spinner from "./components/spinner/spinner";

function App() {
  return (
    <div className="App">
        {/* <Spinner /> */}
        <Navbar />
        <Routes>
          <Route path={"/"} element={<Navigate to={"/contacts/list"}/>}/>
          <Route path={"/contacts/list"} element={<ContactList />}/>
          <Route path={"/contacts/view/:contactID"} element={<ViewContact />} />
          <Route path={"/contacts/add"} element={<AddContact/>} />
          <Route path={"/contacts/edit/:contactID"} element={<EditContact/>} />
        </Routes>
    </div>
  );
}

export default App;
