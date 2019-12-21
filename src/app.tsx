import 'jquery';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import { Root } from 'personal-landing-page/components/Root';

const wrapper = document.getElementById('app-wrapper');

//const resumeUrl = 'https://drive.google.com/open?id=16zpkvHbJF9cVp5u56MnsDBIVBk-Fuk6riZLXBhrElnc';

const appPlaceholder = (<Root />);

if (wrapper) {
    ReactDOM.render(appPlaceholder, wrapper);
} else {
    console.error("No wrapper element found");
}