import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from './themes/Dark';
import App from './components/App';

ReactDOM.render(<MuiThemeProvider theme={darkTheme}><App /></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();