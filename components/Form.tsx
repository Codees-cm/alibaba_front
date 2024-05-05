"use client"
import React from 'react'
import { useFormState } from 'react-dom';
import { uploadFile } from '@/lib/actions';

const initialState = {message:null};

export default function Form() {
  const [state, formAction] = useFormState(uploadFile,initialState);

  return (
    <div> <form action={formAction} method="post">
    <input type="file" name="file" id="file" accept='images/*' />
    <input type="submit" value="Upload" />
  </form>
  {
  state.status && (
    <>
    {state?.message}
    </>
  )
  }</div>
  )
}
