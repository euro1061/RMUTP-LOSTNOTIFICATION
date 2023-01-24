import { BankOutlined, BellOutlined, DashboardOutlined, ExclamationCircleOutlined, FilePptOutlined, LogoutOutlined, NotificationOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Layout, Menu, Modal } from 'antd'
import React, { useCallback, useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar'
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, logout } from '../../store/slices/authSlice';
import axios from 'axios';

const { Sider } = Layout;

export default function Admin() {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const authReducer = useSelector(authSelector)
    const { token } = authReducer

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
            // setUserInfo(result.data)
            const { Role } = result.data
            if (Role.id !== 1) {
                navigate('/')
            }
        }
    }, [token])

    useEffect(() => {
        document.body.style.background = "#ececec"
        getUserCurrent()
    }, [])

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const menuAdmin = [
        getItem((<Link to="/admin/dashboard">Dashboard</Link>), '1', <DashboardOutlined />),
        getItem((<Link to="/admin/users">ข้อมูลผู่ใช้</Link>), '2', <UserOutlined />),
        getItem((<Link to="/admin/location">ข้อมูลสถานที่</Link>), '3', <BankOutlined />),
        getItem((<Link to="/admin/report">พิมพ์รายงาน</Link>), '4', <FilePptOutlined />),
        getItem((<Link to="/admin/listMissing">รายการแจ้งของหาย</Link>), '5', <BellOutlined />),
        getItem((<Link to="/admin/listLosing">รายการประกาศหาของ</Link>), '6', <NotificationOutlined />),
        getItem((<Link to="/admin/setting">ตั้งค่าทั่วไป</Link>), '7', <SettingOutlined />),
        getItem((
            <Button
                icon={<LogoutOutlined style={{display: "inline-grid"}} />}
                type='danger'
                onClick={() => {
                    Modal.confirm({
                        title: 'คุณต้องการออกจากระบบ?',
                        icon: <ExclamationCircleOutlined />,
                        content: 'คุณต้องการออกจากระบบใช่หรือไม่',
                        okText: 'ใช่',
                        cancelText: 'ไม่ใช่',
                        onOk() {
                            dispatch(logout())
                            navigate('/')
                        }
                    });
                }}
            >
                ออกจากระบบ
            </Button>)),
    ]

    const activePage = location.pathname === "/admin/dashboard" ? "1"
        : location.pathname === "/admin/users" ? "2"
            : location.pathname === "/admin/location" ? "3"
                : location.pathname === "/admin/report" ? "4"
                    : location.pathname === "/admin/listMissing" ? "5"
                        : location.pathname === "/admin/listLosing" ? "6"
                            : location.pathname === "/admin/setting" ? "7"
                                : ""

    return (
        <>
            <Topbar />

            <div className='mx-auto w-11/12 mt-10 min-h-fit'>
                <div className="site-card-border-less-wrapper">
                    <Card>
                        <Layout>
                            <Sider>
                                <Menu
                                    mode="inline"
                                    defaultSelectedKeys={[activePage]}
                                    style={{
                                        height: '100%',
                                        borderRight: 0,
                                    }}
                                    items={menuAdmin}
                                />
                            </Sider>
                            <Layout>
                                <Outlet />

                            </Layout>
                        </Layout>
                    </Card>
                </div>

            </div>
        </>
    )
}
