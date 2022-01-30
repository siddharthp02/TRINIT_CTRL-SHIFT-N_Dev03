import React, {Component} from 'react'
import "./home.css"
import axios from 'axios'
import * as d3 from 'd3'
import BarChart from '../../components/BarChart'
import Average from '../../components/Average'
import LineChart from '../../components/linechart'
import Papa from "papaparse";
import barimg from "./static/import.png"
import Draggable from 'react-draggable';

const data = [
  {year: 1980, efficiency: 24.3, sales: 8949000},
  {year: 1985, efficiency: 27.6, sales: 10979000},
  {year: 1990, efficiency: 28, sales: 9303000},
  {year: 1991, efficiency: 28.4, sales: 8185000},
  {year: 1992, efficiency: 27.9, sales: 8213000},
  {year: 1993, efficiency: 28.4, sales: 8518000},
  {year: 1994, efficiency: 28.3, sales: 8991000},
  {year: 1995, efficiency: 28.6, sales: 8620000},
  {year: 1996, efficiency: 28.5, sales: 8479000},
  {year: 1997, efficiency: 28.7, sales: 8217000},
  {year: 1998, efficiency: 28.8, sales: 8085000},
  {year: 1999, efficiency: 28.3, sales: 8638000},
  {year: 2000, efficiency: 28.5, sales: 8778000},
  {year: 2001, efficiency: 28.8, sales: 8352000},
  {year: 2002, efficiency: 29, sales: 8042000},
  {year: 2003, efficiency: 29.5, sales: 7556000},
  {year: 2004, efficiency: 29.5, sales: 7483000},
  {year: 2005, efficiency: 30.3, sales: 7660000},
  {year: 2006, efficiency: 30.1, sales: 7762000},
  {year: 2007, efficiency: 31.2, sales: 7562000},
  {year: 2008, efficiency: 31.5, sales: 6769000},
  {year: 2009, efficiency: 32.9, sales: 5402000},
  {year: 2010, efficiency: 33.9, sales: 5636000},
  {year: 2011, efficiency: 33.1, sales: 6093000},
  {year: 2012, efficiency: 35.3, sales: 7245000},
  {year: 2013, efficiency: 36.4, sales: 7586000},
  {year: 2014, efficiency: 36.5, sales: 7708000},
  {year: 2015, efficiency: 37.2, sales: 7517000},
  {year: 2016, efficiency: 37.7, sales: 6873000},
  {year: 2017, efficiency: 39.4, sales: 6081000},
]



class Home extends Component {
	constructor(props) {
		super(props);
		this.myRef = React.createRef();
		
	}

	state = {

	// Initially, no file is selected
	selectedFile: null,
    data : null,
	parsedCsvData : null,
	numbar : null,
	numavg:null,
	numline:null,
	drawing :false,
	order:[],
	inexecute:false
	};
	
	// useData = () => {
	// 	const [data, setData] = React.useState(null);
	// 	const csvUrl ='https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/639388c2cbc2120a14dcf466e85730eb8be498bb/iris.csv';
	
	// 	React.useEffect(() => {
	// 	  const row = d => {
	// 		d.sepal_length = +d.sepal_length;
	// 		d.sepal_width = +d.sepal_width;
	// 		d.petal_length = +d.petal_length;
	// 		d.petal_width = +d.petal_width;
	// 		return d;
	// 	  };
	// 	  d3.csv(csvUrl, row).then(setData);
	// 	}, []);
		
	// 	return data;
	//   };

	// componentDidMount = ()=>{
	// 	const d1 = {this.useData}
	// 	console.log(d1)
	// }
	
    // componentDidMount = ()=>{
	// 	var nodeval = this.myRef.current.value
	// 	}
	// On file select (from the pop up)
	onFileChange = event => {
	
	// Update the state
		this.setState({ selectedFile: event.target.files[0] });
		var reader = new FileReader();
		reader.onload = (event)=> {
			
		// The file's text will be printed here
			// console.log(event.target.result)
			
			this.setState({ data: event.target.result})
		};

		reader.readAsText(event.target.files[0]);
		// const files = event.target.files;
        //   console.log(files);
        //   if (files) {
        //     console.log(files[0]);
        //     Papa.parse(files[0], {
        //       complete: function(results) {
        //         console.log("Finished:", results.data);
        //       }}
        //     )
        //   }
		
		const file = event.target.files[0]
        Papa.parse(file, {
			header: true,
			complete: results => {
				this.setState({ parsedCsvData: results.data})
				console.log(this.state.parsedCsvData)
				console.log(data)
			  },// do something,
			dynamicTyping: true
		  });
	};
	
	
	
