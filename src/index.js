import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from './themes/Dark';

ReactDOM.render(<MuiThemeProvider theme={darkTheme}><App /></MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();