import React from 'react';
import './card.css';

/**
 * Card 컴포넌트
 * 상태에 따라 다른 색상의 버튼 표시.
 *
 * @param {Object} props
 * @param {Array} props.artists -  Data[]
 * @param {string} [props.search] -  검색어
 * @param {string} [props.path] -  PathName
 * @param {(string, artist: Object) => void} [props.navigate] - 아티스트 클릭 시 실행되는 함수
 * @param {boolean} [props.disabled] - Mouse Event 옵션
 */

function Card({ artists, search, path, navigate, disabled = false }) {
  if (!artists || artists.length === 0) {
    return;
  }

  const wrapperClassName = disabled ? 'disabled' : '';

  return (
    <ul className="card-container">
      {artists.map((artist) => {
        const linkTarget = `/${encodeURIComponent(search || artist.name)}`;
        return (
          <li
            className={`card-wrapper ${wrapperClassName}`.trim()}
            key={artist.id}
          >
            <a
              className="card-link"
              href={linkTarget}
              onClick={(e) => {
                e.preventDefault();
                navigate(linkTarget, [artist]);
              }}
              tabIndex={path === '/' ? 0 : -1}
            >
              <div className="artist-thumbnail">
                <img
                  className="artist-img"
                  src={artist.img_url}
                  alt={`${artist.name} 이미지`}
                />
                {path === '/' && (
                  <span className="artist-seemore">더 보기 →</span>
                )}
              </div>
              <div className="artist-description">
                <span className="artist-name">{artist.name}</span>
                <span className="artist-type">
                  {artist.type === 'artist' ? 'Artist' : artist.type}
                </span>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default Card;
