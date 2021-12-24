const queryStringify = (query) => {
  const queryArray = [];
  Object.keys(query).forEach((key) => {
    queryArray.push(`${key}=${query[key]}`);
  });

  return queryArray.join("&");
};
export default { queryStringify };
