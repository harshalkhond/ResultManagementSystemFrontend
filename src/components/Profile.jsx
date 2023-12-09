import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../redux/counterrSlice'
export const Profile = (props) => {
  const data = useSelector((state) => state.value)
  console.log(data)
  const dispatch = useDispatch()
    // console.log(props.location.state)
  return (
   <></>
  )
}
