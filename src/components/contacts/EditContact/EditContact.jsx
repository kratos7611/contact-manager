import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../../services/ContactService";
import Spinner from "../../spinner/spinner";

export default function EditContact() {
  let navigate = useNavigate();
  let { contactID } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  useEffect(() => {
    let getContact = async () => {
      try {
        setState({
          ...state,
          loading: true,
        });
        let response = await ContactService.getContact(contactID);
        let getGroups = await ContactService.getAllGroups();
        setState({
          ...state,
          contact: response.data,
          groups: getGroups.data,
          loading: false,
        });
      } catch (error) {
        setState({
          ...state,
          errorMessage: "error",
        });
      }
    };
    getContact();
  }, [contactID]);

  let updateContact = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let formSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactID
      );
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      console.log("error");
        navigate(`/contacts/edit/${contactID}`, { replace: false });
    }
  };

  let { loading, contact, errorMessage, groups } = state;

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <section className="add-contact p-4">
          <div className="container">
            <div className="row">
              <div className="col">
                <h3 className="add-contact-text text-primary fw-bold">
                  Edit Contact
                </h3>
                <p className="fst-italic">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Accusantium corporis non aspernatur harum, quos ratione
                  aperiam quas, odio impedit alias sint animi consectetur
                  nesciunt quod vero! Reprehenderit a voluptas beatae optio
                  distinctio non quia molestias enim totam odit. Alias, ad!
                </p>
              </div>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <form className="mt-2" onSubmit={formSubmit}>
                    <div className="mb-2">
                      <input
                        type="text"
                        required="true"
                        name="name"
                        onChange={updateContact}
                        value={contact.name}
                        placeholder="Name"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        required="true"
                        name="photo"
                        onChange={updateContact}
                        value={contact.photo}
                        placeholder="Photo URL"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="number"
                        required="true"
                        name="mobile"
                        onChange={updateContact}
                        value={contact.mobile}
                        placeholder="Mobile"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        required="true"
                        name="email"
                        onChange={updateContact}
                        value={contact.email}
                        placeholder="E-mail"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        required="true"
                        name="company"
                        onChange={updateContact}
                        value={contact.company}
                        placeholder="Company"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        required="true"
                        name="title"
                        onChange={updateContact}
                        value={contact.title}
                        placeholder="Title"
                        className="form-control"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        required="true"
                        name="groupId"
                        onChange={updateContact}
                        value={contact.groupId}
                        className="form-control"
                      >
                        <option value="">Select Group</option>
                        {groups.length > 0 &&
                          groups.map((group) => {
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
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                        Cancel
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img className="contact-picture" src={contact.photo} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </React.Fragment>
  );
}
