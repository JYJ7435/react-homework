import React from 'react';
import './artist-album.css';

function ArtistAlbum({ album }) {
  const sortedAlbum = album.sort(
    (a, b) =>
      new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
  );

  return (
    <ul className="album-container">
      {sortedAlbum.map((item) => (
        <li className="album-wrapper" key={item.id}>
          <img className="album-img" src={item.img_url} alt={item.name} />
          <span className="album-name">{item.name}</span>
          <span className="album-description">
            {item.release_date} • {item.artist}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default ArtistAlbum;
