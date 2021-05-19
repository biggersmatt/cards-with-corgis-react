// React
import React, { useState } from "react";
// import { Redirect } from "react-router-dom";

// CSS
require("./CreateCard.css");

function CreateCard(props) {

  const [card, setCard] = useState({
    prompt: "",
  })

  // let [redirect, setRedirect] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCard = {
      prompt: card.prompt,
      author: props.firstName,
      discard: false,
    }

    console.log(newCard);
    setCard({
      prompt: "",
    })

    alert("New Card Created")
  }

  const handleChange = (event) => {
    if(event.target.id === "prompt") {
      setCard(prevCard => {
        return {
          ...prevCard,
          prompt: event.target.value,
        }
      })
    }
  }

  // if(redirect) {
  //   return <Redirect to={redirect} />
  // }

  return (
    <div className="create-card-container">
      <header>
        <h3>Welcome {props.firstName}</h3>
        <p>Create new cards to add to the deck.</p>
        <p>Manage cards that you have already created.</p>
      </header>


      <form className="create-card-wrapper" onSubmit={handleSubmit}>
        <h3>Create a New Card</h3>
        <textarea 
          name="prompt" 
          id="prompt" 
          value={card.prompt}
          cols="30" 
          rows="10"
          onChange={handleChange}
          >
          </textarea>
        <button type="submit">Create Card</button>
      </form>


      <div className="manage-cards">
        <h3>"First Name"'s Cards</h3>
        <div className="manage-this-card">
          <p>Prompt</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div className="manage-this-card">
          <p>Prompt</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div className="manage-this-card">
          <p>Prompt</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div className="manage-this-card">
          <p>Prompt</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div className="manage-this-card">
          <p>Prompt</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div className="manage-this-card">
          <p>Prompt</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div className="manage-this-card">
          <p>Prompt</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div className="manage-this-card">
          <p>Prompt</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div className="manage-this-card">
          <p>Prompt</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default CreateCard;