import React, { useCallback, useEffect, useState } from 'react'
import { Drawer, Button, Menu, Dropdown, Space, Avatar } from 'antd';
import { CheckOutlined, CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { authSelector, logout } from '../store/slices/authSlice'
import { setAllSetting } from '../store/slices/settingSlice';

export default function Topbar() {
    const [visible, setVisible] = useState(false)
    const [visibleTheme, setVisibleTheme] = useState(false)
    const [userInfo, setUserInfo] = useState(null)
    const dispatch = useDispatch()
    const authReducer = useSelector(authSelector)
    const settings = useSelector(state => state.setting)
    const navigate = useNavigate()
    const root = document.documentElement
    const { isLoggedIn, token } = authReducer
    const [reload, setReload] = useState(false)
    const themeColorDefault = JSON.parse(localStorage.getItem('themeColor'))
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

    const showDrawerTheme = () => {
        setVisibleTheme(true);
    };

    const onCloseTheme = () => {
        setVisibleTheme(false);
    };

    useEffect(() => {
        if (isLoggedIn) {
            getUserCurrent()
        }
    }, [isLoggedIn, getUserCurrent])

    useEffect(() => {
        dispatch(setAllSetting())
    }, [])

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
                        <Link rel="noopener noreferrer" to="/profile">ข้อมูลส่วนตัว</Link>
                    ),
                    icon: (<i className="fa-solid fa-user-gear text-black">&nbsp;</i>)
                }, {
                    key: '2',
                    label: (
                        <Link rel="noopener noreferrer" to="/profileNotification">รายการประกาศของฉัน</Link>
                    ),
                    icon: (<i className="fa-solid fa-list text-black">&nbsp;</i>)
                },
                {
                    key: '3',
                    danger: true,
                    label: (<button type='link' onClick={onLogoutHanlder}>ออกจากระบบ</button>),
                    icon: (<i className="fa-solid fa-arrow-right-from-bracket">&nbsp;</i>)
                },
            ]}
        />
    );

    const BoxColor = ({ primaryColor }) => {
        return (
            <div
                style={{
                    width: 60,
                    height: 60,
                    background: primaryColor,
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "5px",
                    borderRadius: "50%"
                }}
                onClick={() => {
                    root.style.setProperty('--primary-color', primaryColor)

                    localStorage.setItem("themeColor", JSON.stringify({
                        primaryColor: primaryColor
                    }))
                    setReload(!reload)
                    window.location.reload()
                }}
            >
                {themeColorDefault.primaryColor === primaryColor && <CheckOutlined style={{ color: "#fff", fontSize: 24 }} />}

            </div>
        )
    }
    // console.log(settings)
    return (
        <header className='bg-primaryTheme p-6'>
            <nav className='mx-auto w-12/12 lg:w-10/12 xl:w-10/12 flex justify-between items-center'>
                <div className='text-2xl font-bold text-white'>
                    <Link to={'/'}>
                        <img src={!settings.loading && settings.settings.logo} width={230} />
                    </Link>
                </div>
                <ul className='text-white gap-9 mb-0 text-base items-baseline hidden sm:hidden xl:flex lg:flex'>
                    <li><Link className='text-white ease-in-out duration-150' to="/"><i className="fa-solid fa-house"></i> หน้าแรก</Link></li>
                    {/* <li><Link className='hover:text-purple-900 text-white ease-in-out duration-150' to="/addlistmissingitem"><i className="fa-solid fa-bell"></i> แจ้งพบเห็นของหาย</Link></li>
                    <li><Link className='hover:text-purple-900 text-white ease-in-out duration-150' to="/addlistlostitem"><i className="fa-solid fa-bullhorn"></i> ประกาศตามหาของหาย</Link></li> */}
                    <li><Link className='text-white ease-in-out duration-150' to="/help"><i className="fa-solid fa-circle-question"></i> คำถามที่พบบ่อย</Link></li>
                    <li>
                        {
                            isLoggedIn
                                ?
                                // <button className='py-3 px-6 bg-red-700 text-white rounded-3xl hover:shadow-xl hover:bg-white hover:text-black ease-in-out duration-300'>ออกจากระบบ</button>
                                <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
                                    <span type='link'>
                                        <Space>
                                            <label className='text-white'>
                                                {userInfo?.urlPicture ? <Avatar src={userInfo?.urlPicture} /> : <Avatar size={25} icon={<i className="fa-solid fa-user-gear"></i>} />}

                                            </label>
                                            {userInfo?.firstName}
                                            <i className="fa-solid fa-caret-down text-white"></i>
                                        </Space>
                                    </span>
                                </Dropdown>
                                :
                                <Link to="/login" className='py-3 px-6 bg-white text-black rounded-3xl hover:bg-white ease-in-out duration-300 hover:text-primaryTheme'>เข้าสู่ระบบ</Link>
                        }

                    </li>
                    <li><button onClick={() => showDrawerTheme()} className='text-white ease-in-out duration-150' href="/#"><SettingOutlined /></button></li>
                </ul>

                <button onClick={() => showDrawer()} className='text-white text-2xl hover:text-purple-900 xl:hidden lg:hidden'><i className="fa-solid fa-bars"></i></button>
            </nav>
            <Drawer
                title={<label className='text-primaryTheme font-bold text-3xl'>การตั้งค่าต่าง ๆ</label>}
                placement={"right"}
                closable={false}
                onClose={onCloseTheme}
                visible={visibleTheme}
                key={"setting"}
                extra={<Button onClick={() => onCloseTheme()} type="text" style={{ color: "red" }} icon={<CloseCircleOutlined />} />}
            >
                <div className='flex flex-wrap w-full'>
                    <BoxColor primaryColor={'#5b21b6'} />
                    <BoxColor primaryColor={'#0A2647'} />
                    <BoxColor primaryColor={'#2B3A55'} />
                    <BoxColor primaryColor={'#222222'} />
                    <BoxColor primaryColor={'#FD8A8A'} />
                    <BoxColor primaryColor={'#CB1C8D'} />
                    <BoxColor primaryColor={'#DC0000'} />
                    <BoxColor primaryColor={'#FF7000'} />
                </div>
                {userInfo?.role_id === 1 &&
                    <>
                        <hr className='mt-5 mb-5' />
                        <Button
                            block
                            size='large'
                            onClick={() => {
                                navigate('/admin/dashboard')
                            }}
                        >
                            แอดมินเมนู
                        </Button>
                    </>
                }

            </Drawer>

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
                    <Link className='hover:bg-primaryTheme p-3 hover:text-white ease-in-out duration-150' to="/"><i className="fa-solid fa-house"></i> หน้าแรก</Link>
                    {/* <a className='hover:bg-purple-700 p-3 hover:text-white ease-in-out duration-150' href="/#"><i className="fa-solid fa-bell"></i> แจ้งพบเห็นของหาย</a>
                    <a className='hover:bg-purple-700 p-3 hover:text-white ease-in-out duration-150' href="/#"><i className="fa-solid fa-bullhorn"></i> ประกาศตามหาของหาย</a> */}
                    <Link className='hover:bg-primaryTheme p-3 hover:text-white ease-in-out duration-150' to="/help"><i className="fa-solid fa-circle-question"></i> คำถามที่พบบ่อย</Link>
                    {
                        isLoggedIn
                            ?
                            // <button className='py-3 px-6 bg-red-700 text-white rounded-3xl hover:shadow-xl hover:bg-white hover:text-black ease-in-out duration-300'>ออกจากระบบ</button>
                            <>
                                <Link to="/profileNotification" className='hover:bg-primaryTheme p-3 hover:text-white ease-in-out duration-150'>รายการประกาศของฉัน</Link>
                                <Link to="" onClick={() => onLogoutHanlder()} className='hover:bg-red-600 p-3 hover:text-white ease-in-out duration-150'>ออกจากระบบ</Link>
                            </>
                            :
                            <Link to="/login" className='hover:bg-primaryTheme p-3 hover:text-white ease-in-out duration-150'>เข้าสู่ระบบ</Link>

                    }
                </div>
            </Drawer>
        </header>
    )
}
