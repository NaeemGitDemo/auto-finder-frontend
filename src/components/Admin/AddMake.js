import React from 'react'
import { addMakes, getMake, updateMake } from '../../services/makeService'



class AddMake extends React.Component {
    state = {
        make: {
            name: ''
        },
        errMsg: '',
        className: '',
        value: '',
        new: ''
    }

    async componentDidMount() {
        if (this.props.match.params.id === "new") {
            this.setState({ new: true })

        }
        else {
            const make = await getMake(this.props.match.params.id)
            this.setState({ new: false, make, value: make.name })
        }
    }
    handleChange = (e) => {
        const make = { ...this.state.make }
        make[e.target.name] = e.target.value
        this.setState({ make, value: e.target.value, errMsg: '' })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (this.state.new) {
                await addMakes(this.state.make)
                this.setState({ errMsg: 'Make Added Successfully', className: 'alert alert-success', value: '' })
                this.props.history.push('/dashboard/updatemake')
            }

        } catch (error) {
            this.setState({ errMsg: error.response.data.error, className: 'alert alert-danger' })
        }

    }
    handleUpdate = async () => {
        try {
            await updateMake(this.props.match.params.id, this.state.make.name)
            this.setState({ errMsg: 'Make Updated', className: 'alert alert-success' })
            this.props.history.push('/dashboard/updatemake')
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
                        <label htmlFor="make">Enter Make of Car</label>

                        <input
                            name='name'
                            type="text"
                            value={this.state.value}
                            className="form-control"
                            id="make"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <small className="form-text text-muted">E.g Ford, GMC, Toyota, Honda...</small>

                    </div>
                    {this.state.new &&
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.handleSubmit}
                        >Add</button>
                    }
                    {!this.state.new &&
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.handleUpdate}
                        >Update</button>}
                </form>
            </div>
        )
    }
}

export default AddMake