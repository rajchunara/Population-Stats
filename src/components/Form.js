import React, { Component } from 'react';
import axios from 'axios';
import Barchart from './Barchart';
import {Row,
  Input,
   Button
 }from 'react-materialize';
   


class Form extends Component {

  state={
    countries:[],
    apiUrl:'http://api.population.io:80/1.0/countries',
    obj:{},
    country:"Canada",
    Category:"males",
    year:2019,
    data:[],
    countrySearch:'Canada',
    yearSearch:2019,
    err:0
    // malePopulation:[], for future use
    // femalePopulation:[],
    // age:[],
    
  }

  //For Autocomplete

  // componentDidMount=()=>{
  //   //Get countries names for Autocomplete
  //   axios.get(`${this.state.apiUrl}`)
  //    .then(res => {
  //      this.setState({
  //        countries:res.data.countries,
  //      })
  //      // console.log(this.state.countries);
  //    })
  //    .then(()=>{
  //      this.setState({
  //        //convert array of countries in object for autocomplete
  //       obj: Object.assign({},...this.state.countries.map(d => ({[d]: null})))
  //      })
  //      // console.log(this.state.obj);
  //    });
  // }

onCountryChange=(e)=>{
  let desh1=e.target.value.toLowerCase();
  let desh2=desh1.charAt(0).toUpperCase() + desh1.slice(1);
  this.setState({
    country:desh2
  });
}


onYearChange=(e)=>{
  this.setState({
    year:e.target.value}
  );
}

componentDidMount=()=>{
  axios.get(`http://api.population.io:80/1.0/population/${this.state.year}/${this.state.country}/`)
    .then(res => {
      this.setState({
        data:res.data,
        countrySearch:this.state.country,
        yearSearch:this.state.year
         // malePopulation: res.data.map( a => a.males), for future use
        // age: res.data.map( a=> a.age),
        // femalePopulation: res.data.map( a => a.females),
      })
    })
}

submitClick=()=>{
  axios.get(`http://api.population.io:80/1.0/population/${this.state.year}/${this.state.country}/`)
    .then(res => {
      this.setState({
        data:res.data,        
        countrySearch:this.state.country,
        yearSearch:this.state.year,
        err:0
        // malePopulation: res.data.map( a => a.males), for future use
        // age: res.data.map( a=> a.age),
        // femalePopulation: res.data.map( a => a.females),
      })
    }).catch(err =>{
      this.setState({
        err:1
      })
    });
}

  render() {
    const list = [];
        for (let i = 1950; i <= 2100; i++) {
            list.push(i);
        }

        const opt = (        
             list.map(yr =>(<option key={yr} value={yr}>{yr}</option>))            
           ); 
      let details

      if(!this.state.err){
         details= (<div className="container center-align  green accent-1 row">
        <p className="Info col s4 push-s2">Country : {this.state.countrySearch} </p>
        <p className="Info col s4 push-s2"> Year : {this.state.yearSearch} </p>
        </div>)
      }else{
        details = <div className="container center-align  red lighten-5 row">
        <p className="Info col s4 push-s2">Please enter valid country name </p>
        </div>
      }

      return (
        <div>          
          <Row className="container form-fields valign-wrapper">            
              <div className="input-field col s6">
                <input placeholder="eg. Canada"  type="text" data={this.state.obj}
                onChange={this.onCountryChange} className="validate"></input>
                <label>Enter Country Name</label>
              </div>         

              <Input  s={4} type='select' label="Year" onChange={this.onYearChange} defaultValue={2019}>
                {opt}
              </Input>              
              <Button className="col s2" waves='light'  onClick={this.submitClick}>Show Data</Button>
          </Row>

          <div className="col s8">
            {details}
            <Barchart  data={this.state.data} />
          </div>
        </div>
      );
  }
}

export default Form;
