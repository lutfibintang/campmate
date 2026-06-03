import '../css/app.css';
import '../css/campusmate/theme.css';
import './bootstrap';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import UserDropdown from './components/UserDropdown';
import DatePicker from './components/forms/DatePicker';
import TimePicker from './components/forms/TimePicker';
import ImageUpload from './components/forms/ImageUpload';
import SelectDropdown from './components/forms/SelectDropdown';
import DayPicker from './components/forms/DayPicker';

const appName = import.meta.env.VITE_APP_NAME || 'CampusMate';
const pages = import.meta.glob('./pages/**/*.jsx');

function parseMaybeJson(value, fallback = null) {
    if (!value) return fallback;

    try {
        return JSON.parse(value);
    } catch (_error) {
        return fallback;
    }
}

function datasetToProps(element) {
    const props = { ...element.dataset };

    if (props.user) props.user = parseMaybeJson(props.user, null);
    if (props.required !== undefined) props.required = props.required === 'true' || props.required === '';
    if (props.multiple !== undefined) props.multiple = props.multiple === 'true' || props.multiple === '';
    if (props.step !== undefined) props.step = Number(props.step) || props.step;
    if (props.options) props.options = parseMaybeJson(props.options, props.options);

    return props;
}

function mountReactIsland(selector, Component) {
    document.querySelectorAll(selector).forEach((element) => {
        if (element.dataset.reactMounted === 'true') return;

        element.dataset.reactMounted = 'true';
        createRoot(element).render(<Component {...datasetToProps(element)} />);
    });
}

export function mountStandaloneCampusMateComponents() {
    mountReactIsland('[data-user-dropdown-root]', UserDropdown);
    mountReactIsland('[data-react-date-picker]', DatePicker);
    mountReactIsland('[data-react-time-picker]', TimePicker);
    mountReactIsland('[data-react-image-upload]', ImageUpload);
    mountReactIsland('[data-react-select-dropdown]', SelectDropdown);
    mountReactIsland('[data-react-day-picker]', DayPicker);
}

createInertiaApp({
    title: (title) => (title ? `${title} · ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./pages/${name}.jsx`, pages),
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#c9d68b',
    },
}).then(() => {
    mountStandaloneCampusMateComponents();
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountStandaloneCampusMateComponents, { once: true });
} else {
    mountStandaloneCampusMateComponents();
}
