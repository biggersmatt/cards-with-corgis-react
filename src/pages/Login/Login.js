require("./Login.css");

function Login() {
  return (
    <div className="login-container">
      <header>
        <h3>Cards With Corgis</h3>
        <p>Log into your party to play with your deck.</p>
        <p>To create a new party, click the button below.</p>
      </header>
      <form className="login-wrapper">
        <h4>Login</h4>
        <div className="login-section">
          <label htmlFor="first-name">Enter Your First Name</label>
          <input 
            type="text"
            id="first-name"
            name="first-name"
          />
        </div>
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
        <button className="login-btn" type="submit">Login</button>
      </form>
      <div className="login-create-party">
        <h3>- Or -</h3>
        <button className="login-create-party-btn">Create New Party</button>
      </div>
    </div>
  )
}

export default Login;