## 一、简答题

### 1. 请说出下列最终的执行结果，并解释为什么？

```js
var a = []

for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i)
  }
}

a[6]()
```

**执行结果** `100`

**原因**：var声明的变量会出现变量提升，呗定义在全局作用域；因此执行到`a[6]()`的时候i的值已经是10，而这个10其实是在全局作用域的，所以打印出来的i就是10.

------

### 2. 请说出下列最终的执行结果，并解释为什么？

```js
var temp = 123

if (true) {
  console.log(temp)
  let temp
}
```

**答案**

**执行结果** `Uncaught ReferenceError: Cannot access 'temp' before initialization`

**原因**：

let声明的变量会产生块级作用域，`console.log(temp)`首先是到所在块级作用域找，然后才往上级找；此时块级作用域是有temp的，因此不会往上层找，但是块级作用域还没来得及声明temp，所以报错。

（但是我这里存在一个问题，想问下老师。就是执行到console.log(temp)的时候应该还没有执行`let temp`的，他是怎么知道块级作用域内是有temp的呢？）

------

### 3. 结合 ES6 新语法，用最简单的方式找出数组中的最小值

```js
var arr = [12, 34, 32, 89, 4]
```

**答案**

```js
Math.min(...arr)
```



------

### 4. 请详细说明 var，let，const 三种声明变量的方式之间的具体差别？

**答案**

区别：

var会出现变量提升的问题，它的所有变量都是声明在全局作用域的；且var是可以重复声明的

而let和const声明的变量会产生块级作用域

const是声明常量，let声明变量，且const声明的时候必须有一个初始值

------

### 5. 请说出下列代码最终输出的结果，并解释为什么？

```js
var a = 10
var obj = {
  a: 20,
  fn() {
    setTimeout(() => {
      console.log(this.a)
    })
  },
}

obj.fn()
```

**答案** `20`

**原因**

箭头函数的this是到作用域链的上一层继承的，也就是fn();

而函数的this指向由谁调用它来决定，这里是obj调用fn，所以this指向obj，即箭头函数的this指向obj

------

### 6. 简述 `Symbol` 类型的用途？

**答案**

用途：

声明独一无二的值，所以可以用来作常量枚举

用在对象中symbol声明的属性不能被普通方式访问呢，可以用来隐藏属性

实现了Iterator接口，可以用for of循环遍历

------

### 7. 说说什么是浅拷贝，什么是深拷贝？

**答案**

浅拷贝只针对引用类型，拷贝的是引用地址；所以浅拷贝的一方数据发生改变，那么另一方也会随之改变

深拷贝是建立另一个一模一样的对象，它的第一层的内容是一模一样的，但是存放的地址却不一样。但是如果深拷贝的第一层中有引用类型的话，存放的也是地址，那么如果这个引用类型中的值发生改变，深拷贝的值也会随之改变的。

------

### 8. 谈谈你是如何理解 JS 异步编程的，Event Loop 是做什么的，什么是宏任务，什么是微任务？

**答案**

**异步编程**

js的执行环境是单线程的，一次只能完成一件任务。这样工作效率就会降低。

但是，浏览器是多线程的，我们的异步操作可以交给浏览器处理。因此出现了事件循环机制，来管理可以暂时放着，等一会儿再来执行的任务。从而避免阻塞。

event loop机制是这样的，在处理异步任务时，当执行栈为空的时候，会从任务队列取出任务压入执行栈。如果队列中还有任务，则继续重复。

宏任务和微任务的区别就是微任务优先级比宏任务高，优先执行微任务。

微任务有：promise、nextTick

宏任务有：同步代码、UI渲染、IO操作、setTimeout、setInterval

（问题，同步代码属于宏任务吗？微任务优先级一定比宏任务高吗？）

------

### 9. 将下列异步代码使用 Promsie 改进？

```js
setTimeout(function () {
  var a = 'hello'
  setTimeout(function () {
    var b = 'lagou'
    setTimeout(function () {
      var c = 'I 💕️ U'
      console.log(a + b + c)
    }, 10)
  }, 10)
}, 10)
```

**答案**

```js
function task(...args) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...args])
    }, 10)
  })
}

task('hello')
  .then(value => task(...value, 'lagou'))
  .then(value => task(...value, 'I 💕️ U'))
  .then(value => console.log(value.join(' ')))
```

------

### 10. 请简述 TypeScript 与 JavaScript 之间的关系？

**答案**

 TypeScript 是 JavaScript 的超集，TS 包括了 JS、类型系统 和 ES6+

 TS 可以通过编译转为 JS，且任何一种 JS 运行环境都支持

------

### 11. 请谈谈你所认为的 TypeScript 优缺点？

**答案**

- 优点

  体系健全，弥补了js中的部分漏洞，且属于渐进式，好上手，不会对项目造成破坏性的修改

- 缺点

  项目初期需要写很多类型声明，增加开发成本

  学习门槛高