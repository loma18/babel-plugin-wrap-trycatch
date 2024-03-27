async function fetchGet() {
  const res = await fetch('https://httpbin.org/get').then(res => res.json());
  return res;
}

const arrowFun = async () => {
  const res = await fetch('https://httpbin.org/post').then(res => res.json());
  return res;
}

const arrowFunWithoutBody = async () => await fetch('https://httpbin.org/get/arrow');

const wrapWithIfFun = async () => {
  if ('True') {
    const res = await fetch('https://httpbin.org/get/arrow');
    return res;
  }
};

const awaitWrapByTryCatchFun = async () => {
  try {
    const res = await fetch('https://httpbin.org/post').then(res => res.json());
    return res;
  } catch (err) {
    console.log('自定义捕捉错误');
  }
}