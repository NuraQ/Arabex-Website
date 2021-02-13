
import React from 'react';
import DND from './DND'
//import ReactDOM from 'react-dom';
// Usually we use one component per file, here we have more
import { mainUrl} from './globals.js'
import './Villa.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router";
import { setValues } from './GlobalState';
import Contact from './ContactUS'
import './gallery.css'


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 3
    }}
  />
);
const ColoredLineThin = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 0.5
    }}
  />
);


class Villlas extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dontSlide: true,

      mainUrl: mainUrl.url,
      persons: [],
      index: 0,
      img: null,

    }

    this.passData = this.passData.bind(this);
    this.decrement = this.decrement.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);



  }
  handleDragStart = e => {
    this.style.opacity = '0.4';
  }

  handleDragEnd = e => {
    this.style.opacity = '1';
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.persons,
      result.source.index,
      result.destination.index
    );

    this.setState({
      persons: items
    });
  }

  async componentWillMount() {

    console.log("fdsfsfs" + this.props.match.params.type
    );
    if (this.props.location.type !== null)
    var url = this.state.mainUrl + "/" + "?type=" + this.props.match.params.type;
    let response = await fetch(url)
    let data = await response.json();
    this.setState({ persons: data, loading: false });
      if (this.state.persons && this.state.persons.length > 0) {
        console.log("original" + this.state.persons)
        setValues(this.state.persons)
      }

  }

  passData(name, ID, img, area, year, images, location, cat_id) {
    console.log("locTest" + location);
    this.props.history.push({
      pathname: "/Villlas/Elem/" + `${ID}`,
      state: { name: name, id: ID, image: img, area: area, year: year, images: images, locationn: location, type: cat_id }//has nothing with component state
    })
  }

  toggle() {
    let prev_index = this.state.index;
    this.setState({ dontSlide: false, index: prev_index + 12 });

  }
  decrement() {
    let prev_index = this.state.index;
    this.setState({ index: prev_index - 12 });

  }
  render() {

    let url2 = this.state.mainUrl + "/load_image/?img=";
    const list = this.state.persons.map(person => (
      <div key={person.ID}  >
        <div class="col-sm" >
          <div class="wid">
            <img class="imagesGrid" src={encodeURI(url2 + `${person.image}` + "&&type=" + `${person.category_id}`)} onClick={() => this.passData(person.name, person.id, encodeURI(url2 + `${person.image}` + "&&type=" + `${person.category_id}`), person.area, person.year, person.images, person.location, person.category_id)} />
            <p>mt5lls ya 3m :)</p>
          </div>
        </div>
      </div>
    )
    )

    const ListGrid = () => {

      let v = this.state.index;
      const result = this.state.persons.map((x, i) => {
        let d = v + i;
        console.log("I+" + i);
        return d % 4 === 0 ? (this.state.persons.slice(d, d + 4)) : (null);
      }).filter(x => x != null);

      return (
        <div>{this.state.index}

          {result.map((result, index) => {

            return (<section class="row" key={index}>
              {result.map(person => <span class="col-sm" ><  img class="imagesGrid wr " src={encodeURI(url2 + `${person.image}` + "&&type=" + `${person.category_id}`)} onClick={() => this.passData(person.name, person.id, encodeURI(url2 + `${person.image}` + "&&type=" + `${person.category_id}`), person.area, person.year, person.images, person.category_id)} />
                <h2><span class="editTxt">Bottom Left</span></h2>
                <br></br>
              </span>
              )}
            </section>);

          }
          )}

        </div>
      );
    }

    function drag(event) {
      event.dataTransfer.setData("text/plain", event.target.id);
    }

    const ListGridd = () => {
      let ind = this.state.index;
      return (
        <div>

          <section class="row">
            {this.state.persons.slice(ind, ind + 12).map((person, index) => <span class="col-sm-3" ><div id="drag-p" draggable="true" ondragstart={this.handleDragStart}><  img id="drag-p" draggable="true" ondragstart={this.handleDragStart} class="imagesGrid wr " src={encodeURI(url2 + `${person.image}` + "&&type=" + `${person.category_id}`)} onClick={() => this.passData(person.name, person.id, encodeURI(url2 + `${person.image}` + "&&type=" + `${person.category_id}`), person.area, person.year, person.images, person.location, person.category_id)} /></div>

              <h2><span className="editTxt" >{person.name}</span></h2>
              <br></br>

            </span>
            )}

          </section>



        </div>

      )
    }

    return (

      <div >
        {/*}  <div class="row">{list}</div>*/}
        <div class="container"> <DND itemss={this.state.persons}></DND> </div>
        <div class="container">

          <div > <button onClick={() => { this.decrement() }}>Previous Page</button>{this.state.dontSlide}</div>

          <span class="col-sm"><ColoredLineThin color="rgb(128, 128, 128)" /></span>

          <div > <button onClick={() => { this.toggle() }}>Next Page</button>{this.state.dontSlide}</div>
        </div>
        <div>{this.state.index}</div>

        <div>{!this.state.dontSlide && this.state.persons.length ? (<div> <div class="container"></div>
        </div>) : (<div />)}</div>

        <ColoredLine color="rgb(128, 41, 41)" />
        <div class="container">
          <div class="row">
            <div class="col-sm">
              <p class="row">Learn more about our team!</p>
            </div>
            <div class="col-sm">
            </div>
            <span className="vline"></span>
            <div class="col-sm" />

            <div class="col-sm">
              <button >meet our team!</button>
              <div class="row"><br></br></div>
              <button>Connect with us!</button>

            </div>
          </div>
          <div class="row"></div>

        </div>
        <Contact />

      </div>);
  }


}
export default withRouter(Villlas);