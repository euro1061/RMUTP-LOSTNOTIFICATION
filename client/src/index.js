import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './store/auth-context';
import { store } from './store/store'
import { Provider } from 'react-redux'

const themeColorDefault = JSON.parse(localStorage.getItem('themeColor'))
const rootEle = document.documentElement
if (themeColorDefault === null) {
    localStorage.setItem("themeColor", JSON.stringify({
        primaryColor: "#5b21b6",
    }))
} else {
    rootEle.style.setProperty('--primary-color', themeColorDefault.primaryColor)
}

ConfigProvider.config({
    theme: {
        // primaryColor: '#5b21b6',
        primaryColor: themeColorDefault?.primaryColor ? themeColorDefault.primaryColor : '#5b21b6',
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