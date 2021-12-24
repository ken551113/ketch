import "regenerator-runtime/runtime";

import Fetch from "./lib/index.js";

const fetch = new Fetch();

const fetchWithBaseUrl = new Fetch({
  BASE_URL: "https://jsonplaceholder.typicode.com",
});

fetch
  .get({
    url: "https://jsonplaceholder.typicode.com/comments",
    query: "postId=1",
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

fetchWithBaseUrl
  .get({
    url: "comments",
    query: "postId=1",
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
