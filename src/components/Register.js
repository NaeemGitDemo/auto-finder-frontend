import React from 'react'
import { registerUser } from '../services/registerService'
import { saveToken } from '../services/loginService'
import { getUser, updateUser } from '../services/userService'
class Register extends React.Component {
    state = {
        account: {
            name: '',
            email: '',
            password: '',
            password2: ''
        },
        errMsg: '',
        className: 'alert alert-success',
        new: false,
    }

    handleChange = (e) => {
        const account = { ...this.state.account }
        account[e.target.name] = e.target.value
        this.setState({ account, errMsg: '' })

    }


    handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password, password2 } = this.state.account

        if (password !== password2) { return this.setState({ errMsg: 'Password Does Not Match' }) }
        try {

            const user = {}
            user.name = name
            user.email = email
            user.password = password

            const res = await registerUser(user)
            saveToken(res.headers['x-auth-token'])
            window.location = '/'

        } catch (error) {
            this.setState({ errMsg: error.response.data.error })
        }
    }
    handleUpdate = async () => {
        try {
            const user = {}
            user.name = this.state.account.name
            user.email = this.state.account.email
            await updateUser(user)
            this.props.history.push('/profile')

        } catch (error) {
            this.setState({ errMsg: error.response.data.error, className: 'alert alert-danger' })
        }
    }
    componentDidMount = async () => {
        if (this.props.match.params.id === 'new') {
            this.setState({ new: true })
            console.log('new')

        }
        else {
            const { data } = await getUser()
            const account = data
            //console.log(account)
            this.setState({ account, new: false })
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
                        <label htmlFor="name">Name</label>
                        <input
                            name='name'
                            type="text"
                            value={this.state.account.name}
                            className="form-control "
                            onChange={(e) => this.handleChange(e)}
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            name='email'
                            type="email"
                            value={this.state.account.email}
                            className="form-control "
                            onChange={(e) => this.handleChange(e)}

                        />

                    </div>
                    {!this.state.new &&
                        <button type="button" onClick={this.handleUpdate} className="btn btn-primary">Update</button>
                    }
                    {this.state.new &&
                        <span>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    name='password'
                                    type="password"
                                    className="form-control"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password2">Confirm Password</label>
                                <input
                                    name='password2'
                                    type="password"
                                    className="form-control"
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">Register</button>
                        </span>}
                </form>
            </div >
        )
    }
}

export default Register
