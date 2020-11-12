import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useQuery, gql } from '@apollo/client';

import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.spacex.land/graphql/',
  cache: new InMemoryCache()
});

// const client = ...
client
  .query({
    query: gql`
      query GetRates {
        launches(limit: 5) {
          launch_date_utc
          launch_success
          rocket {
            rocket_name
          }
          links {
            video_link
          }
          details
        }
      }`
  })
  .then(result => console.log(result));

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.launches.map(({ launch_date_utc, launch_success, rocket, links, details }) => (
    <div key={rocket.rocket_name}>
      <p>
        {rocket.rocket_name}
        {links.video_link}
        {launch_date_utc}
        {launch_success}
        {details}
      </p>
    </div>
  ));
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ExchangeRates />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
