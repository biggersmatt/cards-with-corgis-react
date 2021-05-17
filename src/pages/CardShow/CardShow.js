require("./CardShow.css");

function CardShow() {
  return (
    <div className="card-show-container">
      <header>
        <h3>Edit Your Cards</h3>
        <p>You can edit/update this card.</p>
      </header>
      <div className="card-show-wrapper">
        <h3>Update This Card</h3>
        <textarea 
          name="prompt" 
          id="prompt" 
          cols="30" 
          rows="10"
          placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, qui?"
          >
          </textarea>
        <button>Update Card</button>
      </div>
    </div>
  )
}

export default CardShow;