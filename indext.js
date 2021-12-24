import "regenerator-runtime/runtime";

import Fetch from "./lib/index.js";

const fetch = new Fetch();

const fetchWithBaseUrl = new Fetch({
  BASE_URL: "https://jsonplaceholder.typicode.com",
});

const fetchTimeout = new Fetch({
  BASE_URL: "http://localhost:8081",
  timeOut: 3000,
});

fetch
  .get({
    url: "https://jsonplaceholder.typicode.com/comments",
    query: {
      postId: 1,
      test: 123,
    },
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
    query: {
      postId: 1,
    },
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

fetchTimeout
  .get({
    url: "todo",
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
