import React from 'react'
import { getMakes } from '../../services/makeService'
import { getModel, addModel, updateModel } from '../../services/modelService'

class AddModel extends React.Component {
    state = {
        new: 'false',
        makes: [],
        selectedMake: '',
        model: {
            name: '',
            makeId: ''
        },
        errMsg: '',
        className: 'alert alert-success',
        defaultValue: ''
    }
    componentDidMount = async () => {
        const makes = await getMakes()
        this.setState({ makes })
        if (this.props.match.params.id === 'new') {
            this.setState({ new: true })
        }
        else {
            const model = await getModel(this.props.match.params.id)
            model.makeId = model.make._id
            this.setState({ new: false, model, defaultValue: model.make.name })
        }
    }

    handleChange = (e) => {
        const value = e.target.value
        let model = { ...this.state.model }
        model.name = value
        this.setState({ model })
    }

    handleMakeChange = (option) => {
        const model = { ...this.state.model }
        model.makeId = option
        this.setState({ model })

    }

    handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addModel(this.state.model)
            this.setState({ errMsg: 'Model Added', className: 'alert alert-success' })
            this.props.history.push('/dashboard/updatemodel')
        } catch (error) {
            this.setState({ errMsg: error.response.data.error, className: 'alert alert-danger' })
        }
    }
    handleUpdate = async () => {
        try {
            const model = {}
            model.name = this.state.model.name
            model.makeId = this.state.model.makeId
            console.log(model)
            await updateModel(this.props.match.params.id, model)
            this.setState({ errMsg: 'Model Updated', className: 'alert alert-success' })
            this.props.history.push('/dashboard/updatemodel')
        } catch (error) {
            this.setState({ errMsg: error.response.data.error, className: 'alert alert-danger' })
        }

    }
    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        {this.state.errMsg &&
                            <div className={this.state.className} role="alert">
                                {this.state.errMsg}
                            </div>}
                        <label htmlFor="name">Model Name</label>
                        <input
                            name='name'
                            type="text"
                            className="form-control"
                            id="name"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.model.name}
                        />
                        <small id="emailHelp" className="form-text text-muted">e.g Fusion, Accord, Camary, Jeep...</small>
                    </div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-default">Select Make</span>
                        </div>
                        <select
                            className="form-control"
                            value={this.state.model.makeId}
                            onChange={(e) => this.handleMakeChange(e.target.value)}
                        >    <option value={''} disabled>{this.state.defaultValue}</option>
                            {
                                this.state.makes.map(make => {
                                    return (
                                        <option value={make._id} key={make._id}>{make.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    {this.state.new && <button type="submit" className="btn btn-primary">Add</button>}
                    {!this.state.new && <button type="button" className="btn btn-primary"
                        onClick={this.handleUpdate}
                    >Update</button>}
                </form>

            </div>
        )
    }
}

export default AddModel