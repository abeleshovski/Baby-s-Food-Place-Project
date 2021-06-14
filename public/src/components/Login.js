import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie';
export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const cookies = new Cookies();

    const history = useHistory()

    const url = `http://${process.env.REACT_APP_API_URL}/auth/login`
    function handleSubmit(e) {
        e.preventDefault();

        fetch(url, {
            method: "post",
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => {
            console.log(res);
            return res.json();
        })
            .then(data => {
                if (data.error) {
                    alert(data.message)
                }

                else {
                    cookies.set('token', data.token, { path: '/' });
                    cookies.set('id', data.id, { path: '/' })
                    history.push('/home')
                    window.location.reload(false);

                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    //
    return (
        <div id='login'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name='email' type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)}></input>
                <input name='password' placeholder='Enter password' type='password' value={password} onChange={e => setPassword(e.target.value)}></input>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}