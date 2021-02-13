
import React from 'react';
import Contact from './ContactUS'
import { mainUrl } from './globals.js'
import './Villa.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { withRouter } from "react-router";
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
        if (this.props.location.type !== null)
            var url = this.state.mainUrl + "/" + "?type=" + this.props.match.params.type;
        let response = await fetch(url)
        let data = await response.json();
        this.setState({ persons: data, loading: false });
    }

    componentWillUnmount() {
        const initialState = {
            /* etc */
        };
        this.setState(initialState);
    }
    passData(name, ID, img, area, year, images, location, cat_id) {
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
            let ind = this.state.index;
            return (
                <div>
                    <section class="row">
                        {this.state.persons[0] ? (
                            <div class="row">
                                <img class="col-12 col-md-8 imagesGrid wr" style={{ paddingBottom: "20px" }} src={encodeURI(url2 + `${this.state.persons[0].image}` + "&&type=" + `${this.state.persons[0].category_id}`)}></img>
                                <div class="col" >
                                    <img class="row imagesGrid wr" src={encodeURI(url2 + `${this.state.persons[0].image}` + "&&type=" + `${this.state.persons[0].category_id}`)}></img>
                                    <div class="" style={{ paddingTop: "20px", paddingBottom: "20px" }}>  <img class=" row imagesGrid wr" src={encodeURI(url2 + `${this.state.persons[0].image}` + "&&type=" + `${this.state.persons[0].category_id}`)}></img>
                                    </div></div>
                            </div>
                        ) : <div></div>}
                        {this.state.persons.slice(ind, ind + 12).map((person, index) => <span class="col-sm-3" ><  img class="imagesGrid wr " src={encodeURI(url2 + `${person.image}` + "&&type=" + `${person.category_id}`)} onClick={() => this.passData(person.name, person.id, encodeURI(url2 + `${person.image}` + "&&type=" + `${person.category_id}`), person.area, person.year, person.images, person.location, person.category_id)} />
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
                <div class="container"> <ListGrid /> </div>
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