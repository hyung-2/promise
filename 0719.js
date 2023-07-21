
//콜백 기반 비동기 프로그래밍
//오류 우선 콜백 =>node.js , 프로미스 에서 비슷하게 사용

// 주어진 src 경로를 이용하여 script 태그를 동적으로 생성
// html 문서에 script 태그 마운트
// function loadScript(src, callback){  //loadScript의 실행이 끝났는지 확인하기위해 두번째 인자 추가(콜백함수)
//   let script = document.createElement('script')
//   script.src = src //자바스크립트 파일을 읽기 시작함. //src : 외부에서 들어온 파일 경로
//   //코드가 실행되자마자 로딩이 완료되지는 않아서 시간이 걸린다(비동기)

//   //onload 이벤트 : 파일로딩이 끝났을때 발생
//   script.onload = () => callback(null, script) //스크립트 로딩이 완료됐을때 실행할 이벤트핸들러 함수 - 끝난 시점에 콜백 실행
//   //null:에러떴을시, script:성공했을시
//   //onerror 이벤트 : 파일 로딩이 실패했을때 발생
//   script.onerror = () => callback(new Error(`${src}를 불러들이는 중에 에러가 발생했습니다`)) //Error : 에러를 생성하는 생성자 함수
//   document.head.append(script)
// }

// //중첩 콜백 - 동작이 많으면 좋지 않은 코드
// loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js',function(script){
//   // newFunction() //파일로딩이 끝난 시점
//   alert(`${script.src}가 로드되었습니다.`)
//   alert(_) //함수불러오기

//   loadScript('./js/script.js', function(script){
//     alert(`${script.src}가 두번째로 로드되었습니다.`)
//     newFunction() 
//   }) 
// })
// console.log('스크립트 함수 아래코드')
// // newFunction() //loadScript의 실행이 끝나지않아서 이 함수는 불러들일수 없다(에러뜸)

// loadScript('./js/script.js', function(error, script){
//   if(error){
//     //에러 처리
//     alert(`${error}발생 !`)
//   }else{
//     //스크립트 로딩에 성공한 경우 처리
//     alert(`${script.src} 로딩 성공`)
//   }
// })

// //멸망의 피라미드(콜백지옥)

// loadScript('1.js', function(error, script){
//   if (error) {
//     handleError(error)
//   }else{
//     loadScript('2.js', function(error, script){
//       if (error) {
//         handleError(error)
//       }else{
//         loadScript('3.js', function(error, script){
//           if (error) {
//             handleError(error)
//           }else{
//           }
//         })
//       }
//     })
//   }
// })



// //아래처럼하면 피라미드는 되지않지만 함수를 재활용하기는 힘들다 - 이를 해결하기위해 '프로미스'가 있음
// loadScript('1.js', step1)

// function step1(error, script){
//   if (error) {
//     handleError(error)
//   }else{
//     loadScript('2.js', step2)
//   }
// }

// function step2(error, script){
//   if (error) {
//     handleError(error)
//   }else{
//     loadScript('3.js',step3)
//   }
// }
// function step3(error, script){
//   if (error) {
//     handleError(error)
//   }else{
//   }
// }

//프로미스 
/* new Promise가 반환하는 promise 객체 (내부 프로퍼티)
   state — 처음엔 "pending"(보류)이었다 resolve가 호출되면 "fulfilled", 
                                       reject가 호출되면 "rejected"로 변합니다.
   result — 처음엔 undefined이었다 resolve(value)가 호출되면 value로, 
                                  reject(error)가 호출되면 error로 변합니다. */

//약속이 이행된 프로미스 (fullfilled promise)

//프로미스 안에 들어간 콜백 : executor(실행자,실행함수) - executor는 new Promise에 의해 바로 호출됨 ,resolve나 reject중 하나 반드시 호출, 변경된 상태는 변하지 않음(무시),resolve, reject는 인자를 하나or아무것도 받지않음

//resolve : 성공했을때 실행할 콜백함수, reject : 실패했을때 실행할 콜백함수
// let promise = new Promise(function(resolve, reject){ //promise는 (콜백)함수를 전달받음-콜백안에 콜백(resolve,reject)
//   //시간이 오래 걸리는 비동기 작업 구현
//   // setTimeout(() => reject(new Error('에러발생!')), 1000) //실패
//   // setTimeout(() => resolve("완료"), 1000) //성공

//   setTimeout(() => resolve("결과"), 2000) //finally에 쓰려고 만든 예제
// })

// // promise.then( //1초 후에 실행됨, 첫번째인수는 이행시 실행, 두번째인수는 거부시 실행
// //   result => alert(result), //resolve 일때 실행
// //   error => alert(error) //reject 일때 실행
// // )

// // promise.catch(alert) // promise.catch(error => alert(error)) 로 풀어쓸수있음, 에러만 발생한 경우에 사용

// promise.finally(() => alert('음반 발매 작업이 끝났슴다')) //resolve라는 "결과" 값은 통과
//        .then(result => alert(result))


