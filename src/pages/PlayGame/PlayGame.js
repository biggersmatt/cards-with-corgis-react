require("./PlayGame.css")

function PlayGame() {
  return (
    <div className="playgame-container">
      <h1>"Party Name"</h1>
      <div className="playgame-wrapper">
        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, qui?</h4>
        <h5 className="playgame-author">Created By: "firstName"</h5>
      </div>
      <button className="playgame-next-btn">Next</button>
    </div>
  )
}

export default PlayGame;