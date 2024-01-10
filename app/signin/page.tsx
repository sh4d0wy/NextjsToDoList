
import { SignIn } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <div className='flex justify-center h-[90vh] items-center'>
        <SignIn/>
    </div>
  )
}

export default page;