import 'normalize.css';
import './css/style.scss';
import './js/main';

let context = require.context("./images/icons-svg/", true, /\.svg$/);
context.keys().forEach(context);

