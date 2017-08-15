import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import ReactPDF from '@react-pdf/node';
// import ReactPDF from 'react-pdfkit';
// import generatePDF from 'generate-pdf';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Invoice from 'containers/Invoice';
import './invoice.css';
// Get invoice data
import data from '../data/placeholder-data.json';

export default class App extends Component
{

  constructor()
	{
		super();

		this.state = {
      fileLoaded: false,
      fileName: "",
      data: data
    };
	}

  handleFileUpload(event)
  {
    const file = event.target.files[0]; if (file === undefined) return;
    console.log(`loading file ${file.name}`);
		if (file.type === 'application/json')
		{
      var reader = new FileReader();
      reader.onload = (output) => { const jsonData = JSON.parse(output.target.result); this.setState({data: jsonData, fileName: file.name, fileLoaded: true}); };
      reader.readAsText(file);
		}
		else console.log(`unsuppprted file type : ${file.type}`);
  }

  saveCanvasToPDF()
  {
    // ReactPDF.render(<Invoice data={data}/>, `${__dirname}/${data.document.type}_${data.document.number}.pdf`);

    // const configuration = {};
    // generatePDF(configuration)
    //   .then((pdf) => console.log(pdf))
    //   .catch((e) => console.error(e));

    // const input = document.getElementById('app');
    const input = ReactDOM.findDOMNode(this.refs.invoice);

    // html2canvas(input, {type: 'view'})
      html2canvas(input,{width: 1500, height: 3000})
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'JPEG', 0, 0);
          // pdf.output('dataurlnewwindow');
          pdf.save("download.pdf");
        });
  }

  print()
  {

  }

  render()
  {
    return (
      <div>
        <div id="top-bar" className={this.state.data.document.type}>
          <input type="file" id="file-picker" name="" onChange={this.handleFileUpload.bind(this)} />
          <label htmlFor="file-picker">select file</label>
          {this.state.fileLoaded ? <label>{this.state.fileName}</label>: null}
          {this.state.fileLoaded ? <button onClick={this.saveCanvasToPDF.bind(this)}>save to PDF</button>: null}
          {this.state.fileLoaded ? <button onClick={this.print.bind(this)}>print</button> : null}
        </div>
      	<Invoice ref="invoice" data={this.state.data}/>
      </div>);
  }
}
