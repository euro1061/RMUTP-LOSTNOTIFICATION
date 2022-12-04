import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Topbar'
import { getUserCurrentAPI } from '../../util/Functions/userFunction'
import { getAllMissingItemByUserId } from './API/ProfileNotificationAPI'
import ProfileList from './components/ProfileList'

// const testData = [
//     {
//         title: "หูฟัง Bluetooth สีขาวหนึ่งข้าง",
//         image: "test2.jpg",
//         type: "guest"
//     },
// ]

export default function ProfileNotification() {
    const [listMissingItem, setListMissingItem] = useState([])
    const [user, setUser] = useState({})
    const GetAllMissingItemByUserId = async (id) => {
        const { isSuccess, responseData, countTotal } = await getAllMissingItemByUserId(id)
        if(isSuccess) {
            setListMissingItem(responseData)
        }
    }

    const GetUserCurrent = async () => {
        const res = await getUserCurrentAPI()
        if(res) {
            GetAllMissingItemByUserId(res.id)
            setUser(res)
        }
    }
    
    useEffect(() => {
        GetUserCurrent()
    }, [])
    

    return (
        <div>
            <Topbar />
            <ProfileList dataList={listMissingItem} user={user} GetUserCurrent={GetUserCurrent}/>
        </div>
    )
}
