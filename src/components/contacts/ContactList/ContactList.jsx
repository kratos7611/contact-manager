import React from "react";
import { useState } from "react";
import "../../../css/Style.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ContactService } from "../../services/ContactService";
import Spinner from "../../spinner/spinner";

export default function ContactList() {
  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: "",
  });
  
  let[query, setQuery] = useState({
    text: ""
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        });
      } catch (error) {
        console.log("Error");
      }
    };

    fetchData();
  }, []);

  let clickDelete = async(contactID) => {
    try{
      let response = await ContactService.deleteContact(contactID)
      if (response) {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data
        });
      }
    }
    catch (error) {
      console.log("Error");
    }
  }

  let searchContact = (event) => {
    setQuery({...query, text: event.target.value})

      let searchedContact = state.contacts.filter(contact => {
        return contact.name.toLowerCase().includes(event.target.value.toLowerCase());
      })

      setState({...state, filteredContacts: searchedContact})

  }

  return (
    <div>
      <section className="contactManager p-4">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3>
                Contact Manager
                <Link
                  to={"/contacts/add"}
                  className="btn btn-primary i i-plus ms-2"
                >
                  <i className="fa fa-plus-circle me-2"></i>
                  Add Contact
                </Link>
              </h3>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda quaerat porro cum aspernatur modi dolorem accusamus
                quidem laudantium voluptates expedita corrupti, ducimus, vel in
                at vitae facilis fugiat magni rem mollitia. Quae atque
                aspernatur cupiditate deserunt adipisci assumenda nihil amet!
              </p>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      name="text"
                      value={query.text}
                      onChange={searchContact}
                      className="form-control"
                      placeholder="Search Contact"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="submit"
                      placeholder="Search"
                      className="btn btn-success"
                      value="Search Contact"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {state.loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="contact-card">
            <div className="container">
              <div className="row">
                {
                state.filteredContacts.length > 0 &&
                  state.filteredContacts.map((contact) => {
                    return (
                      <div className="col-md-6" key={contact.id}>
                        <div className="card my-3">
                          <div className="card-body">
                            <div className="row align-items-center">
                              <div className="col-md-4">
                                <img
                                  src={contact.photo}
                                  className="img-fluid contact-picture"
                                  alt="image"
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name:
                                    <span className="fw-bold"> {contact.name}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Number:
                                    <span className="fw-bold"> {contact.mobile}</span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    E-mail:
                                    <span className="fw-bold">
                                      {" "}
                                      {contact.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1">
                                <Link
                                  to={`/contacts/view/${contact.id}`}
                                  className="btn btn-warning btn-fluid mb-2"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contact.id}`}
                                  className="btn btn-primary btn-fluid mb-2"
                                >
                                  <i className="fa fa-pen"></i>
                                </Link>
                                <button className="btn btn-danger btn-fluid" onClick={() => {clickDelete(contact.id)}}>
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </div>
  );
}
