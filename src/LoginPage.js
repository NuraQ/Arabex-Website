
import React, { Component } from 'react';

import './App.css';
import Add from './Add';

import { mainUrl } from './globals.js'
import { BrowserRouter, Route } from 'react-router-dom';

import './log.css'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBInput } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';


class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      error: true,
      success: false,
      storeURL: "",
      originalURL: mainUrl.url
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
    this.doFetch = this.doFetch.bind(this);

  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleclick = () => {
    if (!this.state.username) {
      return this.setState({ error: true });
    }

    if (!this.state.password) {
      return this.setState({ error: true });
    } else {
      this.setState({ error: false })
    }
    this.doFetch();
  }
  async doFetch() {
    let ID = this.state.username;
    let pass = this.state.password;
    console.log(this.state);
    var url = mainUrl.url + "/process_get/:id?";
    let url2 = url + "id=" + `${ID}` + "&" + "pass=" + `${pass}`;
    const response = await fetch(url2, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })

    if (response.status === 200) {
      const token = response.Cookie;
      this.setState({ success: true });
    } else {
      const res = await response.json();

      const error = new Error(res.error);
      alert(error);

    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
  }
  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };
  passData(name, pass) {
    this.props.history.push({
      pathname: '/App',
      state: { Name: name, pass: pass }//has nothing with component state
    })
  }
  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  store = e => {
    if (e.target.value != "") {
      this.setState({ storeURL: e.target.value });
    }
  }

  render() {
    return (

      <MDBContainer>
        {!this.state.success || this.state.error ? (

          <MDBRow>
            <MDBCol md='6'>
              <MDBCard
                className='card-image'
                style={{
                  backgroundImage:
                    'url(https://mdbootstrap.com/img/Photos/Others/pricing-table7.jpg)',
                  width: '28rem'
                }}
              >
                <div className='.form-dark text-white rgba-stylish-strong py-5 px-5 z-depth-4 '>
                  <div className='text-center '>
                    <h3 className='white-text mb-5 mt-4 font-weight-bold '>
                      <strong>SIGN </strong>
                      <a href='#!' className='.form-dark green-text font-weight-bold '>
                        <strong> IN</strong>
                      </a>
                    </h3>
                  </div>
                  <MDBInput
                    className="inptxt"
                    label='Your email'
                    data-test="username" value={this.state.username} onChange={this.handleUserChange}
                    group
                    type='text'
                    validate
                    labelClass='white-text '
                  />
                  <MDBInput className=" pass"
                    label='Your password'
                    group
                    type='password'
                    data-test="password" value={this.state.password} onChange={this.handlePassChange}
                    validate
                    labelClass='white-text'
                  />

                  <MDBRow className='d-flex align-items-center mb-4 '>
                    <div className='text-center mb-3 col-md-12'>
                      <button
                        rounded
                        type='button'
                        className="signInButton"
                        onClick={this.handleclick} data-test="submit"
                      >
                        Sign in
                  </button>
                    </div>
                  </MDBRow>
                  <MDBCol md='12'>
                    <p className='font-small white-text d-flex justify-content-end'>
                      Have an account?
                  <a href='#!' className='green-text ml-1 font-weight-bold'>
                        Log in
                  </a>
                    </p>
                  </MDBCol>
                </div>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        ) : (<BrowserRouter>
          {/* <label onClick={() => this.passData(this.state.username, this.state.password)} value="click here">/*/}
          <Route path="/" render={() => <div><Add /></div>} />
        </BrowserRouter>
          )}
      </MDBContainer>
    );
  };
}

export default LoginPage;