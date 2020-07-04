import React from 'react'


const Makes = ({ makes, selectedMake, onChange }) => {
    
    return (
        <div>

            {makes.map(make => {
                return <div className="list-group" key={make._id}>
                    <button className={selectedMake === make.name
                        ? "list-group-item list-group-item-action active"
                        : "list-group-item list-group-item-action"
                    }
                        onClick={() => onChange(make.name)}
                    >
                        {make.name}

                    </button>
                </div>

            })}
        </div>
    )
}

export default Makes