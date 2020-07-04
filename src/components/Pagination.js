import React from 'react'

const Pagination = (props) => {

    const { currentPage, pages } = props

    if (pages.length === 1) return null

    return (
        <div>
            <nav >
                <ul className="pagination justify-content-end">
                    {pages.map(page => {
                        return <li className={currentPage === page
                            ? "page-item active"
                            : "page-item "}
                            key={page}
                        >
                            <button
                                className="page-link"
                                onClick={() => props.onClick(page)}
                            >{page}</button></li>
                    })}

                </ul>
            </nav>
        </div>
    )
}



export default Pagination