import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import './PlaceItem.css';

const PlaceItem = props => {

  return (
    <React.Fragment>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__info">
            <h2>{props.name}</h2>
            <h3>{props.state}</h3>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
