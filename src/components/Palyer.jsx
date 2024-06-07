import React, { useState } from "react";

const Palyer = ({ initialName, symbol, isActive, onChangeName }) => {
  const [palyerName, setPalyerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditing() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, palyerName);
    }
  }

  function handleChange(event) {
    setPalyerName(event.target.value);
  }

  let editedPalyerName = <span className="palyer-name">{palyerName}</span>;
  //   let buttonCaption = "Edit";
  if (isEditing) {
    editedPalyerName = (
      <input type="text" value={palyerName} required onChange={handleChange} />
    );
    // buttonCaption = "Save";
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editedPalyerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Palyer;
