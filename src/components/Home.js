import React from 'react'
import { getMakes } from '../services/makeService'
import Makes from './Makes'
import Models from './Models'
import { getModels } from '../services/modelService'
import Carasoul from './Carasoul'



class Home extends React.Component {
    state = {
        makes: [],
        models: [],
        selectedMake: '',
    }
    async componentDidMount() {
        const makes = await getMakes()
        const models = await getModels()

        this.setState({ makes, models })
    }

    handleMakeChange = (make) => {
        this.setState({ selectedMake: make })
    }

    render() {

        if (!this.state.makes){return <p>No Makes Found</p>} 
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <Makes
                                makes={this.state.makes}
                                onChange={this.handleMakeChange}
                                selectedMake={this.state.selectedMake}
                            />
                        </div>
                        {this.state.selectedMake === ''
                            ? <Carasoul />
                            :

                            <div className="col">
                                <Models
                                    models={this.state.models}
                                    selectedMake={this.state.selectedMake}
                                />

                            </div>}
                    </div>
                </div>
            </div>
        )
    }


}

export default Home