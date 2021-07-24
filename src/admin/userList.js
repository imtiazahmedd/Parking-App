import React, {useState, useEffect} from 'react';
import { Layout, Menu,Table} from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import "./admin.css"

import { firebase } from "../firebaseConfig";

const { Sider, Content } = Layout;

const UserList = () => {
    const [userListing, setUserListing] = useState(null);
    const [data,setData] = useState([]);

    useEffect(() => {
        console.log("chala he")
        const dbRef = firebase.database().ref();
        dbRef.child("users").get().then((snapshot) => {
          if (snapshot.exists()) {
            setUserListing(snapshot.val())
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      },[]);

      const mappingTableData = () => {
          const data = [];
            for(let key in userListing){
              if(userListing[key].email !== "admin12@gmail.com"){
                data.push(userListing[key])
              }
            }
            setData(data)
      }

      useEffect(()=>{
        mappingTableData()
      },[userListing])
    
const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];
    return (
        <Table columns={columns} dataSource={data} />
    );
};

export default UserList