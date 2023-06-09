import React, { useEffect, useState } from 'react'
import Routes2 from "./components/Routes2"
import { UidContext } from './components/AppContext'
import axios from 'axios'
import { useDispatch } from "react-redux"
import { getUser } from './actions/user.actions'

const App = () => {
  const [uid, setUid] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(456)
    console.log('cherche token')
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
        headers:{
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods': 'POST,GET,PATCH,PUT,DELETE'
        }
      })
        .then((res) => {
          setUid(res.data)
          console.log(uid)
        })
        .catch((err) => console.log("no token"))
    }
    fetchToken()

    if (uid) dispatch(getUser(uid))
  }, [uid, dispatch])

  return (
    <UidContext.Provider value={uid}>
      <Routes2 />
    </UidContext.Provider>

  );
}

export default App;  
