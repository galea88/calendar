import React, {Component, useCallback} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Moment from 'react-moment';

class DatePicker extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            chosenDate: "",
            month: '',
            year: "2021",
            view: "month",
            isLoading: true
        }
    }

    componentDidMount(){
        let today = new Date();
        this.setState({chosenDate: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`});
        //console.log(today.getMonth());
    }
             
render(){

const yearOptions = [];

const date = new Date();

    return(
        <React.Fragment>
            
<Container style={{padding: "0 5%"}}>

    <select onChange={(e) => this.setState({view: e.target.value})}>
        <option value="month">Month</option>
        <option value="week">Week</option>
    </select>
<input type="date" onChange={(e) => this.setState({chosenDate: e.target.value})}></input>

</Container>
    {/* <select onChange={(e) => {this.setState({month: e.target.value})}}>
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
    </select>
    <select onChange={(e) => {this.setState({year: e.target.value})}}>    
        <option value="2019">2019</option>    
        <option value="2020">2020</option>
        <option value="2021" selected>2021</option>
    </select> */}
    
    <Calendar chosenDate={this.state.chosenDate}  view={this.state.view} />
</React.Fragment>
    )
}

}

class Calendar extends React.Component{

 render(){   

    let chosenDate = this.props.chosenDate;
        chosenDate = chosenDate.split("-");   
    let month = parseInt(chosenDate[1]-1);
    let day = parseInt(chosenDate[2]);
    //console.log(month);
    //console.log(typeof monthTest);
    //let month = monthTest; 
    //console.log(typeof month);
    let year = parseInt(chosenDate[0]);     
    
    var datesTable = "<tr>";
    let datesArray = [];

    let weekday = 0;
    const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
    const date = new Date();
    const today = date.getDate();      
          date.setMonth(month);
          date.setFullYear(year);
          date.setDate(1);

    let x = 1;
    while(date.getMonth() == month ){
        
        if(date.getDay() === 0){weekday = 6;}else{weekday = date.getDay()-1;}

        datesArray.push({ weekday: week[weekday],
                          day: date.getDate(),
                          date: `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`})

        x++;
        date.setDate(x);
    }

//console.log(datesArray);

datesArray.forEach(item =>{
  
  for(let w=0; w < 7; w++) {      
   
      if(week[w] === item.weekday){
         
        datesTable += `<td>${item.day}</td>`;
        break;
        
      }else if(item.day === 1){ datesTable += "<td></td>"; }
  }
  if(item.weekday === "Sunday"){ datesTable += "</tr><tr>"; }
});

if(this.props.view == "week"){
    
    date.setDate(day);
    date.setMonth(month);
    date.setFullYear(year);
    
    let dayDiff = 0;
    if(date.getDay() === 0){ 
         dayDiff = 6;         
    }else{
         dayDiff = date.getDay()-1;
    }
    date.setDate(date.getDate() - dayDiff);
       
    datesTable = "<tr>";
    for(let x=0; x < 7; x++){
                
        datesTable += `<td style='height: 20px'>${date.getDate()}</td>`
        date.setTime(date.getTime()+(86400*1000));
        
    }

    datesTable += "</td>";

    for(let n=0; n<4; n++){   
    datesTable += "<tr>"; 
    for(let x=0;x < 7;x++){
        datesTable += "<td></td>";
    }
    datesTable += "</tr>";
    }
    }

return (
<>
<Container fluid style={{padding: "0 5%"}}>
    <Row>
        <Col md={12}>
    <h1>{monthList[month]}</h1>

    <table>
        <thead>        
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>  
        <th>Sunday</th>      
    </thead>
    <tbody dangerouslySetInnerHTML={{__html: datesTable}}></tbody>
            
    </table>
    </Col>
   </Row>
    </Container>   
    </>
)

}

}

export default DatePicker;