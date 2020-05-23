import React, { useEffect, useState, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import _ from 'lodash';

import history from '../../history';
import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './CityInfo.css';

const CitiyInfo = (props) => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  let query = props.location.search;
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const search = new URLSearchParams(query);
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:3232/api/v1/cities?${search}`,
          'GET',
          null,
          {
            'Authorization': localStorage.getItem('access_token')
          }
        );
        setLoadedPlaces(responseData.data);
      } catch (err) {}
    };
    if(isLoggedIn) fetchPlaces();
  }, [sendRequest, query, isLoggedIn]);

  const loadMoreData = () => {
    const search = new URLSearchParams(query);
    let currLimit = !_.isNaN(_.parseInt(search.get('limit'))) ? parseInt(search.get('limit')) : 10;
    let nextLimit = currLimit+10
    history.push({
      pathname: 'cities',
      search: `?limit=${nextLimit}`
    });
  }

  if(!isLoggedIn) {
    return <Redirect to={'login'} />;
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} />
      )}
      <div className="load-more-container">
        <button className="load-more-button" onClick={loadMoreData}>Load More</button>
      </div>
    </React.Fragment>
  );
};

export default withRouter(CitiyInfo);
