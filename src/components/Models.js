import React from 'react'
import { Link } from 'react-router-dom'


const imageBaseURL = 'https://autofinder-car-images.s3.us-east-2.amazonaws.com/'

const Models = ({ models, selectedMake }) => {

    const filterList = () => {
        return models.filter(model => {
            return model.make.name === selectedMake
        })

    }



    const filterModelList = filterList()
    return (

        <div className="row row-cols-1 row-cols-md-3">

            {filterModelList.map(model => {
                return <div className="card" key={model._id}>
                    <img src={imageBaseURL + model._id} className="card-img-top" alt={`${model.name}.jpg`} />
                    <div className="card-body">
                        <h5 className="card-title"><Link to={`/home/${model.name}`}><h4>{model.name}</h4></Link></h5>

                    </div>
                </div>

            })}
        </div>

    )
}


export default Models