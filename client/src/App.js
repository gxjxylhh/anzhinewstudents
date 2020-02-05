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
            studentname: '',
            phonenumber: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    /*
    mySubmitHandler = (event) => {
        event.preventDefault();
        alert("You are submitting " + this.state.studentname);
    }
    myChangeHandler = (event) => {
        //this.setState({username: event.target.value});
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }
    */
    axiosGetData = (event) => {
        axios.get('http://localhost:5000/watch',{

        })
            .then((response) => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    axiosPostData = (event) => {
        axios.post('http://localhost:5000/test', {
            studentname: this.state.studentname,
            phonenumber: this.state.phonenumber
        })
            .then(function (response) {
                console.log(response);
                alert('A name was submitted: ' + this.state.studentname+ 'age is'+this.state.phonenumber);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    //used to insert multiple data as json object maybe
    axiosPostManyData = (event) => { //Not working
        axios.post('http://localhost:5000/insertmany', {
            //studentname: this.state.studentname,
            //phonenumber: this.state.phonenumber
        })
            .then(function (response) {
                console.log(response);
                //alert('A name was submitted: ' + this.state.studentname+ 'age is'+this.state.phonenumber);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    handleChange (event) {

        this.setState({[event.target.name]:event.target.value});
    }


    handleSubmit(event) {
        // event.preventDefault();
        // alert('A name was submitted: ' + this.state.studentname+ 'age is'+this.state.phonenumber);

    }


    render() {
        let header = '';

        return (

            <div className="App">
                <form onSubmit={this.axiosPostData}>
                    <label>Enter your student name:</label>
                    <input
                        type='text'
                        name='studentname'
                        value={this.state.studentname}
                        onChange={this.handleChange}
                    />
                    <label>Enter your phone number:</label>
                    <input
                        type='text'
                        name='phonenumber'
                        value={this.state.phonenumber}
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="Submit" />
                </form>
                <form onSubmit={this.axiosPostManyData}>
                    <input type="submit" value="submitMany" />

                </form>
                <form onSubmit={this.axiosGetData}>
                    <input type="submit" value="getData" />

                </form>
                <h1>Click below to pop up </h1>
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