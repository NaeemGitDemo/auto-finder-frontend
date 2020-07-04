import React from 'react'


class SelectPage extends React.Component {
    render() {

      
        return (
            <div>
                <div className="input-group ">
                    <div className="input-group-prepend">
                        <label className="input-group-text" >Items Per Page</label>
                    </div>
                    <select value={this.props.pageSize}
                        onChange={(e) => this.props.onChange(e.target.value)}
                    >
                        <option value='3'>3</option>
                        <option value='6'>6</option>
                        <option value='9'>9</option>
                        <option value='12'>12</option>
                        <option value='15'>15</option>
                        <option value='30'>30</option>
                    </select>
                </div>
            </div>
        )
    }
}


export default SelectPage