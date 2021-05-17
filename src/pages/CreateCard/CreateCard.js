require("./CreateCard.css");

function CreateCard() {
  return (
    <div className="create-card-container">
      <header>
        <h3>Welcome "First Name"</h3>
        <p>Create new cards to add to the deck.</p>
        <p>Manage cards that you have already created.</p>
      </header>
      <div className="create-card-wrapper">
        <h3>Create a New Card</h3>
        <textarea name="prompt" id="prompt" cols="30" rows="10"></textarea>
        <button>Create Card</button>
      </div>
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