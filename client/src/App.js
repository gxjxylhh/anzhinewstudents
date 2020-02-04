import React,{ Component } from 'react';
import ReactDOM from "react-dom";
import Popup from "reactjs-popup";
import Content from "./Content.js";
const axios = require ('axios');

const reactData = [{ id: 1, name:' Tom'}, { id: 2, name:' Sarah'}];


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
        };
        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        alert("You are submitting " + this.state.firstname);
    }
    myChangeHandler = (event) => {
        //this.setState({username: event.target.value});
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    axiosGetData = () => { //Not working
        axios({
            url: "https://localhost:5000/test",
            method: 'post',
            headers: { "Content-Type": "application/json" }
        }).then(res => {
                console.log(`Axios Call completed: ${res}`)
            });

    }



    handleChange (event) {

        this.setState({[event.target.name]:event.target.value});
    }


    handleSubmit(event) {
        event.preventDefault();
        alert('A name was submitted: ' + this.state.firstname+ 'age is'+this.state.lastname);

    }


    render() {
        let header = '';

        return (

            <div className="App">
                <form onSubmit={this.axiosGetData}>
                    <label>Enter your name:</label>
                    <input
                        type='text'
                        name='firstname'
                        value={this.state.firstname}

                        onChange={this.handleChange}
                        //onChange={this.myChangeHandler}
                    />
                    <label>Enter your age:</label>
                    <input
                        type='text'
                        name='lastname'
                        value={this.state.lastname}
                        onChange={this.handleChange}
                        //onChange={this.myChangeHandler}
                    />
                    <input type="submit" value="Submit" />
                </form>

                <h1>Create React Modal with 22 line of code </h1>
                <Popup modal trigger={<button>Click Me</button>}>
                    {close => <Content close={close} />}
                </Popup>
            </div>

        )
    }
    /*
    handleClick(){

        window.open("/MyScreen");
    }

     */


}
export default App
