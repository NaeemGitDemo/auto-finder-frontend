import React from 'react'
import { uploadImage } from '../../services/imageService'



class UploadCarPic extends React.Component {
    state = {
        file: null,
        fileName: 'Choose Image...',
        errMsg: '',
        className: 'alert alert-success',
    }

    validateAllowedFile = (type) => {
        const validFile = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
        let valid = validFile.filter(file => {
            return file === type
        })
        if (valid.length > 0) return true
        return false
    }
    handlePicButton = async () => {
        console.log('Clicked')
        const formData = new FormData()
        if (this.state.file) {
            const valid = this.validateAllowedFile(this.state.file.type)
            if (!valid) {
                return this.setState({ errMsg: 'Invalid File Type', className: 'alert alert-danger' })
            }

            formData.append('carPic', this.state.file, this.props.match.params.id)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            await uploadImage(formData, config)
            this.props.history.push('/dashboard')
        }
        else {
            return this.setState({ errMsg: 'Please Upload Pic', className: 'alert alert-danger' })
        }

    }
    hanldePicChange = (e) => {

        this.setState({ file: e.target.files[0], fileName: e.target.files[0].name, errMsg: '' })
    }
    render() {

        return (
            <div className='container'>
                <h3> Upload Picture </h3>
                {this.state.errMsg &&
                    <div className={this.state.className} role="alert">
                        {this.state.errMsg}
                    </div>}
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="inputGroupFile01"
                        name='carPic'
                        onClick={() => { this.setState({ errMsg: '' }) }}
                        onChange={this.hanldePicChange}
                    />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.fileName}</label>

                </div>
                <button type='button' className="btn btn-primary mt-2"
                    onClick={this.handlePicButton}
                >Add-Pic</button>
                <button type='button' className="btn btn-outline-secondary ml-3 mt-2"
                    onClick={() => { this.props.history.push('/dashboard') }}
                >Skip</button>
            </div>


        )
    }
}


export default UploadCarPic