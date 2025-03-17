"use client"
import React from 'react'
import { useFormState } from 'react-dom';
import { uploadFile } from '@/lib/actions';

// Define the proper initial state
const initialState = { message: null };

export default function Form() {
  const [state, formAction] = useFormState(uploadFile, initialState);

  return (
      <div>
        <form action={formAction}>
          <input type="file" name="file" id="file" accept="image/*" />
          <input type="submit" value="Upload" />
        </form>
        {state.status && (
            <>
              {state.message}
              {state.fileName && (
                  <div>
                    <p>Uploaded file: {state.fileName}</p>
                  </div>
              )}
            </>
        )}
      </div>
  )
}