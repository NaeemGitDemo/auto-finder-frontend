import React from 'react'
import defaultPic from './img/defaultCarPic.jpg'
import Pagination from './Pagination'
import { getCarDetails } from '../services/carDetailsService'
import pagination from '../utils/pagination'
import SelectPage from '../components/SelectPage'
import _ from 'lodash'

const imageBaseURL = 'https://autofinder-car-images.s3.us-east-2.amazonaws.com/'
class CarDetails extends React.Component {
    state = {
        carDetails: [],
        filteredCarList: [],
        currentPage: 1,
        pageSize: 3,
        pages: [],
    }

    async componentDidMount() {
        const carDetails = await getCarDetails(this.props.match.params.id)
        this.setState({ carDetails })

    }
    handleCurrentPage = (page) => {
        this.setState({ currentPage: page })
    }
    handlePageSize = (pageSize) => {
        this.setState({ pageSize, currentPage: 1 })
    }

    render() {

        const pagesNeeded = Math.ceil(this.state.carDetails.length / this.state.pageSize)
        const pages = _.range(1, pagesNeeded + 1)
        //this.setState({ pages })
        const { carDetails, currentPage, pageSize } = this.state
        const carDetailsList = pagination(carDetails, currentPage, pageSize)

        if (!this.state.carDetails) {
            return (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            )
        }

        if (this.state.carDetails.length < 1) {
            return (
                <div className='container'>
                    <div className="alert alert-danger" role="alert">
                        No Cars Found in this Section !!!
                    </div>
                </div>)
        }

        return (
            <div className='container'>
                <div className="row row-cols-1 row-cols-md-3">
                    {
                        carDetailsList.map(car => {
                            return <div className="card" key={car._id}>
                                <img src={(imageBaseURL + car._id)
                                    ? (imageBaseURL + car._id)
                                    : defaultPic}

                                    className="card-img-top" alt="car-pic" />
                                <div className="card-body">
                                    <h5 className="card-title">$ {car.price}</h5>
                                    <h4>{car.model.make.name}-{car.model.name}</h4>
                                    <p>Color: <b>{car.color}</b></p>
                                    <p>Year: <b>{car.year}</b></p>
                                    <p>Body Type: <b>{car.bodyType}</b></p>
                                    <p>Transmission: <b>{car.transmission}</b></p>
                                    <p className="card-text"><b>{car.description}</b></p>
                                    <p className="card-text">Posted By:<b><i>{car.userName}</i></b> <a href='#'>Contact Seller</a></p>
                                   
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col">
                            <SelectPage
                                pageSize={this.state.pageSize}
                                onChange={this.handlePageSize}
                                pages={pages}
                            />
                        </div>
                        <div className="col">
                            <Pagination
                                pages={pages}
                                onClick={this.handleCurrentPage}
                                pageSize={this.state.pageSize}
                                currentPage={this.state.currentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CarDetails