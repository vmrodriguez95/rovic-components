import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../styles/styles.scss';

import '../components/button/_button';
import '../components/carousel/_carousel';

require.context('../images/', true, /\.(png|jpe?g|gif|svg)$/);

