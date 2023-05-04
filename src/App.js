import React from "react";
import { Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import * as fetches from './redux/slices/user.js'
import {  Signin, Signup, Profile, Employees, Chat, OrderPage, Departments, AddEmployee, Projects, AddProject, Calendar, Main} from './pages/index.js'

import { Header, CreateOrder, ChatFull } from "./components/index.js";

function App() {

  const dispatch = useDispatch()

  React.useEffect( ()  => {
     dispatch(fetches.fetchAuthMe())
  }, [dispatch])

  const { data } = useSelector(state => state.user)

  return (
  <Routes>
    <Route path="/" element={<><Header/><Main/>
    </>  } />
    <Route path="/signup" element={<><Header/><Signup/></>  } />
    <Route path="/signin" element={<><Header/><Signin/></>  } />
    <Route path="/profile" element={<><Header/><Profile/></>  } />
    <Route path="/employees" element={<><Header/><Employees/></>  } />
    <Route path="/departments" element={<><Header/><Departments/></>  } />
    <Route path="/projects" element={<><Header/><Projects/></>  } />
    <Route path="/calendar" element={<><Header/><Calendar/></>  } />
    <Route path="/projects/add" element={<><Header/><AddProject/></>  } />
    <Route path="/departments/:id" element={<><Header/><AddEmployee/></>  } />
    <Route path="/chat-page" element={<><Header/><Chat/></>  } />
    <Route path="/my-orders" element={<><Header/><OrderPage/></>  } />
    <Route path="/my-orders/create" element={<><Header/><CreateOrder/></>  } />
    <Route path="/chat-page/chat/:id" element={<><Header/><ChatFull/></>  } />
  </Routes>
  );
}

export default App;
