import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { mainUrl } from './globals.js'
import './Add.css'


class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 50, //null,
            //other properties
            file_url: null,
            images: "",
            imageName: null,
            imageSource: null,
            isUploading: false,
            isUploaded: false,
            mainImage: "image",
            jsonResponse: {},
            type: "",
            name: "",
            location: "",
            area: "", //null,
            year: "",
            file: "",
            adminId: "",
            adminPassword: "",
            ID: null,
            //other properties
        }
        //this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        /* var urlll = "http://127.0.0.1:9999/redirectPage/";
 
         fetch(urlll, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/x-www-form-urlencoded',
             },
 
             body: "data"
         }).then(res => JSON.stringify(res))
         .then(res =>alert(res));
         ;
     }*/
    }
    handleImg = (e) => {
        let file = e.target.files[0];
        this.setState({ file: file });
        // this.fetchImage(file);
    }

    mySubmitHandler() {
        var imgs = []
        let url = `${mainUrl.url}/file_upload`;
        const data = new FormData();
        data.append("file", this.state.imageSource);
        data.append("imageName", this.state.imageName);
        data.append('id', this.state.ID);
        data.append('type', this.state.type);
        data.append('mainImage', this.state.mainImage);
        data.append('cat_id', this.state.type);

        if (this.state.mainImage.localeCompare("images") === 0) {
            imgs += this.state.imageName + ",";
        }
        this.setState({images: imgs})
        data.append("images", this.state.images);
        console.log(this.state.jsonResponse.id);
        this.setState({ isUploaded: false, isUploading: true })
        fetch(url, {
            method: 'post',
            body: data

        }).then(response => { alert(response); return response.json(); })
            .then(json => {
                this.setState({ isUploading: false, jsonResponse: json, isUploaded: true })
            }).catch((error) => {
                //success = false;
                console.log(error);
                alert("error:" + error)
                //func_fail.apply(obj,[error]);
                this.setState({ isUploading: false });
            });
    }

    async doFetch() {
        let url = `${mainUrl.url}/file_upload`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify(this.state),
        });

        this.state.jsonResponse = await response.json();
        this.state.ID = await this.state.jsonResponse.id;
        this.state.images = "";
        this.setState({images: ""})
        alert(this.state.jsonResponse.success);
        this.mySubmitHandler();
    }
    handleID = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSelectedFile = event => {
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


    submitInput() {
        this.doFetch();
    }
    myChangeHandler = (event) => {

        let nam = event.target.name;
        let value = event.target.value;
        console.log(nam);
        this.setState({ [event.target.name]: value });

    }
    ProjectTypeHandler = (event) => {

        let nam = event.target.name;
        console.log(nam);
        this.setState({ type: nam });
        document.getElementById("change").innerText = nam

    }
    handleDelete = () => {
        let { ID } = { ID: 24 };
        let url = "http://127.0.0.1:9999/item_del/:id"
        fetch(url, {
            method: "DELETE",

            body: JSON.stringify({ ID })
        })
            .then(res => console.log(res));
    }


    addNewAdmin() {
        var adminId = this.state.adminId;
        var adminPassword = this.state.adminPassword;
        let url = `${mainUrl.ur}/add_admin/:id/`
        fetch(url, {
            method: "post",

            body: JSON.stringify({ id: adminId, password: adminPassword })
        })
            .then(res => res.json)
            .then(r => alert(r.success));
    }

    onChange2 = date => this.setState({ ExpirationDate: date, date: date })
    onChange = date => this.setState({ year: date })
    render() {
        let imgServerUrl = "http://127.0.0.1:9999/load_image?img=" + this.state.imageName + "&&type=" + this.state.type;
        return (
            <div className='row' >

                <div class="form-style-5">

                    <p>Enter  name:</p>
                    {this.state.type}
                    <div>
                        <div className='inputs' >
                            <input
                                type='text'
                                name='name'
                                onChange={this.myChangeHandler}

                            />
                            <p>Enter Area:</p>

                            <input
                                type='text'
                                name='area'
                                onChange={this.myChangeHandler}

                            />
                            <p>Enter Location:</p>
                            <input
                                type='text'
                                name='location'
                                onChange={this.myChangeHandler}

                            />

                            <div>
                                <p>Enter Year:</p>

                                <input name='year'
                                    type='text'
                                    onChange={this.myChangeHandler}

                                />

                            </div>
                            <div class="row">
                                <div class="col-sm">
                                    <div class="dropdown" >
                                        <button className="dropbtn" type="button" id="change" >select project type</button>
                                        <div class="dropdown-content">
                                            <button class="sub_menu" name="Villa" onClick={this.ProjectTypeHandler}>Villa</button>
                                            <button class="sub_menu" name="Conservation" onClick={this.ProjectTypeHandler}>Conservation</button>
                                            <button class="sub_menu" name="Landscaping" onClick={this.ProjectTypeHandler} >Landscape</button>
                                            <button class="sub_menu" name="OFFICE_BUILDINGS" onClick={this.ProjectTypeHandler} >OFFICE BUILDINGS</button>
                                            <button class="sub_menu" name="INTERIOR_DESIGN" onClick={this.ProjectTypeHandler} >INTERIOR DESIGN</button>
                                            <button class="sub_menu" name="PUBLIC" onClick={this.ProjectTypeHandler}>PUBLIC</button>
                                            <button class="sub_menu" name="EDUCATIONAL" onClick={this.ProjectTypeHandler} >EDUCATIONAL</button>
                                            <button class="sub_menu" name="INDUSTRIAL" onClick={this.ProjectTypeHandler} > INDUSTRIAL</button>
                                        </div>
                                    </div>
                                    <div class="col-sm">
                                        <p>insert main image</p>
                                        <input type="file" name='file' id='image'
                                            onChange={this.handleSelectedFile}
                                        />

                                        {this.state.imageName && this.state.isUploaded &&
                                            <img alt="img to upload"
                                                src={encodeURI(imgServerUrl)}
                                                style={{ width: 200, height: 120 }}
                                            />
                                        }
                                        <img alt="img to upload"
                                            src={this.state.file_url}
                                            style={{ width: 200, height: 120 }}
                                        />

                                        <button type="button" onClick={() => { this.submitInput() }} >add main image and info</button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div>
                        <p>insert other images</p>
                        <input type="file" name='file' id='images'
                            onChange={this.handleSelectedFile}
                        />
                        {this.state.mainImage}
                        {this.state.imageName && this.state.isUploaded &&
                            <img alt="img to upload"
                                src={encodeURI(imgServerUrl)}
                                style={{ width: 200, height: 120 }}
                            />
                        }
                        <img alt="img to upload"
                            src={this.state.file_url}
                            style={{ width: 200, height: 120 }}
                        />
                        <button type="button" onClick={() => this.mySubmitHandler()}>add extra images</button>

                    </div>
                </div>


                <div class="form-style-5">
                    <p>Enter Admin ID</p>
                    <input
                        type='text'
                        name='adminId'
                        onChange={this.myChangeHandler}

                    />

                    <p>Enter admin password:</p>
                    <input
                        type='text'
                        name='adminPassword'
                        onChange={this.myChangeHandler}

                    />
                    <button type="button" onClick={() => this.addNewAdmin()}>add new admin</button>
                    <button onClick={this.handleDelete}>DELETE</button>

                </div>
            </div>

        );
    }
}
export default Add;