import { SocksProxyAgent } from 'socks-proxy-agent'
import fetch from 'node-fetch'
const proxy = 'socks5h://127.0.0.1:10808'
const agent = new SocksProxyAgent(proxy)

  try {
    // const response = await fetch('https://api.bitget.com/api/v2/spot/market/tickers?symbol='+content, {
    //   agent,
    //   timeout: 5000
    // })

    const response = await fetch("https://www.dextools.io/shared/search/pair?query=box&strict=true", {
        "headers": {
          "accept": "application/json",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "content-type": "application/json",
          "if-none-match": "W/\"23df7-cXTk0QhISneNDNcIx4V4Kb3ePew\"",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "cookie": "_ga=GA1.1.74752125.1714902236; _pk_id.1.b299=84c75e6acb807fbf.1714902246.; _ga_9DZQT74D25=GS1.1.1714902236.1.1.1714902547.0.0.0; _pk_ref.1.b299=%5B%22%22%2C%22%22%2C1727274536%2C%22https%3A%2F%2Fwww.biquandh.com%2F%22%5D; _pk_ses.1.b299=1; _pk_ref.5.b299=%5B%22%22%2C%22%22%2C1727274536%2C%22https%3A%2F%2Fwww.biquandh.com%2F%22%5D; _pk_id.5.b299=d0fb8e135ccc8538.1727274536.; _pk_ses.5.b299=1; cf_clearance=dSXbs4i9BK5OPLVX1iAnpaBjaevBAuunNc8JdgtILh8-1727276143-1.2.1.1-YQ0TKedUxCEHCToQTygpbRGztMRlK2fDDRfbMvNDZsh2g.apYEfd_wghNdHKoxOUa5n7RUQuhjaLEN103k8I2cQz1yX4Cs0vsgcexLvj7PnhfeQ7Ek09xOVSZakavxfVJUOkW5nftbFjHmOHMd1MXVLkTkiqrxpoV74Iii3dc3QwXE6dCWfcye5pkimgilhapT.p9qv_R5LeITeAKedRqGpw5Q0JpVDePjSx6oQZ1cAWpUbhBpb2FM4pVJ_QkMhRK2_A8Biz4uHVsQBuwDXKPzuhvEIqtCVuyH78SbZvH6q95VOgTq1dz3hiUNgGgh7mYm4.9L5lmV8ALqIRhw_9miIj7jJT3HE8ASoYblZdv8eCNoqgvnyBLVzZ0NArTYal; __cf_bm=8vQopB0KvEjmlhLNBRQ4XgxHGWpqz5ECo0RcgDqShJQ-1727278102-1.0.1.1-0m6PXHoHhUkGC7qxsB3US83EENFhuZdhffwmcsX1GUVRDQ2quMV0_k3L6lI1Yf4nS.utX9wtCWDPRPkemO82SQ",
          "Referer": "https://www.dextools.io/app/cn/bnb/pair-explorer/0x7faad36f656ebbbbe28386cd07486b1e2744518f?t=1727278636061",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });

    const data = await response.json()

    console.log(data)
  } catch (error) {
    console.error('请求失败:', error) // 处理请求错误
  }
