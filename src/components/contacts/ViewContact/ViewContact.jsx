import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ContactService } from "../../services/ContactService";
import Spinner from "../../spinner/spinner";

export default function ViewContact() {
  let { contactID } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: "",
    group: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactID);
        let groupResponse = await ContactService.getGroup(response.data)
        setState({
          ...state,
          loading: false,
          contact: response.data,
          group: groupResponse.data
        });
      } catch (error) {
        console.log("Error");
      }
    };

    fetchData();
  }, [contactID]);

  return (
    <div>
      <section className="p-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <h3 className="text-warning fw-bold">Contact Information</h3>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
                repellendus consequatur dolores quaerat similique ut, odio vel.
                Officia illum nulla, perspiciatis q uae laboriosam nesciunt eum
                magni tempora quis maiores repellendus eaque hic quo, in quam
                quia neque autem dolorem dignissimos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {state.loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(state.contact).length > 0 && Object.keys(state.group).length > 0 && (
            <section className="mt-3">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img
                      className="contact-picture"
                      src={state.contact.photo}
                      alt=""
                    />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name:<span className="fw-bold"> {state.contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Number:<span className="fw-bold"> {state.contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        E-mail:
                        <span className="fw-bold"> {state.contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Company:<span className="fw-bold"> {state.contact.company}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title:<span className="fw-bold"> {state.contact.title}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Group:<span className="fw-bold"> {state.group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Link
                      to={"/contacts/list"}
                      className="btn btn-warning mt-5"
                    >
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
