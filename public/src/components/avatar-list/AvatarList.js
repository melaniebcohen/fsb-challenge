import React from 'react';
import AvatarCard from '../avatar-card/AvatarCard';

const AvatarList = ({ repositories }) => {
  return (
    <div className='avatar-list'>
      {repositories.length !== 0
        ? repositories.map((repo, i) => {
          return <AvatarCard repository={repo} key={i} />;
        })
        : null}
    </div>
  );
};

export default AvatarList;
