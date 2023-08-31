import React from 'react'
import { useNavigate } from "react-router-dom";

const Welcome = () => {
	const navigate = useNavigate() // be able to navigate to home on login

  return (
    <div>
      <button onClick={(e) => navigate('/login')}>Login</button>
    </div>
  )
}

export default Welcome