const getRootElement = (data) => {
  return data.filter(
    (record) => !data.some((item) => record.parentId === item.id)
  )[0]
}

export const listToTree = (data = []) => {
  const rootElement = getRootElement(data)
  if (!rootElement) {
    console.error("Could not determine the root element")
    return []
  }

  const dataTree = []
  const dataMap = {}

  for (const record of data) {
    if (!record.id) {
      console.error(
        "Invalid data format. Could not find 'id' in record",
        record
      )
      return
    }

    dataMap[record.id] = { ...record, children: [] }
  }

  for (const record of data) {
    if (!record.id || !record.parentId) {
      console.error(
        "Invalid data format. Could not find 'id' or 'parentId' in record",
        record
      )
      return
    }

    if (record.parentId === rootElement.parentId) {
      dataTree.push(dataMap[record.id])
      continue
    }

    dataMap[record.parentId].children.push(dataMap[record.id])
  }

  console.log(dataTree)
  return dataTree
}

export const searchTree = (node, searchId, path = []) => {
  if (node.id === searchId) {
    path.push(node.id)
    return path
  }

  if (!node.children) {
    return null
  }

  for (const childNode of node.children) {
    const resPath = searchTree(childNode, searchId, path)
    if (resPath) {
      path.push(node.id)
      return path
    }
  }

  return null
}
