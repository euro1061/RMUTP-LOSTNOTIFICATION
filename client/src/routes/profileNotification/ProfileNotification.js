import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Topbar'
import { getUserCurrentAPI } from '../../util/Functions/userFunction'
import { getAllMissingItemByUserId, getLosingItemByUserId } from './API/ProfileNotificationAPI'
import ProfileList from './components/ProfileList'
import { useLocation } from 'react-router-dom'

// const testData = [
//     {
//         title: "หูฟัง Bluetooth สีขาวหนึ่งข้าง",
//         image: "test2.jpg",
//         type: "guest"
//     },
// ]

export default function ProfileNotification() {
    const [listMissingItem, setListMissingItem] = useState([])
    const [listLosingItem, setListLosingItem] = useState([])
    const [user, setUser] = useState({})
    const propsNavigate = useLocation();
    const GetAllMissingItemByUserId = async (id) => {
        const { isSuccess, responseData, countTotal } = await getAllMissingItemByUserId(id)
        if(isSuccess) {
            setListMissingItem(responseData)
        }
    }

    const GetAllLosingItemByUserId = async (id) => {
        const { isSuccess, responseData, countTotal } = await getLosingItemByUserId(id)
        if(isSuccess) {
            // console.log(responseData)
            setListLosingItem(responseData)
        }
    }

    const GetUserCurrent = async () => {
        const res = await getUserCurrentAPI()
        if(res) {
            GetAllMissingItemByUserId(res.id)
            GetAllLosingItemByUserId(res.id)
            setUser(res)
        }
    }
    
    useEffect(() => {
        GetUserCurrent()
    }, [])

    return (
        <div>
            <Topbar />
            <ProfileList dataList={listMissingItem} dataListLosing={listLosingItem} user={user} GetUserCurrent={GetUserCurrent} propsNavigate={propsNavigate.state}/>
            {/* <Footer /> */}
        </div>
    )
}
