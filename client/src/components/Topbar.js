import React, { useCallback, useEffect, useState } from 'react'
import { Drawer, Button, Menu, Dropdown, Space, Avatar } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { authSelector, logout } from '../store/slices/authSlice'

export default function Topbar() {
    const [visible, setVisible] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const dispatch = useDispatch()
    const authReducer = useSelector(authSelector)
    const navigate = useNavigate()

    const { isLoggedIn, token } = authReducer

    const getUserCurrent = useCallback(async () => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        const result = await axios.get(`${process.env.REACT_APP_DOMAINENDPOINT}/api/users/me`, config)
            .then(res => res)
            .catch(error => error.response)

        if (result.status === 200) {
            setUserInfo(result.data)
        }
    }, [token])

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    useEffect(() => {
        if (isLoggedIn) {
            getUserCurrent()
        }
    }, [isLoggedIn, getUserCurrent])

    const onLogoutHanlder = () => {
        dispatch(logout())
        navigate('/')
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Link rel="noopener noreferrer" to="/">ข้อมูลส่วนตัว</Link>
                    ),
                    icon: (<i className="fa-solid fa-user-gear text-black">&nbsp;</i>)
                },
                {
                    key: '2',
                    danger: true,
                    label: (<button type='link' onClick={onLogoutHanlder}>ออกจากระบบ</button>),
                    icon: (<i className="fa-solid fa-arrow-right-from-bracket">&nbsp;</i>)
                },
            ]}
        />
    );

    return (
        <header className='bg-primaryTheme p-6'>
            <nav className='mx-auto w-12/12 lg:w-10/12 xl:w-10/12 flex justify-between items-center'>
                <div className='text-2xl font-bold text-white'>
                    RMUTP LOGO
                </div>
                <ul className='text-white gap-9 mb-0 text-base items-baseline hidden sm:hidden xl:flex lg:flex'>
                    <li><Link className='text-white ease-in-out duration-150' to="/"><i className="fa-solid fa-house"></i> หน้าแรก</Link></li>
                    {/* <li><Link className='hover:text-purple-900 text-white ease-in-out duration-150' to="/addlistmissingitem"><i className="fa-solid fa-bell"></i> แจ้งพบเห็นของหาย</Link></li>
                    <li><Link className='hover:text-purple-900 text-white ease-in-out duration-150' to="/addlistlostitem"><i className="fa-solid fa-bullhorn"></i> ประกาศตามหาของหาย</Link></li> */}
                    <li><a className='text-white ease-in-out duration-150' href="/#"><i className="fa-solid fa-circle-question"></i> วิธีใช้งาน</a></li>
                    <li>
                        {
                            isLoggedIn
                                ?
                                // <button className='py-3 px-6 bg-red-700 text-white rounded-3xl hover:shadow-xl hover:bg-white hover:text-black ease-in-out duration-300'>ออกจากระบบ</button>
                                <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                                    <span type='link'>
                                        <Space>
                                            <label className='text-white'><Avatar size={25} icon={<i className="fa-solid fa-user-gear"></i>} /></label>
                                            {userInfo?.firstName}
                                            <i className="fa-solid fa-caret-down text-white"></i>
                                        </Space>
                                    </span>
                                </Dropdown>
                                :
                                <Link to="/login" className='py-3 px-6 bg-white text-black rounded-3xl hover:shadow-xl hover:bg-purple-500 hover:text-white ease-in-out duration-300'>เข้าสู่ระบบ</Link>
                        }

                    </li>
                </ul>

                <button onClick={() => showDrawer()} className='text-white text-2xl hover:text-purple-900 xl:hidden lg:hidden'><i className="fa-solid fa-bars"></i></button>
            </nav>
            <Drawer
                title={<label className='text-purple-700 font-bold text-3xl'>RMUTP LOGO</label>}
                placement={"right"}
                closable={false}
                onClose={onClose}
                visible={visible}
                key={"right"}
                extra={<Button onClick={() => onClose()} type="text" style={{ color: "red" }} icon={<CloseCircleOutlined />} />}
            >
                <div className='flex flex-col gap-5 text-lg'>
                    <Link className='hover:bg-purple-700 p-3 hover:text-white ease-in-out duration-150' to="/"><i className="fa-solid fa-house"></i> หน้าแรก</Link>
                    {/* <a className='hover:bg-purple-700 p-3 hover:text-white ease-in-out duration-150' href="/#"><i className="fa-solid fa-bell"></i> แจ้งพบเห็นของหาย</a>
                    <a className='hover:bg-purple-700 p-3 hover:text-white ease-in-out duration-150' href="/#"><i className="fa-solid fa-bullhorn"></i> ประกาศตามหาของหาย</a> */}
                    <a className='hover:bg-purple-700 p-3 hover:text-white ease-in-out duration-150' href="/#"><i className="fa-solid fa-circle-question"></i> วิธีใช้งาน</a>
                    <a className='hover:bg-purple-700 p-3 hover:text-white ease-in-out duration-150' href="/#"><i className="fa-solid fa-address-book"></i> ติดต่อเรา</a>
                    <Link className='hover:bg-purple-700 p-3 hover:text-white ease-in-out duration-150' to="/login"><i className="fa-solid fa-arrow-right-to-bracket"></i> เข้าสู่ระบบ</Link>
                </div>
            </Drawer>
        </header>
    )
}
