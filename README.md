1. set private key in .env
```
APP_PRIVATE_KEY="0x..."
```
2. deploy on vercel
3. call api to run the function in vercel runtime
```
curl -X POST https://<project-name>.vercel.app/api/debug
```
4. get following error in vercel logs
```
Unhandled Rejection: TypeError: t.mask is not a function
    at e.exports.mask (.next/server/app/api/debug/route.js:2:97989)
    at g.frame (.next/server/app/api/debug/route.js:2:116975)
    at g.dispatch (.next/server/app/api/debug/route.js:2:119779)
    at g.send (.next/server/app/api/debug/route.js:2:119323)
    at I.send (.next/server/app/api/debug/route.js:3:9218)
    at <unknown> (.next/server/app/api/debug/route.js:3:120087)
Node.js process exited with exit status: 128. The logs above can help with debugging the issue.
```
