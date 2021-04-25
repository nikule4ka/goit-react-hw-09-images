import React from 'react';
import Loader from 'react-loader-spinner';
import s from './Loader.module.css';

export default class App extends React.Component {
  //other logic
  render() {
    return (
      <Loader
        type="Bars"
        color="#3f51b5"
        height={80}
        width={80}
        className={s.Loader}
      />
    );
  }
}
