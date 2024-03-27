const { declare } = require('@babel/helper-plugin-utils');

module.exports = declare((api) => {
    return {
        visitor: {
            AwaitExpression(path, state) {
                const funBody = path.getFunctionParent();
                const body = funBody.get('body');
                if (path.findParent((path) => path.isTryStatement())) {
                    return;
                }
                // 需要组装参数，否则tryCatch内会多出一个大括号
                // 如下，是捕捉不到错误的
                /**
                 *  try {
                 *      { // 多出这货
                 *          const res = await Promise.reject('失败');
                 *          return res;
                 *      } // 还有这货
                 * } catch (e) {
                 *  console.log('error', e)
                 * }
                 * 
                 */
                const bodyObj = {};
                const _body = body.get('body');
                let bodyArr = _body
                if (!(_body instanceof Array)) {
                    const tempAst = api.template.statement(`
                        return PREV_NODE;
                    `)({ PREV_NODE: body.node })
                    bodyArr = [{ node: tempAst }];
                }
                bodyArr.forEach((b, idx) => {
                    bodyObj[`PREV_BODY_${idx}`] = b?.node;
                })
                const ast = api.template.statement(`{
                    try {
                        ${Object.keys(bodyObj).join('; ')}
                    } catch (e) {
                        console.log('error',e);
                    }
                    }`)(bodyObj)
                body.replaceWith(ast);
            }
        }
    };
});