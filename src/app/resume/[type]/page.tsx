import Dual from '@/components/Resume/Dual'
import Single from '@/components/Resume/Single'
import Triple from '@/components/Resume/Triple'
import React from 'react'
type PageProps={
  params:{
      type:string
  }
}
const page:React.FC<PageProps> = ({params}) => {
  const {type} = params;
  return (
    <>
    {
      type=='Single'?
      <Single/>
      :
      type=='Dual'?
      <Dual/>
      :
      type=='Triple'?
      <Triple/>
      :
      <div>Page Not Found</div>
    }
    </>
  )
}

export default page