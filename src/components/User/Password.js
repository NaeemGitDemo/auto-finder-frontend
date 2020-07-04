import React from 'react'
import { updateUserPassword } from '../../services/userService'

class Password extends React.Component {
    state = {
        account: {
            password: '',
            password2: ''
        },
        errMsg: '',
        className: 'alert alert-success',
    }

    handleChange = (e) => {
        const account = { ...this.state.account }
        account[e.target.name] = e.target.value
        this.setState({ account, errMsg: '' })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        if (this.state.account.password !== this.state.account.password2) { return this.setState({ errMsg: "Password Does Not Match", className: 'alert alert-danger' }) }
        try {
            const password = this.state.account.password
            await updateUserPassword(password)
            this.setState({ errMsg: 'Password Updated Successfully', className: 'alert alert-success ' })
        } catch (error) {
            this.setState({ errMsg: error.response.data.error, className: 'alert alert-danger' })
        }
    }
    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    {this.state.errMsg &&
                        <div className={this.state.className} role="alert">
                            {this.state.errMsg}
                        </div>}
                    <div className="form-group">
                        <label htmlFor="password">New password</label>
                        <input
                            type="password"
                            className="form-control"
                            name='password'
                            onChange={this.handleChange}


                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Confrim Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name='password2'
                            onChange={this.handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-warning">Update Password</button>
                </form>

            </div>
        )
    }

}

export default Password
