import React from 'react'


class SearchBar extends React.Component {

    state = {
        searchText: ''
    }

    handleSearchText = (text) => {
        console.log(text)
    }

    render() {
        return (
            <div>
                Search Cars
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"

                    onChange={(e) => { this.handleSearchText(e.target.value) }}>

                </input>

            </div>
        )
    }
}


export default SearchBar