function ExistingCard(props) {
  return (
    <div className="manage-this-card" key={props.reactKey}>
      <p>{props.prompt}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )
}

export default ExistingCard;