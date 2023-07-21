//async , await 
async function f(){ //이행된(성공한) 프로미스 반환
  // return 1  //↓아래와 똑같은 의미의 코드. 묵시적 promise 
  return Promise.resolve(1) //명시적 promise
}

f().then(alert) //1출력

async function f(){
  let promise = new Promise((resolve,reject) => {
    setTimeout(resolve('완료!'), 1000)
  })
  let result = await promise 
  //promise가 실행되면 await가 resolve되기를(비동기작업) 기다림. 완료후 resolve값이 result에 저장됨
  // await은 함수안에서는 기다리지만 함수바깥에 있는것은 실행해버림-프로미스 기다리는동안 엔진이 다른일을 해서 cpu리소스 낭비x
  console.log('await 다음줄')
}

// f().then(alert)
f()
console.log('프로미스 함수 다음 줄')


async function showAvatar(){
  let response = await fetch('./js/user.json')
  let user = response.json() //문자열을 json을 사용해 객체형태로 변환

  //깃허브 가서 사진 가져오기
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`)
  let githubUser = githubResponse.json()

  //아바타 사진 보여주기
  let img =document.createElement('img')
  img.src = githubUser.avatar_url
  document.body.append(img)

  //딜레이 함수 만들기 - 함수 내부에서는 3초동안 기다리는 딜레이 함수
  await new Promise((resolve,reject) => {
    setTimeout(resolve, 3000)
  })
  img.remove()
  return githubUser
}

showAvatar() //함수 호출

//async, await 은 사용시 try, catch로 에러를 잡아줘야함

async function f(){
  try{ //try안에서 에러발생시 catch 안으로 넘어감
    let response = await fetch('http://유효하지-않은-주소')
  }catch(err){
    alert(err)
  }
}

//f().catch(alert) (= catch(err){alert(err)} 와 똑같이 동작)
f()

//promise all : 두개서버로부터 데이터를 다 받을때까지 기다린 후 배열(results-s라서 배열) 에 담음
        //**배열로 주어진 비동기 작업중에 하나라도 에러가 나면(reject) 다른 비동기작업도 무시되고 전체 결과 reject
        //  → Promise.allSettled 로 해결 가능
async function fetchServersData(){
  let results = await Promise.all([
    fetch('./js/user.json'),
    fetch('./js/user.json'),
    fetch('./js/user.json'),
    fetch('./js/user.json'),
    fetch('./js/user.json'),
    fetch('./js/user.json')
  ])
  for(let response of results){
    const result = await response.json()
    alert(JSON.stringify(result))
  }
}

fetchServersData()

