import React from 'react';
import { withRouter } from "react-router";
import './Eleme.css'
import { Slide } from 'react-slideshow-image';
import CrossfadeImage from 'react-crossfade-image';
import Contact from './ContactUS'
import { mainUrl } from './globals.js'

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 3
        }}
    />
);

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
    onChange: (oldIndex, newIndex) => {
    }
}

var slideImages = [
];

class Elem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainUrl: mainUrl.url,
            persons: [],
            slideIndex: 0,
            imageIndex: 0,
            images: [],
            switch: false
        }
        this.switchImages = this.switchImages.bind(this);

    }

    async componentDidMount() {
        this.setState({ images: [] })
        slideImages = [];
    }

    switchImages() {
        if (this.state.imageIndex === this.state.images.length - 1) {
            this.setState({ imageIndex: 0 });
        } else {
            this.setState({ imageIndex: this.state.imageIndex + 1 });
        }
    }

    getParams() {
        let params = null;

        if (this.props && this.props.location) {
            params = this.props.location.state;
        }
        else if (this.props) {
            params = this.props;
        }
        else {
            console.log("hopelesss");
        }

        let Name = (params && params.name) ? params.name : null;
        // let Image = (params && params.image) ? params.image : null;
        // let ID = (params && params.id) ? params.id : null;
        let area = (params && params.area) ? params.area : null;
        let year = (params && params.year) ? params.year : null;
        let location = (params && params.locationn) ? params.locationn : null;
        let type = (params && params.type) ? params.type : null;
        var images = (params && params.images) ? params.images : null;
        let url22 = this.state.mainUrl + "/load_image/?img=";
        if (images != null) {
            var images_array = [];
            images_array = images.split(",");
            var i;
            for (i = 0; i < images_array.length; i++) {
                slideImages[i] = encodeURI(url22 + `${images_array[i]}&&type=${type}`);
            }
            if (images_array.length < 4) {
                slideImages[2] = encodeURI(url22 + `${images_array[0]}&&type=${type}`);;
            }
        }
        let slides = slideImages
        return { Name, area, year, slides, location }
    }

    render() {
        let cls = 'row';
        let url2 = this.state.mainUrl + "/load_image/?img=";

        const Slideshow = () => {
            return (
                <div className="slide-container" >
                    <Slide {...properties}>
                        <div className="each-slide">
                            <div style={{ 'backgroundImage': `url(${slideImages[0]})`, height: "800px" }}>
                                <span>{this.state.name}</span>
                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{ 'backgroundImage': `url(${slideImages[1]})`, height: "800px" }}>
                                <span>{this.state.name}</span>
                            </div>
                        </div>
                        <div className="each-slide">
                            <div style={{ 'backgroundImage': `url(${slideImages[2]})`, height: "800px" }}>
                                <span>{this.state.name}</span>
                            </div>
                        </div>
                    </Slide>
                </div>
            )
        }
        const ListGrid = () => {
            const result = this.state.persons.map((x, i) => {
                return i % 4 === 0 ? this.state.persons.slice(i, i + 4) : null;
            }).filter(x => x != null);
            return (
                <div>
                    {result.map((result, index) => {
                        return (<section class="row" key={index}>
                            {result.map(person => <span class="col-sm" >< img alt="arabex project" class="wr" src={encodeURI(url2 + `${person.image}`)} onClick={() => this.passData(person.name, person.id, encodeURI(url2 + `${person.image}` + `&&type=` + `${person.category_id}`), person.area, person.year)} />
                                <h2><span class="editTxt">{person.name}</span></h2>
                                <br></br>
                            </span>
                            )}
                        </section>);
                    })}
                </div>
            );
        }

        let { Name, area, year, slides, Locationn } = this.getParams();

        return (
            <div >
                <div>
                    <ul style={{ backgroundColor: "brown", height: "30px" }}>
                        <li className="txt" style={{ display: cls, backgroundColor: "brown", listStyle: "none" }}>
                            Projects > Conservation > {Name}
                        </li>
                    </ul>
                    <Slideshow />
                </div>
                <h3>{Name}</h3>
                <div class="container">
                    <div class="row divColor">
                        <div class="col-sm ">
                            <p>{Locationn}</p>
                            <p>{year}</p>
                            <p>{area}</p>
                        </div>
                        <div class="col-sm">
                            <CrossfadeImage duration={1000} timingFunction={"ease-out"} src={slides[this.state.imageIndex]} />
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div class="container">
                    <div class="row divColor">
                        <div class="col-sm">
                            < CrossfadeImage duration={1000} timingFunction={"ease-out"} src={slides[this.state.imageIndex + 1]} />
                        </div>
                        <div class="col-sm">
                            <p style={{ fontStyle: "oblique", fontSize: 22, textAlign: "center", paddingTop: 77 }}>this villa was built with specific modern design based on customers orders</p>
                        </div>
                    </div>

                    {this.state.switch}
                </div>
                <hr></hr>
                <div class="container">
                    <div class="row">{slideImages.length > 3 ? (
                        <button class="specificButton" onClick={() => this.switchImages()}>show more images</button>
                    ) : (null)}

                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col-sm">{slideImages.length > 4 ? (
                            <CrossfadeImage duration={1000}
                                timingFunction={"ease-out"} src={slides[this.state.imageIndex + 2]} />
                        ) : (null)}

                        </div>
                    </div>
                </div>
                <ColoredLine color="rgb(128, 41, 41)" />
                <h3>check related projects</h3>
                <div class="container"> <ListGrid /> </div>
                <Contact />
            </div>
        );
    }
}
export default withRouter(Elem)
