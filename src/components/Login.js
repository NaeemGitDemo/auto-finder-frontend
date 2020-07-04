import React from 'react'
import { loginUser, saveToken } from '../services/loginService'

class Login extends React.Component {
    state = {
        account: {
            email: '',
            password: ''
        },
        errMsg: ''//'A simple danger alert—check it out!'
    }

    handleChange = (e) => {
        const account = { ...this.state.account }
        account[e.target.name] = e.target.value
        this.setState({ account, errMsg: '' })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { email, password } = this.state.account
            const user = {}
            user.email = email
            user.password = password

            const res = await loginUser(user)
            saveToken(res.headers['x-auth-token'])
            window.location = '/'

        } catch (error) {
            this.setState({ errMsg: error.response.data.error })
        }
    }
    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    {this.state.errMsg &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.errMsg}
                        </div>}
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Username</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control "
                            onChange={(e) => this.handleChange(e)}

                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="form-control"
                            onChange={(e) => this.handleChange(e)}


                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}

export default Login
