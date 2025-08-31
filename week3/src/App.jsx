import { useEffect, useState } from 'react';
import ArtistDetail from './components/artist/artist-detail/artist-detail';
import Card from './components/card/card';
import Search from './components/search/search';
import { getData, getSearchData } from './service/data-fetch';
import './App.css';

function App() {
  const initialSearch = decodeURIComponent(window.location.pathname.slice(1));
  const [data, setData] = useState(null);
  const [search, setSearch] = useState(initialSearch);
  const [path, setPath] = useState(window.location.pathname);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchFn =
      search === ''
        ? () => getData(abortController.signal)
        : () => getSearchData(search, abortController.signal);

    fetchFn()
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error(error.message);
          setError('데이터를 불러오지 못했습니다...');
        }
      });

    return () => {
      abortController.abort();
    };
  }, [search]);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to, state = null) => {
    window.history.pushState(state, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section className="app">
      <h1>리액트 3주차 과제</h1>
      <a className="home-link" href="/">
        Home↑
      </a>
      <Search setSearch={setSearch} search={search} navigate={navigate} />

      {error && <p className="error">{error}</p>}

      {path === '/' ? (
        <Card artists={data} search={search} path={path} navigate={navigate} />
      ) : (
        <ArtistDetail
          name={decodeURIComponent(path.slice(1))}
          data={history.state || data}
        />
      )}
    </section>
  );
}

export default App;
