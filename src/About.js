import React, { Component } from 'react';
import './About.css'
import archh from './archh.jpg'
import Contact from './ContactUS'
import Beere from './Beere.jpg'
import { mainUrl } from './globals';

const AboutCompany = () => {
  return (
    <div>

      <div style={{ margin: "70px" }} class="container" className="divColor">
        <div class="row" style={{ height: "660px" }}>
          <div class="col-sm" style={{ backgroundImage: `url(${archh})`, alignContent: "center" }}>
          </div>
          <div class="col-sm">
            <p className="description">Arab Experts for Engineering and Consultation was established in the year 2010 by a group
            of architects and engineers that are looking forward for better architecture and engineering
            job. Their aim was to design in a high quality and bring these designs into life in the same
            quality.
            ARABEX has been registered by the Engineers Association as an Engineering Consultant
            company N0. 1092. The company provides services and consultations including private and public
            sectors in the following fields
              <li> Architectural design. </li>
              <li>Supervision.</li>
              <li>Urban Planning.</li>
              <li>Conservation and Rehabilitation..</li>
              <li>Construction Management..</li>
              <li>Landscaping</li>
              <li>Feasibility Studies</li>
              <li>Management</li>
              <br></br>
              <p style={{ fontSize: "22px" }}>Partners of the Company:
              <p style={{ fontSize: "20px" }}> Sami Qasrawi , Bilal Alkhayyat and  Azzam Qasrawi.</p></p >
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
const clients = () => {
  return (<div class="row">{this.state.owners.map(person => (
    <div class="col-sm" key={person.ID}  >
      <div class="" style={{ backgroundColor: "" }}>
        {/* <img class="imgStyle" src={encodeURI(url2 + `${person.image}` + "&&type=" + `owners`)} /> */}
        <img class = "imgStyle" src={Beere}></img>
        <p>{person.name}</p>
        <p>{person.info}</p>
        <p>{person.email}</p>
      </div>
    </div>

  ))}
  </div>
  )
}
class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mainUrl: mainUrl.url,
      owners: [],
    }
    this.GridOwners = this.GridOwners.bind(this);
  }
  async componentDidMount() {
    var url = this.state.mainUrl + "/" + "?type=" + "owners";
    let response = await fetch(url)
    let data = await response.json();
    this.setState({ owners: data });
  }
  
  GridOwners = () => {
    let url2 = this.state.mainUrl + "/load_image/?img=";
    return (<div class="row">{this.state.owners.map(person => (
      <div class="col-sm" key={person.ID}  >
        <div class="" style={{ backgroundColor: "" }}>
          {/* <img class="imgStyle" src={encodeURI(url2 + `${person.image}` + "&&type=" + `owners`)} /> */}
          <img class = "imgStyle" src={Beere}></img>
          <p>{person.name}</p>
          <p>{person.info}</p>
          <p>{person.email}</p>
        </div>
      </div>

    ))}
    </div>
    )
  }
  render() {
    return (
      <div>
        <AboutCompany/>
        <div class="container"><this.GridOwners></this.GridOwners></div>
        <div><Contact/></div>
      </div>
    );
  }
}

export default About;
