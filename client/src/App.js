import React, {Component} from 'react';
import Popup from "reactjs-popup";
import Content from "./Content.js";
import fetch from "node-fetch";

const axios = require('axios');


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentname: '',
            phonenumber: '',
            searchname: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.axiosPostData = this.axiosPostData.bind(this);
        this.fetchGetData = this.fetchGetData.bind(this);
        //this.fetchSpecificData = this.fetchSpecificData(this);
        //this.axiosPostSearch = this.axiosPostSearch(this);
        //this.axiosGetData = this.axiosGetData.bind(this);
    }
    showresult = (response) =>{
        console.log(response);

    }

    fetchGetData = (event) => {
        event.preventDefault();
        console.log(event.target.searchname.value);
        let a = "ed";
        fetch("http://localhost:5000/watch/"+event.target.searchname.value)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }
                    // Examine the text in the response
                    response.json().then(function (data) {
                        console.log("anohter one");
                        console.log(data);

                        //this.showresult(data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }



    //https://developers.google.com/web/updates/2015/03/introduction-to-fetch

    //  event.preventDefault(); is used to prevent frontend real actions
    //  (in this case :to refresh itself automatically when changes are made)

    axiosPostData = (event) => {
        //  event.preventDefault(); is used to prevent frontend real actions
        //  (in this case :to refresh itself automatically when changes are made)
        event.preventDefault();
        //this.setState({[event.target.name]:event.target.value});
        console.log(this.state.searchname);
        axios.post('http://localhost:5000/test', {
            studentname: this.state.studentname,
            phonenumber: this.state.phonenumber,
        })
            .then(function (response) {
                console.log(response);

                //alert('A name was submitted: ' + this.state.studentname + 'age is' + this.state.phonenumber);
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    handleChange(event) {
        //prevent may not needed?
        //event.preventDefault();
        //value: event.target.value
        this.setState({[event.target.name]:event.target.value});

    }


    handleSubmit(event) {
        event.preventDefault();
        //alert('A name was submitted: ' + this.state.studentname+ 'age is'+this.state.phonenumber);
        alert("yiha");
    }


    render() {
        let header = '';

        return (

            <div className="App">
                <form onSubmit={this.fetchGetData}>
                    <label>You want to search:</label>
                    <input
                        type='text'
                        name='searchname'
                        value={this.state.searchname}
                        onChange={this.handleChange}
                    />
                    <input type="submit" value="getData"/>

                </form>

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

                    <input type="submit" value="Submit"/>

                </form>


                <h1>Click below to pop up </h1>
                <Popup modal trigger={<button>Click Me</button>}>
                    {close => <Content close={close}/>}
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