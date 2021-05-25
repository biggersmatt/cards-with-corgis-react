// React
import React from "react";
import { Link } from "react-router-dom";


function ExistingCard(props) {

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
  
  return (
    <div className="manage-this-card" key={props.cardId}>
      <p>{props.prompt}</p>
      <Link to={`/playorcreate/create/${props.cardId}`}>Edit</Link>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default ExistingCard;