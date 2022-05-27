console.log('honda')
// const promise = new Promise((resolve,reject)=>{//promise takes in two parameteres ,resolve for when the operation is successful and reject for when there's an error
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
console.log('start')

function loginUser(email,password){
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
      console.log('now we have data')
    resolve({userEmail:email}) 
    },1500)
  })  
}

function getVideos(email){
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
    resolve(['video1','video2'])
    },2000)
  })  
}
function videoDetails(email){
  return new Promise((resolve,reject)=>{
      setTimeout(()=>{
    resolve('Naruto Shippuden')
    },1000)
  })  
}

async function displayuser(){
  try{
  const loggeduser = await loginUser('sasuke',678)
  const videos =await getVideos(loggeduser.userEmail)
  const detail = await videoDetails(videos[0])
  console.log(detail)
    }
  catch(err){
    console.log('wahala')
  }
}
displayuser()
 

console.log('end')

