import _ from 'lodash'

const pagination = (items, currentPage, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize
    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value()

}

export default pagination