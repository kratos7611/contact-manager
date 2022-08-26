import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../services/ContactService";

export default function AddContact() {
  let navigate = useNavigate();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      company: "",
      email: "",
      title: "",
      mobile: "",
      photo: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllGroups();
        setState({
          ...state,
          loading: false,
          groups: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: "error",
        });
      }
    };

    fetchData();
  }, []);

  let formSubmit = async(event) => {
    event.preventDefault();

    try {
      let response = await ContactService.createContact(state.contact);
      if (response) {
        navigate('/contacts/list', {replace:true})
      }
    }
    catch (error) { 
      console.log("error")
      navigate ('/contacts/add', {replace:false})
    }
  }  

  return (
    <div>
      <section className="add-contact p-4">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="add-contact-text text-success fw-bold">
                Add Contact
              </h3>
              <p className="fst-italic">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Accusantium corporis non aspernatur harum, quos ratione aperiam
                quas, odio impedit alias sint animi consectetur nesciunt quod
                vero! Reprehenderit a voluptas beatae optio distinctio non quia
                molestias enim totam odit. Alias, ad!
              </p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <form className="mt-2" onSubmit={formSubmit}>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="name"
                      value={state.contact.name}
                      onChange={updateInput}
                      placeholder="Name"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="photo"
                      value={state.contact.photo}
                      onChange={updateInput}
                      placeholder="Photo URL"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="number"
                      name="mobile"
                      value={state.contact.mobile}
                      onChange={updateInput}
                      placeholder="Mobile"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="email"
                      name="email"
                      value={state.contact.email}
                      onChange={updateInput}
                      placeholder="E-mail"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="company"
                      value={state.contact.company}
                      onChange={updateInput}
                      placeholder="Company"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="title"
                      value={state.contact.title}
                      onChange={updateInput}
                      placeholder="Title"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <select
                      required={true}
                      name="groupId"
                      value={state.contact.groupId}
                      onChange={updateInput}
                      className="form-control"
                    >
                      <option value="">Select Group</option>
                      {state.groups.length > 0 &&
                        state.groups.map((group) => {
                          return (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="mb-2 mt-3">
                    <input
                      onClick={formSubmit}
                      type="submit"
                      className="btn btn-success"
                      value="Create"
                    />
                    <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                      Cancel
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
 