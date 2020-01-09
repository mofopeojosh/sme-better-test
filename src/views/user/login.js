import React, {Component} from 'react';
import {Row, Label, FormGroup, Button} from 'reactstrap';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {NotificationManager} from '../../components/common/react-notifications';
import {Formik, Form, Field} from 'formik';

import {loginUser} from '../../redux/actions';
import {Colxx} from '../../components/common/CustomBootstrap';
import IntlMessages from '../../helpers/IntlMessages';
import '../../assets/css/sass/sme-better.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'demo@gogo.com',
      password: 'gogo123',
      imagePaths: ['login-illustration.svg', 'login-illustration-3.svg', 'login-illustration-2.svg', 'login-illustration-1.svg'],
      imageIndex: 0
    };
  }

  componentDidMount() {
    setInterval(() => {
      let imageIndex = this.state.imageIndex;
      let incrementIndex = imageIndex + 1;
      imageIndex = incrementIndex === this.state.imagePaths.length ? 0 : incrementIndex;
      this.setState({imageIndex});
    }, 2000);
  }


  onUserLogin = (values) => {
    if (!this.props.loading) {
      if (values.email !== '' && values.password !== '') {
        this.props.loginUser(values, this.props.history);
      }
    }
  };

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your email address';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your password';
    } else if (value.length < 4) {
      error = 'Value must be longer than 3 characters';
    }
    return error;
  };

  togglePasswordVisibility = () => {
    const e = document.getElementById('password');
    console.log(e, 'l');
    if (e.type === 'password') {
      e.type = 'text';
    } else {
      e.type = 'password';
    }
  };

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        'Login Error',
        3000,
        null,
        null,
        ''
      );
    }
  }

  render() {
    const {password, email} = this.state;
    const initialValues = {email, password};

    return (
      <Row className="min-vh-100 sme-login">
        <Colxx xxs="12" md="5" className="sme-login-section">
          <h3>SME Better</h3>
          <Formik
            initialValues={initialValues}
            onSubmit={this.onUserLogin}>
            {({errors, touched}) => (
              <Form className="sme-form">
                <h2>Login to your Business Manager</h2>
                <FormGroup className="form-group mt-4 sme-form-input">
                  <Label>
                    Email Address
                  </Label>
                  <Field
                    className="form-control sme-rounded"
                    name="email"
                    validate={this.validateEmail}
                  />
                  {errors.email && touched.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </FormGroup>
                <FormGroup className="form-group mt-4 sme-form-input">
                  <Label>
                    Enter your Password
                  </Label>
                  <div className="input-group">
                    <Field
                      className="form-control sme-rounded border-0"
                      type="password"
                      id="password"
                      name="password"
                      validate={this.validatePassword}
                    />
                    <div className="input-group-append align-middle">
                      <a href="#" className="input-group-text border-0" onClick={this.togglePasswordVisibility}>
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g opacity="0.5">
                            <path
                              d="M20.2425 10.4457C19.4873 8.85456 18.5885 7.5569 17.5462 6.55272L16.4531 7.64585C17.3445 8.4977 18.1209 9.6121 18.7923 11C17.0048 14.6996 14.4675 16.457 10.9999 16.457C9.95909 16.457 9.00039 16.2967 8.12383 15.9762L6.93939 17.1606C8.15684 17.7228 9.51036 18.0039 10.9999 18.0039C15.1292 18.0039 18.2101 15.8533 20.2425 11.5521C20.3242 11.3792 20.3666 11.1902 20.3666 10.9989C20.3666 10.8076 20.3242 10.6187 20.2425 10.4457ZM18.8768 3.55694L17.9609 2.63999C17.9449 2.62401 17.926 2.61133 17.9051 2.60268C17.8842 2.59403 17.8619 2.58958 17.8393 2.58958C17.8167 2.58958 17.7943 2.59403 17.7735 2.60268C17.7526 2.61133 17.7336 2.62401 17.7177 2.63999L15.3679 4.98866C14.0724 4.32694 12.6164 3.99608 10.9999 3.99608C6.87064 3.99608 3.78978 6.14667 1.75736 10.4478C1.67567 10.6208 1.6333 10.8098 1.6333 11.0011C1.6333 11.1924 1.67567 11.3813 1.75736 11.5543C2.56933 13.2644 3.54687 14.6352 4.68998 15.6666L2.4165 17.9394C2.3843 17.9717 2.3662 18.0154 2.3662 18.0609C2.3662 18.1065 2.3843 18.1502 2.4165 18.1824L3.33367 19.0996C3.3659 19.1318 3.4096 19.1499 3.45517 19.1499C3.50073 19.1499 3.54443 19.1318 3.57666 19.0996L18.8768 3.80015C18.8927 3.78418 18.9054 3.76523 18.9141 3.74436C18.9227 3.7235 18.9272 3.70113 18.9272 3.67854C18.9272 3.65596 18.9227 3.63359 18.9141 3.61273C18.9054 3.59186 18.8927 3.5729 18.8768 3.55694ZM3.20756 11C4.99721 7.30038 7.53451 5.54296 10.9999 5.54296C12.1717 5.54296 13.2371 5.74405 14.2037 6.1529L12.6933 7.66325C11.9781 7.28161 11.159 7.13997 10.3571 7.25923C9.55523 7.37849 8.81288 7.75232 8.23961 8.3256C7.66634 8.89887 7.2925 9.64122 7.17324 10.4431C7.05398 11.245 7.19562 12.064 7.57727 12.7793L5.78504 14.5716C4.7931 13.6961 3.93803 12.5099 3.20756 11ZM8.50775 11C8.50813 10.6211 8.59787 10.2477 8.76967 9.91008C8.94148 9.57243 9.19051 9.28007 9.49653 9.05675C9.80256 8.83342 10.1569 8.68544 10.5309 8.62481C10.9049 8.56418 11.2879 8.59262 11.6488 8.70782L8.62184 11.7348C8.54597 11.4972 8.50748 11.2493 8.50775 11Z"
                              fill="black" fillOpacity="0.5"/>
                            <path
                              d="M10.914 13.4062C10.8397 13.4062 10.7664 13.4028 10.6938 13.3961L9.55902 14.531C10.2416 14.7923 10.9852 14.8504 11.7 14.6982C12.4149 14.546 13.0703 14.1899 13.5871 13.6731C14.104 13.1563 14.46 12.5008 14.6122 11.786C14.7645 11.0712 14.7064 10.3275 14.445 9.64497L13.3102 10.7798C13.3169 10.8524 13.3203 10.9257 13.3203 11C13.3205 11.316 13.2583 11.629 13.1375 11.921C13.0166 12.213 12.8394 12.4784 12.6159 12.7018C12.3924 12.9253 12.1271 13.1026 11.8351 13.2234C11.5431 13.3443 11.2301 13.4064 10.914 13.4062Z"
                              fill="black" fillOpacity="0.5"/>
                          </g>
                        </svg>
                      </a>
                    </div>
                  </div>
                  {errors.password && touched.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password}
                    </div>
                  )}
                </FormGroup>
                <div className="text-center">
                  <Button
                    color="white"
                    block
                    outline
                    className={`sme-btn sme-rounded sme-btn-login mt-4 ${this.props.loading ? 'show-spinner' : ''}`}
                    size="lg"
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1"/>
                      <span className="bounce2"/>
                      <span className="bounce3"/>
                    </span>
                    <span className="label font-weight-bold">SIGN IN</span>
                  </Button>
                  <div className="mt-3">
                    <span className="mr-2 sme-muted-text">Don’t have an account?</span>
                    <NavLink className="text-white font-weight-bold" to={`/user/forgot-password`}>
                      Sign Up
                    </NavLink>
                  </div>
                  <div className="mt-4">
                    <NavLink className="text-white font-weight-bold" to={`/user/forgot-password`}>
                      <IntlMessages id="user.forgot-password-question"/>
                    </NavLink>
                  </div>
                  <Button
                    block
                    color="white"
                    className={`sme-btn sme-rounded mt-4 ${this.props.loading ? 'show-spinner' : ''}`}
                    size="lg"
                  >
                    <svg className="align-middle" width="13" height="14" viewBox="0 0 13 14" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M6.9196 2.77644C8.219 2.77644 9.09553 3.35885 9.59531 3.84552L11.5483 1.86693C10.3488 0.710092 8.78797 3.05176e-05 6.9196 3.05176e-05C4.21318 3.05176e-05 1.87579 1.61163 0.737854 3.95721L2.97528 5.76029C3.53657 4.02902 5.0897 2.77644 6.9196 2.77644Z"
                            fill="#EA4335"/>
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M13.5633 7.33998C13.5633 6.7496 13.5171 6.31877 13.4172 5.87199H6.92017V8.53671H10.7338C10.6569 9.1989 10.2417 10.1962 9.31906 10.8663L11.5027 12.6215C12.8097 11.369 13.5633 9.52601 13.5633 7.33998Z"
                            fill="#4285F4"/>
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M2.98324 8.60051C2.83715 8.15373 2.75258 7.67504 2.75258 7.18039C2.75258 6.68574 2.83715 6.20705 2.97555 5.76027L0.738123 3.9572C0.269107 4.93054 0 6.02355 0 7.18039C0 8.33723 0.269107 9.43024 0.738123 10.4036L2.98324 8.60051Z"
                            fill="#FBBC05"/>
                      <path fillRule="evenodd" clipRule="evenodd"
                            d="M6.91969 14.3608C8.78806 14.3608 10.3566 13.7226 11.5022 12.6216L9.3186 10.8664C8.73424 11.2892 7.94995 11.5844 6.91969 11.5844C5.08976 11.5844 3.53662 10.3319 2.98303 8.60059L0.745605 10.4037C1.88354 12.7492 4.21324 14.3608 6.91969 14.3608Z"
                            fill="#34A853"/>
                    </svg>
                    <span className="label font-weight-light ml-4">
                      Log in with Google</span>
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Colxx>
        <Colxx xxs="12" md="7" className="bg-white text-center d-flex flex-column justify-content-center">
          <h2 className="sme-text-blue">Organize your customer information</h2>
          <div className="mt-5">
            <img src={`/assets/img/${this.state.imagePaths[this.state.imageIndex]}`} alt="customer"/>
          </div>
          <div className="slider-carousel mt-5">
            {this.state.imagePaths.map((image, index) => (
              index === this.state.imageIndex ?
                <span className="mx-1">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M3.73684 7.47591C5.80064 7.47591 7.47368 5.80239 7.47368 3.73799C7.47368 1.67359 5.80064 6.10352e-05 3.73684 6.10352e-05C1.67304 6.10352e-05 0 1.67359 0 3.73799C0 5.80239 1.67304 7.47591 3.73684 7.47591Z"
                          fill="#2D74DA"/>
                  </svg>
                </span>
                :
                <span className="mx-1">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd"
                          d="M4.21053 7.47591C6.27433 7.47591 7.94737 5.80239 7.94737 3.73799C7.94737 1.67359 6.27433 6.10352e-05 4.21053 6.10352e-05C2.14673 6.10352e-05 0.473694 1.67359 0.473694 3.73799C0.473694 5.80239 2.14673 7.47591 4.21053 7.47591Z"
                          fill="#79A6F6"/>
                  </svg>
                </span>

            ))}
          </div>

        </Colxx>
      </Row>
    );
  }
}

const mapStateToProps = ({authUser}) => {
  const {user, loading, error} = authUser;
  return {user, loading, error};
};

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(Login);
