import React from 'react'
import InfoProfile from './InfoProfile'
import Notification from './Notification'

function BlogRight() {
  return (
    <div className='max-w-xs bg-white overflow-hidden p-6'>
      <InfoProfile/>
      <hr className='my-12'/>
      <Notification />
    </div>
  )
}

export default BlogRight
