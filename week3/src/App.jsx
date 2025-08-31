import { useEffect, useState } from 'react';
import ArtistDetail from './components/artist/artist-detail/artist-detail';
import Card from './components/card/card';
import Search from './components/search/search';
import { getData, getSearchData } from './service/data-fetch';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [path, setPath] = useState(window.location.pathname);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const currentSearch = decodeURIComponent(path.slice(1));

    const fetchFn =
      path === '/'
        ? () => getData(abortController.signal)
        : () => getSearchData(currentSearch, abortController.signal);

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
  }, [path]);

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
      <Search navigate={navigate} />

      {error && <p className="error">{error}</p>}

      {path === '/' ? (
        <Card artists={data} path={path} navigate={navigate} />
      ) : (
        <ArtistDetail name={decodeURIComponent(path.slice(1))} data={data} />
      )}
    </section>
  );
}

export default App;
