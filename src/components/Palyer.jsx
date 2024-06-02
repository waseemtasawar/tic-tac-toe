import React, { useState } from "react";

const Palyer = ({ name, symbol }) => {
  const [isEditing, setIsEditing] = useState(false);

  function HandleEditing() {
    setIsEditing(true);
  }
  let palyerName = <span className="palyer-name">{name}</span>;
  //   let buttonCaption = "Edit";
  if (isEditing) {
    palyerName = <input type="text" required />;
    // buttonCaption = "Save";
  }
  return (
    <li>
      <span className="player">
        {palyerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={HandleEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Palyer;
