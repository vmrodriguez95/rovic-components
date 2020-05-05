import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../styles/styles.scss';

import '../components/button/_button';
import '../components/carousel/_carousel';

// Código del inicializador
import './initializer';

require.context('../images/', true, /\.(png|jpe?g|gif|svg)$/);

