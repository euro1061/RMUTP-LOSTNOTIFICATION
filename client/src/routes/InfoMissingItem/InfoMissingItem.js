import React, { useEffect } from "react";
import Topbar from "../../components/Topbar";
import { motion } from "framer-motion";
import {
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Col,
  Collapse,
  Badge,
  Divider,
  Empty,
  Form,
  Image,
  Input,
  Row,
  Spin,
  notification,
  Modal,
} from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getUserCurrentAPI } from "../../util/Functions/userFunction";
import { useState } from "react";
import { getMissingItemByIdAPI, getStudentByNameOrStuIdAPI } from "./API/InfoMissingItem";
import { CheckOutlined, ClearOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import SearchStudent from "../addListMissingItem/Components/SearchStudent";
import Footer from "../../components/Footer";
const { Panel } = Collapse;
const { Search } = Input;

export default function InfoMissingItem() {
  const { itemId } = useParams();
  const propsFrom = useLocation();
  // const { fromPage } = state;

  const [formCreatedUser] = Form.useForm();
  const [formMissingItem] = Form.useForm();
  const [formDropInfo] = Form.useForm();
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState(1);


  const [userInfo, setUserInfo] = useState(null)

  const [userImg, setUserImg] = useState(null);
  const [userDropImg, setUserDropImg] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(false);
  const [dataMissingItem, setDataMissingItem] = useState(null);

  const [isModalUpdateStatusVisible, setIsModalUpdateStatusVisible] = useState(false);
  const [receivedImg, setReceivedImg] = useState(null);
  const [disabledDepositorForm, setDisabledDepositorForm] = useState(false)
  const [nameOrStuId, setNameOrStuId] = useState(null)
  const [userMissingItemDrop, setUserMissingItemDrop] = useState(null)
  const [loadingListSearchStudent, setLoadingListSearchStudent] = useState(false)
  const [listSearchStudent, setListSearchStudent] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getStudentByNameOrStuId = async (nameOrStuId) => {
    setLoadingListSearchStudent(true);
    const { isSuccess, responseData } = await getStudentByNameOrStuIdAPI({
      nameOrStuId: nameOrStuId,
    });
    if (isSuccess) {
      setListSearchStudent(responseData);
      setLoadingListSearchStudent(false);
    }
  };

  const handleCancelUpdate = async () => {
    await setIsModalUpdateStatusVisible(false);
    setTimeout(() => {
      // setIsModalVisible(false)
      getMissingItemById(itemId)
    }, 200);
  };

  const getUserCurrent = async () => {
    const data = await getUserCurrentAPI();
    setUserInfo(data);
    // console.log(data)
  };

  const getMissingItemById = async (id) => {
    setLoading(true)
    const data = await getMissingItemByIdAPI(id)
    if (data.isSuccess) {
      setDataMissingItem(data.responseData)
      formCreatedUser.setFieldsValue(data.responseData.User)

      if (data?.responseData?.userMissingItemDrop_id !== null) {
        formDropInfo.setFieldsValue(data.responseData.userMissingItemDrop)
        setUserDropImg(data.responseData.userMissingItemDrop?.urlPicture)
      } else {
        formDropInfo.setFieldsValue(data.responseData.UserMissingItemDrop[0])
      }

      setUserImg(data.responseData.User.urlPicture)
      setFetchSuccess(true)
    } else {
      setFetchSuccess(false)
    }
    setLoading(false)
  }

  const onFinishUpdateStatus = async () => {
    // handleCancelUpdate();
    const dataForm = form.getFieldValue()
    let request
    if (userMissingItemDrop !== null) {
      request = {
        firstName: dataForm.firstNameDrop,
        lastName: dataForm.lastNameDrop,
        phone: dataForm.phoneDrop,
        email: dataForm.emailDrop,
        lineId: dataForm.lineIdDrop,
        facebookUrl: dataForm.facebookUrlDrop,
        userMissingItemReceive: userMissingItemDrop,
        missingItem_id: dataMissingItem?.id,
      }
    } else {
      request = {
        firstName: dataForm.firstNameDrop,
        lastName: dataForm.lastNameDrop,
        phoneDrop: dataForm.phoneDrop,
        emailDrop: dataForm.emailDrop,
        lineIdDrop: dataForm.lineIdDrop,
        facebookUrlDrop: dataForm.facebookUrlDrop,
        userMissingItemReceive: null,
        missingItem_id: dataMissingItem?.id,
      }
    }

    const { data } = await axios.put(
      `${process.env.REACT_APP_DOMAINENDPOINT}/api/missing-item/updateStatus`,
      request
    )

    const { isSuccess } = data;
    if (isSuccess) {
      handleCancelUpdate();
      // handleCancel();
      // setIsModalVisible(false);
      setDisabledDepositorForm(false);
      // GetUserCurrent();
      setNameOrStuId(null);
      setReceivedImg(null);
      notification['success']({
        message: 'บันทึกสำเร็จ',
        description: "อัพเดทสถานะเรียบร้อยแล้ว"
      })
      form.resetFields()

    } else {
      notification['error']({
        message: 'Error',
        description: 'Update status failed',
      })
    }
  }

  /*eslint-disable */
  useEffect(() => {
    getUserCurrent();
    getMissingItemById(itemId)
  }, []);
  /*eslint-enable */

  const onFinishMissingItem = async () => {

  };

  return (
    <div>
      <Topbar />
      <div className="mx-auto w-10/12 mt-10 min-h-fit">
        <div className="flex flex-col xl:flex-row lg:flex-row justify-center xl:justify-between lg:justify-between gap-1 xl:gap-2 lg:gap-2 mb-1">
          <div className="flex flex-col xl:flex-row items-center lg:flex-row gap-1 xl:gap-2 lg:gap-2">
            <Button
              size="middle"
              icon={<i className="fa-solid fa-angle-left"></i>}
              onClick={() => {
                if (propsFrom?.state?.fromPage === "profileNotification") {
                  navigate("/profileNotification")
                } else {
                  navigate("/")
                }

              }
              }
            >
              &nbsp; ย้อนกลับ
            </Button>
            <Divider type="vertical" />
            <Breadcrumb>
              <Breadcrumb.Item>หน้าแรก</Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>รายการแจ้งพบเห็นของหาย</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span>{fetchSuccess ? dataMissingItem.title : "ไม่พบข้อมูล"}</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Badge.Ribbon
          text={dataMissingItem?.StatusMissingItem ? dataMissingItem.StatusMissingItem.statusTh : null}
          color={dataMissingItem?.StatusMissingItem.id === 1 ? 'red' : 'green'}
        >
          <section className="p-6 bg-white shadow-md rounded-lg  ">
            <div className="flex flex-col xl:flex-row lg:flex-row lg:justify-between xl:justify-between">
              <h1 className="text-3xl m-0 text-center mb-5 lg:mb-0 xl:mb-0">
                {fetchSuccess ? dataMissingItem.title : "ไม่พบข้อมูล"}
              </h1>
            </div>
            <Divider style={{margin: 15}} />
            <Modal
              width={900}
              visible={isModalUpdateStatusVisible}
              title="อัพเดทสถานะ"
              onCancel={() => setIsModalUpdateStatusVisible(false)}
              footer={[
                <Button onClick={() => setIsModalUpdateStatusVisible(false)}>ยกเลิก</Button>,
                <Button type="primary" onClick={() => {
                  form.submit()
                }}>บันทึก</Button>,
              ]}
            >
              <Row gutter={[8, 8]}>
                <Col xl={4}>
                  <div className='flex justify-center flex-col items-center'>
                    <Avatar
                      size={120}
                      src={receivedImg}
                      icon={
                        <i className="fa-solid fa-user-astronaut"></i>
                      }
                    />
                    <Divider />
                    <Button
                      onClick={() => {
                        form.setFieldsValue({
                          firstNameDrop: null,
                          lastNameDrop: null,
                          phoneDrop: null,
                          emailDrop: null,
                          lineIdDrop: null,
                          facebookUrlDrop: null,
                        });
                        setDisabledDepositorForm(false);
                        setReceivedImg(null);
                        setNameOrStuId(null);
                        setUserMissingItemDrop(null);
                      }}
                      icon={
                        <ClearOutlined
                          style={{ display: "inline-grid" }}
                        />
                      }
                    >
                      ล้างข้อมูล
                    </Button>
                  </div>
                </Col>
                <Col xl={1}>
                  <Divider type='vertical' style={{ height: "100%" }} />
                </Col>
                <Col xl={19}>
                  <Divider>
                    <span className='text-2xl font-bold text-purple-700'>ข้อมูลผู้ที่มารับของ</span>
                  </Divider>
                  <Row>
                    <Col xl={24}>
                      <Search
                        placeholder="ค้นหาด้วยชื่อหรือรหัสนักศึกษา"
                        enterButton="ค้นหา"
                        onChange={(e) => {
                          setNameOrStuId(e.target.value);
                        }}
                        value={nameOrStuId}
                        onSearch={(e) => {
                          if (
                            nameOrStuId === null ||
                            nameOrStuId === ""
                          ) {
                            notification["warning"]({
                              message: "ค้นหาไม่สำเร็จ",
                              description: "กรุณากรอกข้อมูลก่อนค้นหา",
                              placement: "topRight",
                            });
                          } else {
                            // console.log("nameOrStuId", e)
                            getStudentByNameOrStuId(e);
                            showModal();
                          }
                        }}
                      />
                    </Col>
                    <Col xl={24}>
                      <Divider />
                    </Col>
                    <Form form={form} onFinish={() => onFinishUpdateStatus()}>
                      <Row gutter={[0, 6]}>
                        <Col xl={24}>
                          <Row gutter={[6, 6]}>
                            <Col xl={8}>
                              <Form.Item
                                style={{ marginBottom: 5 }}
                                name="firstNameDrop"
                                rules={[
                                  {
                                    required: true,
                                    message: "กรุณากรอกชื่อ"
                                  }
                                ]}
                                labelCol={{ span: 24, style: { padding: 0 } }}
                                wrapperCol={{ span: 24 }}
                                label={<label className=' font-semibold text-purple-500'>ชื่อ</label>}
                              >
                                <Input
                                  placeholder="ชื่อ"
                                  disabled={disabledDepositorForm}
                                />
                              </Form.Item>
                            </Col>
                            <Col xl={8}>
                              <Form.Item
                                style={{ marginBottom: 5 }}
                                name="lastNameDrop"
                                labelCol={{ span: 24, style: { padding: 0 } }}
                                wrapperCol={{ span: 24 }}
                                label={<label className=' font-semibold text-purple-500'>นามสกุล</label>}
                              >
                                <Input
                                  placeholder="นามสกุล"
                                  disabled={disabledDepositorForm}
                                />
                              </Form.Item>
                            </Col>
                            <Col xl={8}>
                              <Form.Item
                                style={{ marginBottom: 5 }}
                                name="phoneDrop"
                                labelCol={{ span: 24, style: { padding: 0 } }}
                                wrapperCol={{ span: 24 }}
                                label={<label className=' font-semibold text-purple-500'>เบอร์โทร</label>}
                              >
                                <Input
                                  // prefix={
                                  //   <i className="fa-solid fa-phone text-green-500"></i>
                                  // }
                                  placeholder="เบอร์โทร"
                                  disabled={disabledDepositorForm}
                                />
                              </Form.Item>
                            </Col>
                            <Col xl={8}>
                              <Form.Item
                                labelCol={{ span: 24, style: { padding: 0 } }}
                                wrapperCol={{ span: 24 }}
                                label={<label className=' font-semibold text-purple-500'>Email</label>}
                                name="emailDrop"
                              >
                                <Input
                                  placeholder="Email"
                                  disabled={disabledDepositorForm}
                                />
                              </Form.Item>
                            </Col>
                            <Col xl={8}>
                              <Form.Item
                                name="lineIdDrop"
                                labelCol={{ span: 24, style: { padding: 0 } }}
                                wrapperCol={{ span: 24 }}
                                label={<label className=' font-semibold text-purple-500'>Line</label>}
                              >
                                <Input
                                  // prefix={
                                  //   <i className="fa-brands fa-line text-green-400"></i>
                                  // }
                                  placeholder="Line (ใส่หรือไม่ก็ได้)"
                                  disabled={disabledDepositorForm}
                                />
                              </Form.Item>
                            </Col>
                            <Col xl={8}>
                              <Form.Item
                                name="facebookUrlDrop"
                                labelCol={{ span: 24, style: { padding: 0 } }}
                                wrapperCol={{ span: 24 }}
                                label={<label className=' font-semibold text-purple-500'>Facebook</label>}
                              >
                                <Input
                                  // prefix={
                                  //   <i className="fa-brands fa-facebook text-blue-400"></i>
                                  // }
                                  placeholder="Facebook (ใส่หรือไม่ก็ได้)"
                                  disabled={disabledDepositorForm}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
                  </Row>
                </Col>
              </Row>
            </Modal>
            <SearchStudent
              form={form}
              setNameOrStuId={setNameOrStuId}
              nameOrStuId={nameOrStuId}
              setIsModalOpen={setIsModalOpen}
              isModalOpen={isModalOpen}
              setDepositorImg={setReceivedImg}
              setUserMissingItemDrop={setUserMissingItemDrop}
              setDisabledDepositorForm={setDisabledDepositorForm}
              listSearchStudent={listSearchStudent}
              setListSearchStudent={setListSearchStudent}
              loadingListSearchStudent={loadingListSearchStudent}
              setLoadingListSearchStudent={setLoadingListSearchStudent}
            />
            <Spin spinning={loading} tip="กำลังโหลด" size="large">
              {fetchSuccess ?
                <Form
                  form={formMissingItem}
                  onFinish={(e) => onFinishMissingItem(e)}
                >
                  <Row gutter={[8, 8]} align="top">
                    <Col xl={24}>
                      {userInfo?.id === dataMissingItem?.user_id || userInfo?.Role.id === 1 ?
                        <motion.div
                          initial={{ opacity: 0, y: 0 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, delay: 0 }}
                        >
                          <div className="flex justify-around mb-5 gap-2">

                            {dataMissingItem?.StatusMissingItem?.id === 1 ?
                              <>
                                <button
                                  onClick={() => {
                                    navigate(`/infomissingitem/${dataMissingItem?.id}/edit`, { state: {fromPage : "infomissingitem"}});
                                  }}
                                  type="button" className="w-full bg-orange-500 text-white rounded-lg p-3 text-xl hover:bg-orange-600 transition duration-300">
                                  <EditOutlined style={{ display: "inline-grid" }} />
                                  &nbsp;
                                  แก้ไขข้อมูล
                                </button>
                                <button
                                  onClick={() => setIsModalUpdateStatusVisible(true)}
                                  type="button" className="w-full bg-green-500 text-white rounded-lg p-3 text-xl hover:bg-green-600 transition duration-300">
                                  <CheckOutlined style={{ display: "inline-grid" }} />
                                  &nbsp;
                                  อัพเดทสถานะ
                                </button>
                              </>
                              :
                              <>
                                <button
                                  disabled
                                  onClick={() => setIsModalUpdateStatusVisible(true)}
                                  type="button" className="w-full bg-gray-500 cursor-not-allowed text-white disabled:opacity-50 rounded-lg p-3 text-xl">
                                  <EditOutlined style={{ display: "inline-grid" }} />
                                  &nbsp;
                                  แก้ไขข้อมูล
                                </button>
                                <button
                                  disabled
                                  onClick={() => setIsModalUpdateStatusVisible(true)}
                                  type="button" className="w-full bg-gray-500 cursor-not-allowed text-white disabled:opacity-50 rounded-lg p-3 text-xl">
                                  <CheckOutlined style={{ display: "inline-grid" }} />
                                  &nbsp;
                                  อัพเดทสถานะ
                                </button>
                              </>}
                            <button type="button" className="w-full bg-red-500 text-white rounded-lg p-3 text-xl hover:bg-red-600 transition duration-300">
                              <DeleteOutlined style={{ display: "inline-grid" }} />
                              &nbsp;
                              ลบประกาศ
                            </button>
                          </div>
                        </motion.div>

                        : null}

                      <Collapse activeKey={[activeKey]} bordered={true}>
                        <Panel
                          showArrow={false}
                          header={
                            <label className="text-purple-800">
                              ข้อมูลผู้ประกาศ
                            </label>
                          }
                          key="1"
                        >
                          <Spin
                            spinning={loading}
                            tip={"กำลังบันทึกข้อมูล"}
                            size="large"
                          >
                            <Form
                              form={formCreatedUser}
                            >
                              <Row gutter={[0, 6]}>
                                <Col xl={2}>
                                  <Form.Item name="file">
                                    {userImg ? (
                                      <Avatar
                                        size={80}
                                        src={userImg}
                                        icon={
                                          <i className="fa-solid fa-user-astronaut"></i>
                                        }
                                      />
                                    ) : (
                                      <Avatar
                                        size={80}
                                        icon={
                                          <i className="fa-solid fa-user-astronaut"></i>
                                        }
                                      />
                                    )}
                                  </Form.Item>
                                </Col>
                                <Col xl={22}>
                                  <Row gutter={[6, 6]}>
                                    <Col xl={8}>
                                      <Form.Item
                                        style={{ marginBottom: 5 }}
                                        name="firstName"
                                        rules={[
                                          {
                                            required: true,
                                            message: "กรุณากรอกชื่อ",
                                          },
                                        ]}
                                      >
                                        <Input
                                          placeholder="ชื่อ"
                                          disabled={true}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xl={8}>
                                      <Form.Item
                                        style={{ marginBottom: 5 }}
                                        name="lastName"
                                        rules={[
                                          {
                                            required: true,
                                            message: "กรุณากรอกนามสกุล",
                                          },
                                        ]}
                                      >
                                        <Input
                                          placeholder="นามสกุล"
                                          disabled={true}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xl={8}>
                                      <Form.Item
                                        style={{ marginBottom: 5 }}
                                        name="phone"
                                        rules={[
                                          {
                                            required: true,
                                            message: "กรุณากรอกเบอร์โทร",
                                          },
                                        ]}
                                      >
                                        <Input
                                          prefix={
                                            <i className="fa-solid fa-phone text-green-500"></i>
                                          }
                                          placeholder="เบอร์โทร"
                                          disabled={true}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xl={8}>
                                      <Form.Item name="email">
                                        <Input
                                          placeholder="Email"
                                          disabled={true}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xl={8}>
                                      <Form.Item name="lineId">
                                        <Input
                                          prefix={
                                            <i className="fa-brands fa-line text-green-400"></i>
                                          }
                                          placeholder="Line (ใส่หรือไม่ก็ได้)"
                                          disabled={true}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xl={8}>
                                      <Form.Item name="facebookUrl">
                                        <Input
                                          prefix={
                                            <i className="fa-brands fa-facebook text-blue-400"></i>
                                          }
                                          placeholder="Facebook (ใส่หรือไม่ก็ได้)"
                                          disabled={true}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Form>
                          </Spin>
                        </Panel>
                      </Collapse>
                    </Col>
                    <Col xl={24}>
                      <Card>
                        <Row gutter={[8, 8]}>
                          <Col xl={24} style={{ marginTop: 10 }}>
                            <Row gutter={[8, 8]}>
                              <Col xl={12}>
                                <Form.Item
                                  name="title"
                                  label={
                                    <label className="text-purple-600 font-bold">
                                      ชื่อประกาศ
                                    </label>
                                  }
                                  labelCol={{ span: 24 }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "กรุณากรอกชื่อประกาศ",
                                    },
                                  ]}
                                >
                                  <Card
                                    bodyStyle={{ padding: 10 }}
                                  >
                                    <h3 className="mb-0">{dataMissingItem.title}</h3>
                                  </Card>
                                </Form.Item>
                              </Col>
                              <Col xl={12}>
                                <Form.Item
                                  name="campus_id"
                                  style={{ marginBottom: 5 }}
                                  label={
                                    <label className="text-purple-600 font-bold">
                                      สถานที่พบ
                                    </label>
                                  }
                                  labelCol={{ span: 24 }}
                                  rules={[
                                    {
                                      required: true,
                                      message: "กรุณาเลือกวิทยาเขตที่พบ",
                                    },
                                  ]}
                                >
                                  <Card
                                    bodyStyle={{ padding: 10 }}
                                  >
                                    <h3 className="mb-0">
                                      {dataMissingItem?.Campus?.campusTh} {dataMissingItem?.Building?.buildingTh ?
                                        dataMissingItem?.Building?.buildingTh : dataMissingItem?.buildingOther} {" "}
                                      {dataMissingItem?.Room?.roomTh ? dataMissingItem?.Room?.roomTh : dataMissingItem?.roomOther}
                                    </h3>
                                  </Card>
                                </Form.Item>
                              </Col>
                              <Col xl={24}>
                                <Form.Item
                                  label={
                                    <label className="text-purple-600 font-bold">
                                      รายละเอียด
                                    </label>
                                  }
                                  labelCol={{ span: 24 }}
                                  name="description"
                                >
                                  <Card
                                    bodyStyle={{ padding: 10 }}
                                  >
                                    <h3 className="mb-0">{dataMissingItem.description}</h3>
                                  </Card>
                                </Form.Item>
                              </Col>
                              <Col xl={24}>
                                <Form.Item
                                  name="file"
                                  rules={[
                                    {
                                      required: true,
                                      message: "กรุณาเลือกรูปภาพ",
                                    },
                                  ]}
                                  labelCol={{ span: 24 }}
                                  label={
                                    <label className="text-purple-600 font-bold">
                                      รูปภาพ
                                    </label>
                                  }
                                >
                                  <Card
                                    bodyStyle={{ padding: 10 }}
                                  >
                                    {dataMissingItem?.imageItem ?
                                      <Image
                                        width={400}
                                        src={dataMissingItem?.imageItem}
                                      />
                                      :
                                      <Image
                                        width={400}
                                        src="https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg"
                                      />
                                    }

                                  </Card>
                                </Form.Item>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                    <Col xl={24}>
                      <Collapse
                        activeKey={1}
                      >
                        <Panel
                          key="1"
                          showArrow={false}
                          header={
                            <label className="text-purple-800">
                              ข้อมูลผู้ฝาก (Optional)
                            </label>
                          }
                        >
                          {/* <Button type="primary" onClick={() => {
                                            console.log("asdasd")
                                            showModal()
                                        }} icon={<SearchOutlined style={{ display: "inline-grid" }} />}>ค้นหาข้อมูลนักศึกษา</Button> */}


                          <div className="mb-4"></div>
                          <Row gutter={[0, 6]}>
                            <Col xl={2}>
                              {userDropImg ? (
                                <Avatar
                                  size={80}
                                  src={userDropImg}
                                  icon={
                                    <i className="fa-solid fa-user-astronaut"></i>
                                  }
                                />
                              ) : (
                                <Avatar
                                  size={80}
                                  icon={
                                    <i className="fa-solid fa-user-astronaut"></i>
                                  }
                                />
                              )}
                            </Col>
                            <Col xl={22}>
                              <Form
                                form={formDropInfo}
                              >
                                <Row gutter={[6, 6]}>
                                  <Col xl={8}>
                                    <Form.Item
                                      style={{ marginBottom: 5 }}
                                      name="firstName"
                                    >
                                      <Input
                                        placeholder="ชื่อ"
                                        disabled={true}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xl={8}>
                                    <Form.Item
                                      style={{ marginBottom: 5 }}
                                      name="lastName"
                                    >
                                      <Input
                                        placeholder="นามสกุล"
                                        disabled={true}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xl={8}>
                                    <Form.Item
                                      style={{ marginBottom: 5 }}
                                      name="phone"
                                    >
                                      <Input
                                        // prefix={
                                        //   <i className="fa-solid fa-phone text-green-500"></i>
                                        // }
                                        placeholder="เบอร์โทร"
                                        disabled={true}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xl={8}>
                                    <Form.Item name="email">
                                      <Input
                                        placeholder="Email"
                                        disabled={true}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xl={8}>
                                    <Form.Item name="lineId">
                                      <Input
                                        // prefix={
                                        //   <i className="fa-brands fa-line text-green-400"></i>
                                        // }
                                        placeholder="Line (ใส่หรือไม่ก็ได้)"
                                        disabled={true}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xl={8}>
                                    <Form.Item name="facebookUrl">
                                      <Input
                                        // prefix={
                                        //   <i className="fa-brands fa-facebook text-blue-400"></i>
                                        // }
                                        placeholder="Facebook (ใส่หรือไม่ก็ได้)"
                                        disabled={true}
                                      />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Form>
                            </Col>
                          </Row>
                        </Panel>
                      </Collapse>
                    </Col>


                  </Row>
                </Form>
                :
                <Empty
                  description="ขออภัย ไม่พบข้อมูล!"
                />}
            </Spin>
          </section>
        </Badge.Ribbon>

      </div>
      <Footer />
    </div>
  );
}
