import React, {Component} from 'react'
import "./home.css"
import axios from 'axios'
import * as d3 from 'd3'



class Home extends Component {
	
	state = {

	// Initially, no file is selected
	selectedFile: null,
    data : null
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

	
	
	render() {
	
	return (
		<div>
			<h1>
			PROJECT
			</h1>
			<div>
				<input type="file" onChange={this.onFileChange} />
				<button onClick={this.onFileUpload}>
				Upload!
				</button>
			</div>
		{this.fileData()}
		</div>
	);
	}
}

export default Home;
