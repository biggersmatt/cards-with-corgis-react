require("./CreateParty.css");

function CreateParty() {
  return (
    <div className="create-party-container">

      <header>
        <h1>Create a New Party</h1>
        <p>Once you've created a Party, you'll be able to have anyone attending add custom cards they've created to the deck.</p>
      </header>

      <form className="login-wrapper">
        <h4>What's Your Party Name?</h4>
        <div className="login-section">
          <label htmlFor="party-name">Party Name</label>
          <input 
            type="text"
            id="party-name"
            name="party-name"
          />
        </div>
        <div className="login-section">
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button className="login-btn" type="submit">Create New Party</button>
      </form>

    </div>
  )
}

export default CreateParty;