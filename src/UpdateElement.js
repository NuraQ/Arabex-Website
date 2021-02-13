
import React from "react";
import { useLocation } from "react-router";
import { useState, useEffect } from 'react';
import './Add.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const ExtraImgs = ({ ELEMENT }) => {
    var images_array = [];

    if (ELEMENT && ELEMENT.images) {
        images_array = ELEMENT.images.split(",");
        return (images_array.map(img => (
            <div>
                <div class="container" >
                    <div class="row">
                        <div class="col-sm" style={{ backgroundColor: "darkgrey" }}>
                            <img class="imgStyle" src={encodeURI("http://127.0.0.1:9999/load_image/?img=" + `${img}` + "&&type=" + `${ELEMENT.category_id}`)} />
                        </div>
                    </div>
                </div>

            </div>

        ))
        )
    } else {
        return (<div></div>)
    }
}
function UpdateElement() {

    let location = useLocation();
    const [element, setElement] = useState({})
    const [imageName, setimgName] = useState("")
    const [type, setType] = useState()
    let imgServerUrl = "http://127.0.0.1:9999/load_image?img=" + imageName + "&&type=" + type;

    useEffect(() => {
        // Update the document title using the browser API
        if (location)
            setElement(location.state.element)

    }, []);



    const handleSelectedFile = event => {
        try {
            let file = event.target.files[0];
            console.log(event.target.files[0]);
            let file_url = URL.createObjectURL(file)
            this.setState({

                imageName: file.name,
                imageSource: file,
                mainImage: event.target.id,
                file_url: file_url, //for local
                isUploaded: false,
                isUploading: false
            });
        } catch (err) {
            alert("Error nothing chosen")
        }
        console.log(this.state.mainImage);


    }
    return (
        <div class="row">
            <div class="form-style-5">
                <form>
                    <fieldset>
                        <legend><span class="number">1</span>{element.name}</legend>
                        <img src={encodeURI("http://127.0.0.1:9999/load_image/?img=" + `${element.image}` + "&&type=" + `${element.category_id}`)}></img>
                        <label>Name</label> <input type="text" name="field1" value={element.name} />
                        <label>location</label><input type="email" name="field2" value={element.location} />
                        <label>Description</label><textarea name="field3" value={element.description}></textarea>
                        <label>Area</label><textarea name="field3" value={element.area}></textarea>
                        <label>year</label><textarea name="field3" value={element.year}></textarea>
                        {/* <ExtraImgs {...element}></ExtraImgs> */}
                    </fieldset>

                    <fieldset>
                        <legend><span class="number">2</span> Additional Images</legend>
                        <ExtraImgs ELEMENT={element}></ExtraImgs>
                    </fieldset>
                    <input type="submit" value="Apply" />
                </form>
            </div>
            <div class="form-style-5">
                <form>
                    <fieldset>
                        <legend><span class="number">1</span> Update Info here</legend>
                        <img src={encodeURI("http://127.0.0.1:9999/load_image/?img=" + `${element.image}` + "&&type=" + `${element.category_id}`)}></img>
                        <label for="job">New Name:</label>
                        <input type="text" name="field1" placeholder="New project name *" />
                        <label for="job">New Location:</label>
                        <input type="email" name="field2" placeholder="New Location *" />
                        <label for="job">New Description:</label>
                        <textarea name="field3" placeholder="New Description"></textarea>
                        <label for="job">Area:</label>
                        <input type="email" name="" placeholder="New Area *" />

                        <label for="job">Year:</label>
                        <input type="email" name="" placeholder="New Year *" />

                    </fieldset>
                    <fieldset>
                        <legend><span class="number">2</span> Add more images</legend>
                        <input type="file" name='file' id='images'
                            onChange={handleSelectedFile}
                        />
                        <img
                            src={encodeURI(imgServerUrl)}
                            style={{ width: 200, height: 200 }}
                        />
                    </fieldset>
                    <input type="submit" value="Apply" />
                </form>
            </div>
        </div>

    );
}


export default UpdateElement;