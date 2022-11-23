import React from 'react'
import Topbar from '../../components/Topbar'
import ProfileList from './components/ProfileList'

const testData = [
    {
        title: "หูฟัง Bluetooth สีขาวหนึ่งข้าง",
        image: "test2.jpg",
        type: "guest"
    },
]

export default function ProfileNotification() {
    return (
        <div>
            <Topbar />
            <ProfileList testData={testData}/>
        </div>
    )
}
