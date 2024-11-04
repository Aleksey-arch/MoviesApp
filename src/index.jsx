import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9
//     .eyJhdWQiOiJhMTUzZjAxNjJhZjM1MTkyYWIyNTE0MWR
//     lMWUzYTYyYiIsIm5iZiI6MTczMDAxNDczNC4zMzM2ODg
//     sInN1YiI6IjY3MWRlYTBmYzc4MDJjYzUwMzVhNTJlOSI
//     sInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjox
//     fQ.5pF8cGy0D6hybdnuRuebWNdnbKeukdHcc-6wQlx0I7Q'
//   }
// };

// fetch('https://api.themoviedb.org/3/search/movie?query=string&include_adult=false&language=en-US', options)
//   .then(res => res.json())
//   .then(res => console.log(res.results))
//   .catch(err => console.error(err));

// const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTU
// zZjAxNjJhZjM1MTkyYWIyNTE0MWRlMWUzYTYyYiIsIm5iZiI6MTczM
// DEwMTAwNi42NDIwNCwic3ViIjoiNjcxZGVhMGZjNzgwMmNjNTAzNWE1M
// mU5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.hhHs
// _2H6QVHx0N-8ST85SMeFe7iWk_nCyEEFt1pc1BM';

// async function fetchMovies(query) {
//   try {
//     const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`, {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: `Bearer ${API_KEY}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error(`Ошибка при получении данных: ${response.status}`);
//     }

//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Ошибка:", error);
//     throw error;
//   }
// }

// async function main() {
//   try {
//     return await fetchMovies('The Matrix');

//   } catch (error) {
//     console.error("Ошибка:", error);
//   }
// }

// main();
