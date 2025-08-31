import React from 'react';
import { FormatTime } from '@/components/utils/formatTime';
import './artist-track.css';

function ArtistTrack({ track }) {
  return (
    <ul className="track-container">
      {track.map((item, idx) => (
        <li className="track-wrapper" key={item.id}>
          <div className="track-description">
            <span className="track-number">{idx + 1}</span>
            <img
              className="track-album-img"
              src={item.img_url}
              alt={`${item.album} 앨범`}
            />
            <div className="track-artist">
              <span>{item.name}</span>
              <span>{item.artist}</span>
            </div>
          </div>
          <span className="track-time">{FormatTime(item.duration_ms)}</span>
        </li>
      ))}
    </ul>
  );
}

export default ArtistTrack;
