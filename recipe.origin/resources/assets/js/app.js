
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import { render } from "react-dom"
// import i18n from 'i18next';
/**
 * Loading React routes from routes.
 */
import Routes from './routes/routes'
import Routepc from './routes/routepc'

if(device_env == 4){
    render(
        Routepc,
        document.getElementById('app')
    )
}else{
    render(
        Routes,
        document.getElementById('app')
    )
}

