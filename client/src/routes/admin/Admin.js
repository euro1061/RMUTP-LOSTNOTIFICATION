import { BankOutlined, DashboardOutlined, FilePptOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Layout, Menu } from 'antd'
import React, { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import Topbar from '../../components/Topbar'

const { Sider } = Layout;

export default function Admin() {
    const location = useLocation()
    useEffect(() => {
        document.body.style.background = "#ececec"
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
        getItem((<Link to="/admin">ข้อมูลสถานที่</Link>), '3', <BankOutlined />),
        getItem((<Link to="/admin">พิมพ์รายงาน</Link>), '4', <FilePptOutlined />),
        getItem((<Link to="/admin">ตั้งค่าระบบ</Link>), '5', <SettingOutlined />),
        getItem((<Link to="/admin">ออกจากระบบ</Link>), '6', <LogoutOutlined />),
    ]

    const activePage = location.pathname === "/admin/dashboard" ? "1" 
    : location.pathname === "/admin/users" ? "2" 
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
