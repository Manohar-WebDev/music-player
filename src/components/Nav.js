import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//below we import icons
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ toggleLibrary, setToggleLibrary }) => {
  return (
    <nav>
      <h1>Waves</h1>
      <div className="button">
        <button
          onClick={() => {
            setToggleLibrary(!toggleLibrary);
          }}
        >
          Library
          <FontAwesomeIcon icon={faMusic} />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
