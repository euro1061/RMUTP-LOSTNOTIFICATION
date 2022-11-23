import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './store/auth-context';
import { store } from './store/store'
import { Provider } from 'react-redux'

ConfigProvider.config({
    theme: {
        // primaryColor: '#5b21b6',
        primaryColor: '#5b21b6',
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider>
        <Provider store={store}>
            <AuthContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthContextProvider>
        </Provider>
    </ConfigProvider>
);