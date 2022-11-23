import React from 'react'
import BannerHeader from '../../components/BannerHeader';
import Topbar from '../../components/Topbar';
import HomeList from './components/HomeList';
import './style/Home.css'

const testData = [
    {
        title: "หูฟัง Bluetooth สีขาวหนึ่งข้าง",
        image: "test2.jpg",
        type: "guest"
    },
    {
        title: "นาฬิกา Smart Watch สีดำ",
        image: "test1.jpg",
        type: "user"
    },
]

const testData2 = [
    {
        title: "หูฟัง11 Bluetooth สีขาวหนึ่งข้าง",
        image: "test2.jpg",
        type: "guest"
    },
]

export default function Home() {
    return (
        <div>
            <Topbar />
            <BannerHeader />

            <HomeList testData={testData} testData2={testData2}/>
        </div>
    )
}
