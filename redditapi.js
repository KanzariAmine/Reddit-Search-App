export default {
  search: function (searchTerm, searchLimit, sortBy) {
    return fetch(
      `http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
    )
      .then((res) => res.json())
      .then((response) => response.data.children.map((data) => data.data))
      .catch((error) => console.error(error));
  },
};
