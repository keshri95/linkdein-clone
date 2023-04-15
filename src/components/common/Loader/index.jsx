import { Space, Spin } from 'antd'
import React from 'react'
import "./index.scss"

export default function Loader() {
  return (
    <div className='loader'>
     <p>  Loading..Please wait...</p>
        <Space size="middle">
            <Spin size="large" />
        </Space>
    </div>
  )
}
