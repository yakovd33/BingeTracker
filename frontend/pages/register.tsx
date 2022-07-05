import * as React from 'react';
import { useState, useEffect } from 'react';
import { SiTrakt } from 'react-icons/si';
import Link from 'next/link';
import ApiHelper from '../helpers/ApiHelper';

const Register = () => {
    const [ email, setEmail ] = useState<string>();
    const [ password, setPassword ] = useState<string>();
    const [ rePass, setRePass ] = useState<string>();

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();

        ApiHelper.post('users/register/', { email, password, rePass }, (res : any) => {
        });
    }

	return (
		<div id="login-wrap">
			<div id="login-page-bg"></div>
			<div id="login-page-content">
                <div className="form">
                    <div className="form-panel one">
                        <div className="form-header">
                            <h1>Account Signup</h1>
                        </div>

                        <div id="login-with-trakt-btn">
                            JOIN WITH TRAKT.TV <SiTrakt/>
                        </div>

                        <div className="form-content">
                            <form onSubmit={ (e) => handleSubmit(e) }>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={ email }
                                        onChange={ (e) => setEmail(e.target.value) }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={ password }
                                        onChange={ (e) => setPassword(e.target.value) }
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password Again</label>
                                    <input
                                        id="re-password"
                                        type="password"
                                        name="re-password"
                                        value={ rePass }
                                        onChange={ (e) => setRePass(e.target.value) }
                                    />
                                </div>

                                <div className="form-group">
                                    <button type="submit">SIGN UP</button>
                                </div>

                                <div id="form-redirect-text">
                                    Already have an account? <Link href="/login/"><a href="/login/">Log In</a></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
			</div>
		</div>
	);
};

export default Register;