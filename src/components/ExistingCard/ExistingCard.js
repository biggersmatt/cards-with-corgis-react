// React
import React, { useState } from "react";
import { Redirect } from "react-router-dom";


function ExistingCard(props) {
  let [redirect, setRedirect] = useState(null);
  
  if(redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <div className="manage-this-card" key={props.cardId}>
      <p>{props.prompt}</p>
      <button onClick={() => setRedirect(redirect = `/playorcreate/create/${props.cardId}`)}>Edit</button>
      <button>Delete</button>
    </div>
  )
}

export default ExistingCard;