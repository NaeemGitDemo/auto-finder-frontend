import React from 'react'
import { getModels } from '../../services/modelService'
import { getMakes } from '../../services/makeService'
import { addCarDetails } from '../../services/carDetailsService'

const bodyType = [
    { id: 1, type: 'Sedan' },
    { id: 2, type: 'Coupe' },
    { id: 3, type: 'SUV' },
    { id: 4, type: 'Van' },
    { id: 5, type: 'Convertible' },
    { id: 6, type: 'Truck' },
    { id: 7, type: 'Wagon' },
]
const Year = [
    { id: 1, year: 1980 },
    { id: 2, year: 1990 },
    { id: 3, year: 2000 },
    { id: 4, year: 2010 },
    { id: 5, year: 2020 },
]
class AddCar extends React.Component {
    state = {
        models: [],
        makes: [],
        selectedMake: '',
        selectedModel: '',
        carDetails: {
            color: '',
            price: '',
            milage: '',
            description: '',
            year: '',
            bodyType: '',
            driveType: '',

        },
        errMsg: '',
        className: 'alert alert-success',
    }

    componentDidMount = async () => {
        const makes = await getMakes()
        const models = await getModels()

        this.setState({ makes, models })
    }

    generateModelList = () => {
        return this.state.models.filter(model => {
            return model.make.name === this.state.selectedMake
        })
    }
    handleMakeChange = (e) => {
        const selectedMake = e.target.value
        this.setState({ selectedMake, errMsg: '' })
    }
    handleModelChange = (e) => {
        const selectedModel = e.target.value
        this.setState({ selectedModel, errMsg: '' })

    }
    handleChange = (e) => {
        const carDetails = { ...this.state.carDetails }
        carDetails[e.target.name] = e.target.value
        this.setState({ carDetails, errMsg: '' })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const { selectedMake, selectedModel } = this.state
        const { color, price, milage } = this.state.carDetails
        if (selectedMake === '') { return this.setState({ errMsg: 'Please Select Make', className: 'alert alert-danger' }) }
        if (selectedModel === '') { return this.setState({ errMsg: 'Please Select Model', className: 'alert alert-danger' }) }
        if (color === '') { return this.setState({ errMsg: 'Please Enter Color', className: 'alert alert-danger' }) }
        if (price === '') { return this.setState({ errMsg: 'Please Enter Price', className: 'alert alert-danger' }) }
        if (milage === '') { return this.setState({ errMsg: 'Please Enter Milage', className: 'alert alert-danger' }) }


        let modelId = this.state.selectedModel
        const car = { ...this.state.carDetails, modelId }

        try {
            await addCarDetails(car)
            this.setState({errMsg:'Car Details Added', className: 'alert alert-success'})
            this.props.history.push('/dashboard')
        } catch (error) {
            this.setState({errMsg:error.response.data.error, className: 'alert alert-danger' })
        }

    }
    render() {
        const modelList = this.generateModelList()

        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit}>
                    {this.state.errMsg &&
                        <div className={this.state.className} role="alert">
                            {this.state.errMsg}
                        </div>}
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="inputState">Make</label>
                            <select id="inputState"
                                className="form-control"
                                onChange={(e) => this.handleMakeChange(e)}
                            >
                                <option value={this.state.selectedMake}></option>
                                {
                                    this.state.makes && this.state.makes.map(make => {
                                        return <option key={make._id} >{make.name}</option>
                                    })
                                }

                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputState">Model</label>
                            <select id="inputState" className="form-control"
                                onChange={(e) => this.handleModelChange(e)}
                            >
                                <option defaultValue></option>

                                {modelList.map(ml => {
                                    return <option key={ml._id} value={ml._id}>{ml.name}</option>
                                })
                                }

                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="transmission">Year</label>
                            <select id="transmission" className="form-control"
                                name='year'
                                onChange={(e) => this.handleChange(e)}
                            >
                                <option defaultValue>{''}</option>
                                {
                                    Year.map(y => {
                                        return <option key={y.id}>{y.year}</option>
                                    })
                                }


                            </select>
                        </div>
                    </div>



                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="color">Color</label>
                            <input type="text" className="form-control" id="color"
                                name="color"
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="bodyType">Body Type</label>
                            <select id="bodyType" className="form-control"
                                name='bodyType'
                                onChange={(e) => { this.handleChange(e) }}
                            >
                                <option defaultValue>{''}</option>
                                {
                                    bodyType.map(bt => {
                                        return <option key={bt.id}>{bt.type}</option>
                                    })

                                }

                            </select>
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="transmission">Transmission</label>
                            <select id="transmission" className="form-control"
                                name='transmission'
                                onChange={(e) => this.handleChange(e)}
                            >
                                <option defaultValue>{''}</option>
                                <option>Automatic</option>
                                <option>Manual</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="price">Price</label>
                            <input type="text" className="form-control" id="price"
                                name='price'
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="milage">Milage</label>
                            <input type="text" className="form-control" id="milage"
                                name='milage'
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="driveType">Drive Type</label>
                            <select id="driveType" className="form-control"
                                name='driveType'
                                onChange={(e) => this.handleChange(e)}
                            >
                                <option defaultValue>{''}</option>
                                <option>Front Wheel</option>
                                <option>Rear Wheel</option>
                                <option>AWD/4WD</option>
                            </select>
                        </div>
                    </div>



                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" placeholder=""
                            name='description'
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>



                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroupFileAddon01">Upload Car Picture</span>
                        </div>
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputGroupFile01" />
                            <label className="custom-file-label" htmlFor="inputGroupFile01">Choose file</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        )
    }

}
export default AddCar