import React from 'react';
import ReactDOM from 'react-dom/client';

class ClassComponent extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            brand: "Ford",
            model: "Mustang",
            color: "red",
            year: 45445,
            counter: 0,
            text: "Dummy Text",
            testArray: [1, 2, 3, 4, 5],
            usersData: { "data": [] },
            loggedIn: false,
            username: "",
            password: "",
            error: ""

        };
        let sw = [1, 2, 3, 4, 5];
        sw.map((a) => (console.log(a)));
        
    }

   

    login = () => {

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                email: this.state.username,
                password: this.state.password,
                // expiresInMins: 60, // optional
            })
        };

        fetch('http://localhost:8081/login', postData)
            .then(
                res => res.json()
            )
            .then(
                res => {
                    console.log(res)
                    if (res.success) {
                        this.setState({ loggedIn: true });
                        this.setState({ username: res.user_details.first_name });
                        window.location.href="product_list";
                        // localStorage.setItem("user_id", res.user_details.first_name);
                        localStorage.setItem("user_id", res.user_details[0].id);
                        console.log(res.user_details[0])
                    }
                    else {
                        this.setState({ loggedIn: false });
                        this.setState({ error: "Wrong credentials" });
                        window.location.href="Nopage";

                    }
                }
            );

    }

    updateUserName = (event) => {
        let sw = event.target.value;
        const updatedValue = { username: sw };
        this.setState(updatedValue);
    }

    updatePassword = (event) => {
        let sw = event.target.value;
        const updatedValue = { password: sw };
        this.setState(updatedValue);
    }
    gotoSignUp=(event)=>{
        window.location.href="signup";
    }

    render() {
        let flag = true;
        let sw;
        if (!this.state.loggedIn) {
            sw = <div>

                <div className="row">
                <div className="col-lg-4 ">
                    </div>
                    <div className="col-lg-4 ">
                        <div className="mb-3 mt-3">
                            <label for="email" className="form-label">Email:</label>
                            <input type="email" value={this.state.username} onChange={this.updateUserName} className="form-control" id="email" placeholder="Enter email" name="email" />
                        </div>
                        <div className="mb-3">
                            <label for="pwd" className="form-label">Password:</label>
                            <input type="password" value={this.state.password} onChange={this.updatePassword} className="form-control" id="pwd" placeholder="Enter password" name="pswd" />
                        </div>
                        <button onClick={this.login} className="btn btn-primary">Login</button>       <pre></pre>
                  
                        <button onClick={this.gotoSignUp} className="btn btn-primary">Sign up</button>
                    </div>
                </div>               
            </div >;
        }
       
        return (sw);
    }
}

export default ClassComponent;