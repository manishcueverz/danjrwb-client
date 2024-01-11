/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Snackbar from "@material-ui/core/Snackbar";
import axios from 'axios';

const SignUp = () => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, password: password, phone_number: mobile })
      };
      fetch('http://192.168.29.9:3000/api/signup', requestOptions)
        .then(response => {
          console.log(response.status)
          if (response.status === 200) {
            response.json().then(data => {
              console.log(data)
              navigate('/signin')
            }
            )
          } else {
            console.log(response.json().then(data => {
              console.log(console.log(data.msg))
              setErrorMsg(data.msg)
              setOpen(true);
            }))
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  const axiosSubmit = async () => {
    const options = {
      method: 'POST',
      url: 'https://dan-jr-wb-server.onrender.com/api/signup',
      headers: {},
      data: { name: name, password: password, phone_number: mobile }
    }
    await axios.request(options)
      .then((response) => {
        console.log(response.data);
        navigate('/signin')
      })
      .catch((error) => {
        if (error.response) {
          console.error('Server Error:', error.response.status);
        } else if (error.request) {
          console.error('Network Error:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      });
  }

  return (
    <section class="w-full min-h-screen grid place-items-center">
      <Snackbar
        open={open}
        autoHideDuration={1000}
        message={errorMsg}
      />
      <div class="flex flex-col items-center justify-center  md:h-screen">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up new
            </h1>
            <form class="space-y-4 md:space-y-6" >
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                <input type="name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label for="mobile" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your mobile</label>
                <input type="mobile" name="mobile" id="mobile" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                onClick={() => axiosSubmit()}
                type="button" class="w-full text-black bg-slate-100 rounded-lg p-2 mt-5"
              >Sign up</button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                You have already in account? <a href="/signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp