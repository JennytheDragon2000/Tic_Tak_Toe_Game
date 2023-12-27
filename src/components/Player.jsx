import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onNameChange,
}) {
  const [playerName, setplayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleclick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onNameChange(symbol, playerName);
    }
  }
  function handleNameChange(event) {
    console.log(event);
    setplayerName(event.target.value);
  }

  let editableName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editableName = (
      <input type="text" id="lname" name="lname" onChange={handleNameChange} />
    );
  }

  return (
    <li className={isActive ? "active" : null}>
      <span className="player">
        {editableName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleclick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
