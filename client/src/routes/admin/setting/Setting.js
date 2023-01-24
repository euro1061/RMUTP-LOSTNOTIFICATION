import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Form, Image, Input, Row, Spin, Upload, notification } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useState } from 'react'
import { GetAllSetting } from './API/settingAPI';
import axios from 'axios';

export default function Setting() {
  const [form] = Form.useForm()

  const [settings, setSettings] = useState({})
  const [logoFile, setLogoFile] = useState([])
  const [backgroudFile, setBackgroundFile] = useState([])
  const [loading, setLoading] = useState(false)

  const getAllSetting = async () => {
    const data = await GetAllSetting();
    setSettings(data)
    form.setFieldsValue(data)
  }

  useEffect(() => {
    getAllSetting()
  }, [])

  const types = ["image/png", "image/jpeg", "image/jpg"];

  const onFormFinish = async () => {
    setLoading(true)
    const data = form.getFieldValue();
    if (typeof data.logo === "string") data.logo = null
    if (typeof data.background_Banner === "string") data.background_Banner = null

    if (typeof data.logo === "object" && data.logo?.fileList.length === 0) data.logo = null
    if (typeof data.background_Banner === "object" && data.background_Banner?.fileList.length === 0) data.background_Banner = null

    data.logo = data.logo?.file ? data.logo?.file : null
    data.background_Banner = data.background_Banner?.file ? data.background_Banner?.file : null

    const request = {
      ...data,
      background_Banner_old: settings?.background_Banner,
      logo_old: settings?.logo
    }

    const resSave = await axios.post(
      `${process.env.REACT_APP_DOMAINENDPOINT}/api/other-setting`,
      request,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (resSave.status === 201) {
      notification["success"]({
        message: "บันทึกข้อมูลสำเร็จ",
        description: "บันทึกข้อมูลสำเร็จ",
      });
      form.resetFields()
      setLogoFile([])
      setBackgroundFile([])
      await getAllSetting()
    }
    setLoading(false)
  }

  return (
    <Content>
      <Card
        title={<label className='text-xl font-bold text-primaryTheme'>ตั้งค่าทั่วไป</label>}
        extra={
          <Button
            type='primary'
            size='large'
            loading={loading}
            onClick={() => form.submit()}
            icon={<SaveOutlined style={{display: "inline-grid"}} />}
          >
            บันทึก
          </Button>
        }
      >
        <Form form={form} onFinish={onFormFinish}>
          <Spin spinning={loading} tip="กำลังบันทึกข้อมูล" size='large'>
            <Row gutter={[0, 0]}>
              <Col xl={24}>
                <Form.Item
                  name="headText_Banner"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label={<label className='text-primaryTheme'>ข้อความหลักในหน้าแรก</label>}
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input size='large' placeholder='ข้อความหลักในหน้าแรก' />
                </Form.Item>
              </Col>
              <Col xl={24}>
                <Form.Item
                  name="headDesc_Banner"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  label={<label className='text-primaryTheme'>คำอธิบายหลักในหน้าแรก</label>}
                  rules={[
                    {
                      required: true,
                    }
                  ]}
                >
                  <Input size='large' placeholder='คำอธิบายหลักในหน้าแรก' />
                </Form.Item>
              </Col>
              <Col xl={12}>
                <Form.Item
                  name="logo"
                  labelCol={{ span: 24 }}
                  label={
                    <label className="text-primaryTheme font-bold">
                      LOGO ของเว็บไซต์
                    </label>
                  }
                >
                  <Upload
                    multiple={false}
                    maxCount={1}
                    listType={"picture"}
                    fileList={logoFile}
                    accept=".png,.jpeg,.jpg,.gif"
                    beforeUpload={(file) => {
                      if (file) {
                        const isJpgOrPng =
                          file.type === "image/jpeg" ||
                          file.type === "image/png" ||
                          file.type === "image/jpg";
                        if (!isJpgOrPng) {
                          notification["error"]({
                            message: "อัพโหลดรูปภาพไม่สำเร็จ",
                            description:
                              "กรุณาเลือกไฟล์รูปภาพเท่านั้น",
                          });
                          setLogoFile([])
                          return true;
                        }
                      }
                      return false;
                    }}
                    onChange={(res) => {
                      let addFiles = true;
                      for (let i = 0; i < res.fileList.length; i++) {
                        if (!types.includes(res.fileList[i].type)) {
                          addFiles = false;
                        }
                      }
                      if (addFiles) {
                        setLogoFile(res.fileList);
                      }
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      อัพโหลดรูปภาพ
                    </Button>
                  </Upload>
                </Form.Item>
                <label className='text-primaryTheme font-semibold'>รูปปัจจุบัน</label>
                <Divider />
                <Image
                  width={500}
                  src={settings?.logo}
                />
              </Col>
              <Col xl={12}>
                <Form.Item
                  name="background_Banner"
                  labelCol={{ span: 24 }}
                  label={
                    <label className="text-primaryTheme font-bold">
                      พื้นหลังหน้าแรก
                    </label>
                  }
                >
                  <Upload
                    multiple={false}
                    maxCount={1}
                    listType={"picture"}
                    fileList={backgroudFile}
                    accept=".png,.jpeg,.jpg,.gif"
                    beforeUpload={(file) => {
                      if (file) {
                        const isJpgOrPng =
                          file.type === "image/jpeg" ||
                          file.type === "image/png" ||
                          file.type === "image/jpg";
                        if (!isJpgOrPng) {
                          notification["error"]({
                            message: "อัพโหลดรูปภาพไม่สำเร็จ",
                            description:
                              "กรุณาเลือกไฟล์รูปภาพเท่านั้น",
                          });
                          setBackgroundFile([])
                          return true;
                        }
                      }
                      return false;
                    }}
                    onChange={(res) => {
                      let addFiles = true;
                      for (let i = 0; i < res.fileList.length; i++) {
                        if (!types.includes(res.fileList[i].type)) {
                          addFiles = false;
                        }
                      }
                      if (addFiles) {
                        setBackgroundFile(res.fileList);
                      }
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      อัพโหลดรูปภาพ
                    </Button>
                  </Upload>
                </Form.Item>
                <label className='text-primaryTheme font-semibold'>รูปปัจจุบัน</label>
                <Divider />
                <Image
                  width={500}
                  src={settings?.background_Banner}
                />
              </Col>
            </Row>
          </Spin>
        </Form>
      </Card>
    </Content>
  )
}
