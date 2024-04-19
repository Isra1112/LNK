import React from 'react'
import { login } from '../../api/login';
import './login.css';


class LoginViews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
        }
    }

    validateInputs = () => {
        let isValid = true;
        const { email, password } = this.state;
        
        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

        if (!email.trim()) {
            this.setState({ emailError: 'Email is required' });
            isValid = false;
        } else if (email && !isValidEmail.test(email)){
            this.setState({ emailError: 'Email not valid' });
        } else {
            this.setState({ emailError: '' });
        }

        if (!password.trim()) {
            this.setState({ passwordError: 'Password is required' });
            isValid = false;
        } else {
            this.setState({ passwordError: '' });
        }

        return isValid;
    };

    loginHandle = () => {
        console.log('loginHandle');
        if (!this.validateInputs()) {
            return;
        }
        let body = {
            email: this.state.email,
            password: this.state.password
        };

        login(body).then((res) => {
            console.log('res', res);
            res.data && localStorage.setItem('token', res.data.token);
            window.location.href = "/";
        }
        ).catch((err) => {
            console.log('err', err);
        });
        
    };



    render() {
        return (
            <div className={'mainContainer'}>
                <div className={'titleContainer'}>
                    <div>Login</div>
                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        type='email'
                        // value={email}
                        placeholder="Enter your email here"
                        onChange={e => this.setState({ email: e.target.value })}
                        className={'inputBox'}
                    />
                    {this.state.emailError && <label className="errorLabel">{this.state.emailError}</label>}

                </div>
                <br />
                <div className={'inputContainer'}>
                    <input
                        type='password'
                        // value={password}
                        placeholder="Enter your password here"
                        onChange={e => this.setState({ password: e.target.value })}
                        className={'inputBox'}
                    />
                    {this.state.passwordError && <label className="errorLabel">{this.state.passwordError}</label>}

                    {/* <label className="errorLabel">{this.state.emailError}</label> */}

                </div>
                <br />
                <div className={'inputContainer'}>
                    <input className={'inputButton'} type="button" onClick={this.loginHandle} value={'Log in'} />
                </div>
            </div>
        )
    }
}

export default LoginViews;