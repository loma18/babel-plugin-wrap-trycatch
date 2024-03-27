# 一个自动添加用try catch包裹await的插件
# 开发调试
## 0、npm install
## 1、yarn test
# 提供给其他人用
npm publish发布,会预先执行npm run prepare
# 示例：
## 1、声明函数
编译前
```
async function fetchGet() {
  const res = await fetch('https://httpbin.org/get').then(res => res.json());
  return res;
}
```

编译后
```
async function fetchGet() {
  try {
    const res = await fetch('https://httpbin.org/get').then(res => res.json());
    return res;
  } catch (e) {
    console.log('error', e);
  }
}
```
## 2、箭头函数
编译前
```
const arrowFun = async () => {
  const res = await fetch('https://httpbin.org/post').then(res => res.json());
  return res;
}
```
编译后
```
const arrowFun = async () => {
  try {
    const res = await fetch('https://httpbin.org/post').then(res => res.json());
    return res;
  } catch (e) {
    console.log('error', e);
  }
};
```
## 3、没有包裹体的箭头函数
编译前
```
const arrowFunWithoutBody = async () => await fetch('https://httpbin.org/get/arrow');
```
编译后
```
const arrowFunWithoutBody = async () => {
  try {
    return await fetch('https://httpbin.org/get/arrow');
  } catch (e) {
    console.log('error', e);
  }
};
```
## 4、用if包裹await
编译前
```
const wrapWithIfFun = async () => {
  if ('True') {
    const res = await fetch('https://httpbin.org/get/arrow');
    return res;
  }
};
```
编译后
```
const wrapWithIfFun = async () => {
  try {
    if ('True') {
      const res = await fetch('https://httpbin.org/get/arrow');
      return res;
    }
  } catch (e) {
    console.log('error', e);
  }
};
```
## 5、已经被tryCatch包裹
编译前
```
const awaitWrapByTryCatchFun = async () => {
  try {
    const res = await fetch('https://httpbin.org/post').then(res => res.json());
    return res;
  } catch (err) {
    console.log('自定义捕捉错误');
  }
}
```
编译后
```
const awaitWrapByTryCatchFun = async () => {
  try {
    const res = await fetch('https://httpbin.org/post').then(res => res.json());
    return res;
  } catch (err) {
    console.log('自定义捕捉错误');
  }
};

```