	// On file upload (click the upload button)
	onFileUpload = () => {
	
	// Create an object of formData
	const formData = new FormData();
	
	// Update the formData object
	formData.append(
		"myFile",
		this.state.selectedFile,
		this.state.selectedFile.name
	);
	
	// Details of the uploaded file
	console.log(this.state.selectedFile);
    console.log(this.state.data);
	this.setState({inexecute:true})
	// Request made to the backend api
	// Send formData object
	axios.post("api/uploadfile", formData);
	};
	
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
	
	if (this.state.selectedFile) {
		
		return (
		<div>
			<h2>File Details:</h2>
			
			<p>File Name: {this.state.selectedFile.name}</p>

			
			<p>File Type: {this.state.selectedFile.type}</p>

			
			<p>
			Last Modified:{" "}
			{this.state.selectedFile.lastModifiedDate.toDateString()}
			</p>

		</div>
		);
	} else {
		return (
		<div>
			<br />
			<h4>Choose before Pressing the Upload button</h4>
		</div>
		);
	}
	};
	handleinput = (event)=> {
		var myval = parseInt(event.target.value)
		console.log(event.target.getAttribute('name') )
		if(event.target.getAttribute('name') == "bar"){
			this.setState({numbar:myval})
		}
		else if(event.target.getAttribute('name') == "avg"){
			this.setState({numavg:myval})
		}
		else if(event.target.getAttribute('name') == "line"){
			this.setState({numline:myval})
		}
		
	}
	bar = ()=> {
		var myarray = Array.apply(null, Array(5)).map(function () {})
		
		// myarray.length = 4
		// console.log(node)
		// console.log(node.innerHTML)
		// node.innerHTML += `<Draggable><button id = "bar">BAR!!!</button></Draggable>`
		return myarray.map((review, index) => (
			<Draggable disabled={this.state.draw}>
				<div className="box" key = {index}>
					<div>Bar!!!!!!</div>
				</div>
			</Draggable>
		))
      }
	  drawing = ()=>{
		  if(this.state.drawing){
			  this.setState({drawing:false})
			  console.log(this.state.drawing)
		  }
		  else{
			  this.setState({drawing:true})
			  console.log(this.state.drawing)

		  }
	  }
	  showstate = ()=>{
		  console.log(this.state.order)
	  }
	  handledragclick = (event) =>{
		console.log(event.target.innerHTML)
		if(this.state.drawing){
			if(event.target.innerHTML == "BarChart" || event.target.innerHTML == "Average" || event.target.innerHTML == "LineChart" ){
				this.setState({order: this.state.order.concat(event.target.innerHTML) })
				console.log(event.target.innerHTML)
				console.log(this.state.order)
			}
			
		}
	  }
	  bar1 = ()=> {
		
		
		
		
		// console.log(node)
		// console.log(node.innerHTML)
		// node.innerHTML += `<Draggable><button id = "bar">BAR!!!</button></Draggable>`
		if(this.state.numbar){
			var nodeval = this.state.numbar
			console.log(this.state.numbar)
			var myarray = Array.apply(null, Array(this.state.numbar)).map(function () {})

		return myarray.map((review, index) => (
			<Draggable disabled={this.state.drawing}>
				<div className="box" id = "line" key = {index} onClick = {this.handledragclick}>
					<div>BarChart</div>
				</div>
			</Draggable>
		))
      }
	  else{
		
		  return <div></div>
	  }
	}

	line = ()=> {
		
		
		
		
		// console.log(node)
		// console.log(node.innerHTML)
		// node.innerHTML += `<Draggable><button id = "bar">BAR!!!</button></Draggable>`
		if(this.state.numline){
			var nodeval = this.state.numline
			console.log(this.state.numline)
			var myarray = Array.apply(null, Array(this.state.numline)).map(function () {})

		return myarray.map((review, index) => (
			<Draggable disabled={this.state.drawing}>
				<div className="box" id = "bar" key = {index} onClick = {this.handledragclick}>
					<div>LineChart</div>
				</div>
			</Draggable>
		))
      }
	  else{
		
		  return <div></div>
	  }
	}

	avg = ()=> {
		
		
		
		
		// console.log(node)
		// console.log(node.innerHTML)
		// node.innerHTML += `<Draggable><button id = "bar">BAR!!!</button></Draggable>`
		if(this.state.numavg){
			var nodeval = this.state.numavg
			console.log(this.state.numavg)
			var myarray = Array.apply(null, Array(this.state.numavg)).map(function () {})

		var ansarray= myarray.map((review, index) => (
			<Draggable disabled={this.state.drawing}>
				<div className="box" id = "bar" key = {index} onClick = {this.handledragclick}>
					<div>Average</div>
				</div>
			</Draggable>
		))
		console.log(ansarray)
		return ansarray
      }
	  else{
		
		  return <div></div>
	  }
	}

	handleexecute = ()=> {
		if(this.state.inexecute){
			var order = this.state.order
			console.log(order)

			// var exectioncode = order.map((executable, index) => (
			// 	if(executable == "BarChart"){
			// 		<BarChart data={this.state.parsedCsvData} myx = {0} myy = {1}/>
			// 	}
			// 	else{

			// 	}
			// ))
			var exarray = []
			for(var i=0;i<order.length;i++){
				if(order[i] == "BarChart"){
					exarray.push(<BarChart data={this.state.parsedCsvData} myx = {0} myy = {1}/>)
				}
				else if(order[i] == "Average"){
					exarray.push(<Average data = {this.state.parsedCsvData} colnum = {0}/>)
				}
				else if(order[i] == "LineChart"){
					exarray.push(<LineChart data={data} />)
				}
			}
			console.log(exarray)
			return exarray
      	}
	  	else{
		
		  return <div></div>
	  }
	}


	render() {
	if (this.state.parsedCsvData) {
	return (
		<div>
			<h1>
			PROJECT
			</h1>
			<div>
				<button>BarChart</button>
				<input type = "text" name = "bar" ref = {this.myRef} onChange = {this.handleinput}></input>
				<br/>
				<button>Average</button>
				<input type = "text"  name = "avg" onChange = {this.handleinput}></input>
				<br/>
				<button>LineChart</button>
				<input type = "text"  name = "line" onChange = {this.handleinput}></input>
				<button onClick = {this.drawing}>Draw</button>
				<button onClick = {this.showstate}>showstate</button>
				

				{/* <button onClick = {avg}>Average</button> */}
			</div>
			<div>
				images and stuffs lol
				
			</div>
			<div className="box">
				{this.bar1()}
				{this.avg()}
				{this.line()}
			</div>
			
			<div>
				<input type="file" onChange={this.onFileChange} />
				<button onClick={this.onFileUpload}>
				Execute!
				</button>
			</div>
			<div>
				{this.handleexecute()}
			</div>
			{/* <BarChart data={this.state.parsedCsvData} myx = {0} myy = {1}/>
			<Average data = {this.state.parsedCsvData} colnum = {0}/> */}
			

		</div>
	);
	}
	else{
		return (
			<div>
				<h1>
				PROJECT
				</h1>
				<div>
				<button>BarChart</button>
				<input type = "text" name = "bar"ref = {this.myref} onChange = {this.handleinput}></input>
				<br/>
				<button>Average</button>
				<input type = "text"  name = "avg" onChange = {this.handleinput}></input>
				<br/>
				<button>LineChart</button>
				<input type = "text"  name = "line" onChange = {this.handleinput}></input>
				<br/>
				<button onClick = {this.drawing}>Draw</button>
				<button onClick = {this.showstate}>Showstate</button>

				{/* <button onClick = {avg}>Average</button> */}
				</div>
				<div>
					images and stuffs lol
					
				</div>
				<div className="box">
					{this.bar1()}
					{this.avg()}
					{this.line()}
				</div>
				<div>
					<input type="file" onChange={this.onFileChange} />
					<button onClick={this.onFileUpload}>
					Execute!
					</button>
				</div>
			</div>
		);
	}
	}
}

export default Home;
