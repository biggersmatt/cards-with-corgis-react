// React
import React from "react";
import { Link } from "react-router-dom";


function ExistingCard(props) {
  
  return (
    <div className="manage-this-card" key={props.cardId}>
      <p>{props.prompt}</p>
      <Link to={`/playorcreate/create/${props.cardId}`}>Edit</Link>
      <button>Delete</button>
    </div>
  )
}

export default ExistingCard;