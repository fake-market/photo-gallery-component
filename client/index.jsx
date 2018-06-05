import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../client/index.css';
import App from './components/App/App.jsx';

ReactDOM.render(<div className= { styles.body }><App /></div>, document.getElementById("app"));