import ArtistAlbum from '../artist-album/artist-album';
import ArtistTrack from '../artist-track/artist-track';
import React, { useState } from 'react';
import Card from '@/components/card/card';
import Categories from '@/components/categories/categories';
import { CATEGORIES } from '@/components/categories/constants.js';
import './artist-detail.css';

function ArtistDetail({ name, data }) {
  const [category, setCategory] = useState(CATEGORIES[0]);

  if (!data || data.length === 0) {
    return <p className="error">{name}에 대한 정보를 찾을 수 없습니다.</p>;
  }

  const trackSlice = data[0].track.slice(0, 4);

  return (
    <div className="detail-container">
      <Categories
        categories={CATEGORIES}
        onClick={setCategory}
        selected={category}
      />
      {category === 'Track' ? (
        <>
          <div className="result-wrapper">
            <ArtistTrack track={data[0].track} />
          </div>
        </>
      ) : category === 'Album' ? (
        <>
          <div className="result-more">
            <ArtistAlbum album={data[0].album} />
          </div>
        </>
      ) : (
        <>
          <div className="result-wrapper">
            <Card artists={data} disabled />
            <ArtistTrack track={trackSlice} />
          </div>
          <div className="result-more">
            <ArtistAlbum album={data[0].album} />
          </div>
        </>
      )}
    </div>
  );
}

export default ArtistDetail;
