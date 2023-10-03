const getPaginatedPayload = (dataArray, page, limit) => {
  const startPosition = +(page - 1) * limit

  const totalItems = dataArray.length // total documents present after applying search query
  const totalPages = Math.ceil(totalItems / limit)

  dataArray = structuredClone(dataArray).slice(
    startPosition,
    startPosition + limit
  )

  const payload = {
    page,
    limit,
    totalPages,
    previousPage: page > 1,
    nextPage: page < totalPages,
    totalItems,
    currentPageItems: dataArray?.length,
    data: dataArray,
  }
  return payload
}

module.exports = getPaginatedPayload