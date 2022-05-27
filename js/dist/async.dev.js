"use strict";

console.log('honda'); // const promise = new Promise((resolve,reject)=>{//promise takes in two parameteres ,resolve for when the operation is successful and reject for when there's an error
//   setTimeout(()=>{
//     console.log('got user')
//     // resolve({user:'lucid'})
//     reject(new Error('user does not exist'))
//   },1000)
// })
// promise.then(user=>{
//   console.log(user)
// }).catch(err=>{
// console.log(err.message)})
// const yt = new Promise(resolve=>{
//   setTimeout(()=>{
//     console.log('getting stuff from youtube')
//     resolve({video:[1,2,3,4]})
// },1000)
// })
// const fb = new Promise(resolve=>{
//   setTimeout(()=>{
//     console.log('getting stuff from fb')
//     resolve({user:'riele'})
// },5000)
// })
// Promise.all([yt,fb]).then(result =>{
//   console.log(result)
// })// promise.all is used for executing many aynchronous opraions at once
//synchronous code

console.log('start');

function loginUser(email, password) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('now we have data');
      resolve({
        userEmail: email
      });
    }, 1500);
  });
}

function getVideos(email) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(['video1', 'video2']);
    }, 2000);
  });
}

function videoDetails(email) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('Naruto Shippuden');
    }, 1000);
  });
}

function displayuser() {
  var loggeduser, videos, detail;
  return regeneratorRuntime.async(function displayuser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(loginUser('sasuke', 678));

        case 3:
          loggeduser = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(getVideos(loggeduser.userEmail));

        case 6:
          videos = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(videoDetails(videos[0]));

        case 9:
          detail = _context.sent;
          console.log(detail);
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.log('wahala');

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

displayuser();
console.log('end');