// function loadScript(src, callback) {
//     let script = document.createElement('script');
//     script.src = src;

//     script.onload = () => callback(null, script);
//     script.onerror = () => callback(new Error(`${src}를 불러들이는 중에 에러가 발생했습니다`))

//     document.head.append(script);
//   })
// } 
//를 promise를 사용하여 아래처럼쓰면 의미가 똑같다

function loadScript(src) {
  return new Promise(function (resolve,reject){
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`${src}를 불러들이는 중에 에러가 발생했습니다`))

    document.head.append(script);
  })
}

// let promise = loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js')
// // promise 대기상태 : {state: 'pending', result: undefined}
// // promise 성공 : {state: 'fullfilled', result: script}
// promise.then(script => alert(`팬들한테 결과 전송 : ${script.src}`)) //팬들한테 결과 전송

//프로미스 체이닝
new Promise(function (resolve,reject){
  setTimeout(() => resolve(1), 1000) //비동기작업
}).then(function(result){
  alert(result) // 1출력
  return result * 2 //return 값은 다시 promise의 객체가 되어 체이닝이 가능하다
}).then(function(result){
  alert(result) // 2출력(return result * 2)
  return result * 2
}).then(function(result){
  alert(result) //4 출력(return (return result * 2) * 2)
})

const promise = new Promise(function (resolve,reject){
  setTimeout(() => resolve("음반 발매 완료~"), 5000)
})

promise.then(result => alert('첫번째 구독자', result))
promise.then(result => alert('두번째 구독자', result))
promise.then(result => alert('세번째 구독자', result))
promise.then(result => alert('네번째 구독자', result))
promise.then(result => alert('다섯번째 구독자', result))

// 비동기작업 연결 가능 ↓
new Promise(function (resolve,reject){
  setTimeout(() => resolve(1), 1000) //비동기작업
}).then(function(result){
  alert(result) 
  return new Promise((resolve, reject) => {
    setTimeout (() => resolve(result * 2), 3000)//비동기작업
  })
}).then(function(result){
  alert(result) 
  return result * 2
}).then(function(result){
  alert(result) 
})

function loadScript(src) {
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

    document.head.append(script);
  });
}

loadScript('./js/script.js') //파일을 읽어왔으니 promise 형태
.then(function(script){
  alert('첫번째 script 로드 완료')
  return loadScript('./js/script2.js')
})
.then(function(script){
  alert('두번째 script 로드 완료')
  return loadScript('./js/script3.js')
})
.then(function(script){
  alert('세번째 script 로드 완료')
  // 3개의 script 로딩 완료
  one()
  two()
  three()
})

// fetch('./js/user.json') //프로미스 반환. fetch(서버url주소)
// .then(response => response.json())
// .then(users => alert(JSON.stringify(users)))
// // ↑ 아래 코드를 화살표 함수로 깔끔하게 정리
// // .then(function(response){ //response:객체형태
// //   //응답에서 텍스트 파싱(해석) - 비동기 작업
// //   return response.json() //프로미스 반환 //서버에서 json 응답 -> 자바스크립트 객체로 변환
  
// // })
// // .then(function(user){
// //   alert(JSON.stringify(user))
// // })

fetch('./js/user.json')
.then(response => response.json())
.then(user => fetch(`https://api.github.com/users/${user.name}`)) //깃허브에 데이터 요청
.then(response => response.json()) //응답을 다시 객체형태로 변환(파싱)
.then(githubuUser => new Promise(function(resolve,reject) //promise로 묶어서 다음에 다시 then을 쓸수있도록 함
  {
    console.log(githubuUser) //디버깅용
    let img = document.createElement('img')
    img.src = githubuUser.avatar_url
    document.body.append(img)

    setTimeout(() => {
      img.remove()
      resolve(githubuUser)
    }, 3000)
  }
))
.then(githubuUser => alert(`${githubuUser.name}의 이미지 출력이 끝났습니다`))
// ↑ 위 코드를 function을 사용해 더 깔끔하게 정리할수 있다 ↓

function loadUser(url){ //사용자 정보 조회
  return fetch(url) //.then이 프로미스니까 return 써주기
         .then(response => response.json())
}

function loadGithubUser(name){ //깃허브 아바타 사진 조회
  return fetch(`https://api.github.com/users/${name}`)
  .then(response => response.json())
}

function showAvatar(githubuUser){
  return new Promise(function(resolve, reject){
    console.log(githubuUser) //디버깅용
    let img = document.createElement('img')
    img.src = githubuUser.avatar_url
    document.body.append(img)

    setTimeout(() => {
      img.remove()
      resolve(githubuUser)
    }, 3000)
  })
}

loadUser('./js/user.json')
.then(user => loadGithubUser(user.name))
.then(githubuUser => showAvatar(githubuUser))
.then(githubuUser => alert('작업이 끝났습니다.'))
