import React, {Component} from 'react';
import Popup from "reactjs-popup";
import Content from "./Content.js";
import fetch from "node-fetch";
import 'whatwg-fetch';
import Autocomplete from "./Autocomplete.js";


const axios = require('axios');

const utsmajors = ["A","AcB","C","Adult Education","3A3","ACCT3001","ACCT3002"];

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentname: '',
            phonenumber: '',
            searchname: '',
            majorname:'',
            uniname: '',
        };
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.axiosPostData = this.axiosPostData.bind(this);
        this.fetchGetData = this.fetchGetData.bind(this);

    }
    /*
    getFromChild = (value) => {
        this.setState({majorname:value})
    }*/
    //Used to find specific value according to users' input
    //Somehow ios cant send or retrieve info using fetch/axios
    fetchGetData = (event) => {

        event.preventDefault();
        console.log(event.target.majorname.value+" major is");
        console.log("the state majorname is "+ this.state.majorname);
        console.log("uni name is "+ this.state.uniname);
        //Also Note that majorname as a selected result that sent from auto complete
        //can not be saved into state of App somehow
        //192.168.1.104 as localhost address

        //change database entry

        fetch("http://192.168.1.104:5000/uni/" +this.state.uniname)
            .then((res) =>{
                console.log(res);
            },(error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            })
        //change collection(major) entry
        fetch("http://192.168.1.104:5000/search/" +event.target.majorname.value)
            .then(res => res.json())
            .then(
                (res) => {
                    //element can be obatined through res[0].elementname
                    //since res is represented as array there
                    if(res.length === 0){
                        alert("No course found, please press button again or check your spelling"+
                            "\n\nps: only capitalized university name available eg: USYD,UNSW,UTS"+
                            "\n\npps: please select major name rather than enter in as full name"+
                            "\n\nppps: re-press the button can solve90% issues or refresh page");

                    }else{
                        console.log("course array length is"+res.length);

                    }
                    for (var i = 0; i < res.length; i++) {
                        //dont wanna alert jump out too many times :D
                        //show courses
                        alert(res[i].course);// but this can be used for testing ~
                        console.log("courses are:" + res[i].course)
                    }
                },
                // Note: it's important to handle errors here
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    };


    axiosPostData = (event) => {
        //  event.preventDefault(); is used to prevent frontend real actions
        //  (in this case :to refresh itself automatically when changes are made)
        event.preventDefault();
        //this.setState({[event.target.name]:event.target.value});
        //console.log(this.state.searchname);
        axios.post('http://192.168.1.104:5000/test', {
            studentname: this.state.studentname,
            phonenumber: this.state.phonenumber,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        alert('A name was submitted: ' + this.state.studentname + '  phone number is' + this.state.phonenumber);
    }


    handleChange(event) {
        //prevent may not needed?
        //event.preventDefault();
        this.setState({[event.target.name]: event.target.value});
    }

    /*
        handleSubmit(event) {
            event.preventDefault();
            //alert('A name was submitted: ' + this.state.studentname+ 'age is'+this.state.phonenumber);
            alert("yiha");
        }
    */


    render() {
        let header = '';

        return (

            <div className="App">
                <form onSubmit={this.fetchGetData}>
                    <label>University Name :</label>
                    <input
                        type='text'
                        name='uniname'
                        value={this.state.uniname}
                        onChange={this.handleChange}
                    />

                    <Autocomplete
                        suggestions={utsmajors}
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

}
export default App