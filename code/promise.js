/* promise基本用法 */
// const promise = new Promise(
//     function (resolve, reject) {  //这里的两个参数都是函数
//         /* 这里用来兑现承诺 */
//         resolve(100);  //承诺成功,参数是用给promise.then()的

//         reject(new Error('promise rejected!'))  //承诺失败
//     }
// )

// promise.then( // 注意：promise回调函数的参数也是函数
//     function (value) {
//         console.log(`this is resolved, the param is (${value})`)
//     },
//     function (error) {
//         console.log(`this is rejected, the param is (${error})`)
//     }
// )

// console.log('end')

// *****************************************************************************

/* promise使用案例 */
// promise封装ajxs

function ajax(url) {
    return new Promise(
        function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET',url)
            xhr.onload = function() {
                console.log('开始发送请求~')
                console.log(this)  //XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
                if(this.status === 200) {
                    resolve(this.response)
                }
                else {
                    reject('请求发送失败！状态不是200')
                }
            }
            xhr.send();
        }
    )
}

ajax('/api/users.json').then(
    function(res) {  // 状态为resolve时会自动执行
        console.log(res)
    },
    function(error) {  // 状态为reject时会自动执行,打印error
        console.log(error)
    }
)




