// React
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

require("./ExistingCard.css");

function ExistingCard(props) {

  let [redirect, setRedirect] = useState(null);

  const handleDelete = () => {
    fetch(`http://localhost:4000/card/${props.cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => alert("Card Deleted"))
    .then(() => props.handleExistingCards())
    .catch((err) => console.log(err))
  }

  if(redirect) {
    return <Redirect to={redirect} />
  }
  
  return (
    <div className="manage-this-card shadow" key={props.cardId}>
      <div className="manage-card-prompt">
        <p>{props.prompt}</p>
      </div>
      <div className="manage-card-btns">
        <button 
          onClick={() => setRedirect(redirect = `/playorcreate/create/${props.cardId}`)}
          className="manage-card-btn"
        >
        Edit
        </button>
        <button 
          onClick={handleDelete}
          className="manage-card-btn"
        >
        Delete
        </button>
      </div>
    </div>
  )
}

export default ExistingCard;