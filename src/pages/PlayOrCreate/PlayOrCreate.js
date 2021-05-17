require("./PlayOrCreate.css");

function PlayOrCreate() {
  return (
    <div className="play-or-create-container">
      <header>
        <h3>Welcome to "Party Name"</h3>
        <p>Play Cards With Corgis with the cards that have been added to this party's deck.</p>
        <p>Click Cards to create, edit or delete cards that you have created.</p>
      </header>

      <div className="play-or-create-wrapper">
        <button className="play-or-create-btn">Play</button>
        <button className="play-or-create-btn">Cards</button>
      </div>

    </div>
  )
}

export default PlayOrCreate;