import './App.css';
import React, {Component} from "react"
import { Link, withRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

class Students extends Component {
  constructor() {
      super()
      this.state = {
        students:[],
        userName: "",
        birthday:"",
        class: "",
        division:"",
        gender:"",
        nameError:"",
        formError:"" 
      }
      this.handleChange = this.handleChange.bind(this)
      this.submit = this.submit.bind(this)
  }
  componentDidMount(){
    axios.get("http://localhost:8080/getAllByName")
    .then((res)=>{
      this.setState({
        students:res.data,
        id:0,
        userName: "",
        birthday:"",
        class: "",
        division:"",
        gender:"",
        nameError:"",
        formError:""
      })
    })
  }
  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    })
    
    
    // console.log(this.state.userName)
  }
  submit(event)
  {
    if((this.state.userName) ==="" || (this.state.birthday) ==="" || (this.state.class) ==="" || (this.state.division) ==="" || (this.state.gender) ==="" ){
        this.setState({
            formError : "enter all fields in the form"    
        })
    }
    else{
        this.setState({
            formError : ""    
        })
        const regex =/^[A-Za-z ]*$/
        let isValid = this.state.userName.match(regex)
        if(isValid){
            this.setState({
                    nameError : ""    
                })
            axios.post("http://localhost:8080/send",{
                userName:this.state.userName,
                standard:this.state.class,
                division:this.state.division,
                gender:this.state.gender,
                dob:this.state.birthday
                }).then((res)=>{
                    this.componentDidMount();
            })
        }
        else{
            console.log("else part");
            this.setState({
                nameError : "enter name with letters and space only."
            })
        }
    }
  }
  render() {
    return (
        <div className="students-page">
            <div className="container">
                <div className="row">
                    <div className="login col-12 col-sm-12 col-md-5 col-lg-5" >
                        <div className='login-box'>
                            <h1 className="login-title text-center">Student Form</h1>
                            <br></br>
                            {/* <form onsubmit={this.validate()} action="./profile" method="GET"> */}
                            <form >
                            <input type="text"
                                placeholder="Enter Student Name"
                                className=" form-control name-field w-75 mx-auto "
                                name="userName"
                                value={this.state.userName} 
                                onChange={this.handleChange} 
                                pattern="^[A-Za-z ]+$"
                                required
                            /> 
                            <pre className="error  text-center">{this.state.nameError}</pre>
                            <br></br>
                            <div className="birthday  text-center">
                                <label htmlFor="birthday"  className=" mx-auto text-center" >Date of Birth:</label>
                                    <input type="date"
                                    id="birthday"
                                    className="form-control form-control-sm w-75 mx-auto"
                                    value={this.state.birthday} 
                                    onChange={this.handleChange} 
                                    name="birthday"/>
                            </div>
                            <br/>
                            <div className="studyingin text-center">
                                <label htmlFor="class"  >Studying in:</label>
                                <select 
                                        value={this.state.class} 
                                        name="class" 
                                        className="form-control form-control-sm w-75 mx-auto"
                                        onChange={this.handleChange}>
                                        <option value="">-- Select Class --</option>
                                        <option value="I">I</option>
                                        <option value="II">II</option>
                                        <option value="III">III</option>
                                        <option value="IV">IV</option>
                                        <option value="V">V</option>
                                        <option value="VI">VI</option>
                                        <option value="VII">VII</option>
                                        <option value="VIII">VIII</option>
                                        <option value="IX">IX</option>
                                        <option value="X">X</option>
                                        <option value="XII">XII</option>
                                        <option value="XI2">XI2</option>
                                </select>
                                <select 
                                        value={this.state.division} 
                                        name="division" 
                                        className="form-control form-control-sm w-75 mx-auto"
                                        onChange={this.handleChange}>
                                        <option value="">-- Select Division --</option>
                                        <option value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                </select>
                                <br/>
                            </div>
                                    <div className="gender text-center">
                                        <label htmlFor="gender">Gender: </label>
                                        <br/>
                                        
                                        <label >
                                            <input 
                                                type="radio" 
                                                name="gender"
                                                value="male"
                                                
                                                checked={this.state.gender === "male"}
                                                onChange={this.handleChange}   
                                            /> Male
                                        </label>
                                        <br />
                                        <label >
                                            <input 
                                                type="radio" 
                                                name="gender"
                                                value="female"
                                                checked={this.state.gender === "female"}
                                                onChange={this.handleChange}
                                            /> Female
                                        </label>
                                    </div>
                                    <br />      
                                    <pre className="error  text-center">{this.state.formError}</pre>
                            <div className="text-center">
                                <button type="button" className="btn btn-outline-danger" onClick={this.submit}>Submit</button>
                            </div>
                        
                            </form>
                            <br/>
                        </div>
                    </div>
                    <div className="student-details col-12 col-sm-12 col-md-7 col-lg-7">
                        <h1 className="text-center" style={{color:"white"}}>Students Details</h1>
                        <table className="table table-dark">
                            <thead className="thead-dark">
                                <tr >
                                    <th scope="col">Name</th>
                                    <th scope="col">Class</th>
                                    <th scope="col">Division</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">DOB</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.students.map(student =>
                                <tr scope="row" key={student.rollNumber}>
                                    <td>{student.userName}</td>
                                    <td>{student.standard}</td>
                                    <td>{student.division}</td>
                                    <td>{student.gender}</td>
                                    <td>{student.dob}</td>
                                </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div> 
      );
    }
  }
  
  export default withRouter(Students);