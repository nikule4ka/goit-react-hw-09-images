import axios from 'axios';

const api = 'https://pixabay.com/api/?';
const apiKey = '19649885-84cc8a7bfeabe0e9969e6732';

function fetchImages({ searchQuery = '', currentPage = 1, perPage = 12 }) {
  return axios
    .get(
      `${api}q=${searchQuery}&page=${currentPage}&key=${apiKey}d&image_type=photo&orientation=horizontal&per_page=${perPage}`,
    )
    .then(response => ({
      hits: response.data.hits,
      total: response.data.total,
    }));
}

export { fetchImages };
