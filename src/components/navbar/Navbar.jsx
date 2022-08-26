import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav>
        <nav className="navbar bg-dark ml-5">  
          <div className="container">
            <Link to={"/"} className="navbar-brand text-light"><i class="fa-solid fa-mobile-button text-light"></i>&nbsp;&nbsp;&nbsp;Contact Manager</Link>
          </div>
        </nav>
      </nav>
    </div>
  );
}
