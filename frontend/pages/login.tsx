import * as React from 'react';
import { useState, useEffect } from 'react';
import { SiTrakt } from 'react-icons/si';
import Link from 'next/link';
import ApiHelper from '../helpers/ApiHelper';
import AuthHelper from '../helpers/AuthHelper';

const Login = () => {
	const [ email, setEmail ] = useState<string>();
	const [ password, setPassword ] = useState<string>();
	const [ error, setError ] = useState<string>();

	const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();

        ApiHelper.post('users/login/', { email, password }, (res : any) => {
			setError(res.error);

			if (res.success) {
				// Logged successfuly
				AuthHelper.saveUser(res.user);

				// Redirect to homepage
				window.location.href = "/";
			}
        });
    }

	const handleTraktLogin = () => {
		ApiHelper.get('users/get_trakt_auth_url', (res : any) => {
			window.location.href = res.url;
		})
	}

	return (
		<div id="login-wrap">
			<div id="login-page-bg"></div>
			<div id="login-page-content">
				<div className="form">
					<div className="form-panel one">
						<div className="form-header">
							<h1>Account Login</h1>
						</div>

						<div id="login-with-trakt-btn" onClick={ handleTraktLogin }>
							LOGIN WITH TRAKT.TV <SiTrakt/>
						</div>

						<div className="form-content">
							<form onSubmit={ (e) => handleSubmit(e) }>
								<div className="form-group">
									<label>Email Address</label>
									<input
										id="email"
										type="email"
										name="Email Address"
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
									<label className="form-remember">
										<input type="checkbox" checked/>
										Remember Me
									</label>
									<a className="form-recovery" href="#">
										Forgot Password?
									</a>
								</div>

								{ error && <div className="message danger">{ error }</div> }

								<div className="form-group">
									<button type="submit">Log In</button>
								</div>

								<div id="form-redirect-text">
									Don't have an account? <Link href="/register/"><a href="/register/">Register</a></Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
