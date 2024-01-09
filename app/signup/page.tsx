"use client"
import { SignUp } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <div className='flex justify-center h-[90vh] items-center'>
        <SignUp/>
    </div>
  )
}

export default page