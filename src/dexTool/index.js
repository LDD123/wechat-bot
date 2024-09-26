import { SocksProxyAgent } from 'socks-proxy-agent'
import fetch from 'node-fetch'
const proxy = 'socks5h://127.0.0.1:10808'
const agent = new SocksProxyAgent(proxy)

export async function getDexToolReply(content) {
  // 使用split()方法以空格为分隔符分割字符串
  const parts = content.split(' ')

  // 访问分割后的数组中的第二个元素（索引为1，因为索引从0开始）
  const afterSpace = parts[1]
  const arrMsg = []
  try {
    // const response = await fetch('https://api.bitget.com/api/v2/spot/market/tickers?symbol='+content, {
    //   agent,
    //   timeout: 5000
    // })

    const response = await fetch(`https://www.dextools.io/shared/search/pair?query=${afterSpace}&strict=true`, {
      headers: {
        accept: 'application/json',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'content-type': 'application/json',
        'if-none-match': 'W/"23df7-cXTk0QhISneNDNcIx4V4Kb3ePew"',
        priority: 'u=1, i',
        'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        cookie:
          '_ga=GA1.1.74752125.1714902236; _pk_id.1.b299=84c75e6acb807fbf.1714902246.; _ga_9DZQT74D25=GS1.1.1714902236.1.1.1714902547.0.0.0; _pk_ref.1.b299=%5B%22%22%2C%22%22%2C1727274536%2C%22https%3A%2F%2Fwww.biquandh.com%2F%22%5D; _pk_ses.1.b299=1; _pk_ref.5.b299=%5B%22%22%2C%22%22%2C1727274536%2C%22https%3A%2F%2Fwww.biquandh.com%2F%22%5D; _pk_id.5.b299=d0fb8e135ccc8538.1727274536.; _pk_ses.5.b299=1; cf_clearance=dSXbs4i9BK5OPLVX1iAnpaBjaevBAuunNc8JdgtILh8-1727276143-1.2.1.1-YQ0TKedUxCEHCToQTygpbRGztMRlK2fDDRfbMvNDZsh2g.apYEfd_wghNdHKoxOUa5n7RUQuhjaLEN103k8I2cQz1yX4Cs0vsgcexLvj7PnhfeQ7Ek09xOVSZakavxfVJUOkW5nftbFjHmOHMd1MXVLkTkiqrxpoV74Iii3dc3QwXE6dCWfcye5pkimgilhapT.p9qv_R5LeITeAKedRqGpw5Q0JpVDePjSx6oQZ1cAWpUbhBpb2FM4pVJ_QkMhRK2_A8Biz4uHVsQBuwDXKPzuhvEIqtCVuyH78SbZvH6q95VOgTq1dz3hiUNgGgh7mYm4.9L5lmV8ALqIRhw_9miIj7jJT3HE8ASoYblZdv8eCNoqgvnyBLVzZ0NArTYal; __cf_bm=8vQopB0KvEjmlhLNBRQ4XgxHGWpqz5ECo0RcgDqShJQ-1727278102-1.0.1.1-0m6PXHoHhUkGC7qxsB3US83EENFhuZdhffwmcsX1GUVRDQ2quMV0_k3L6lI1Yf4nS.utX9wtCWDPRPkemO82SQ',
        Referer: 'https://www.dextools.io/app/cn/bnb/pair-explorer/0x7faad36f656ebbbbe28386cd07486b1e2744518f?t=1727278636061',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: null,
      method: 'GET',
    })

    const data = await response.json()
    console.error('请求全量数据:', data) // 处理请求错误

    const { resutlts } = data
    console.error('请求数据:', resutlts) // 处理请求错误

    // 检查data属性是否非空
    if (resutlts.length === 0) {
      arrMsg[0] = `未查到dex信息: ${content}`
    } else {
      for (let i = 0, count = 0; i < resutlts.length && count < 5; i++) {
        arrMsg[i] = formatData(resutlts[i])
      }
    }
  } catch (error) {
    console.error('请求失败:', error) // 处理请求错误
    arrMsg[0] = `查询币种: ${content}失败`
  }
  return arrMsg
}

function formatData(data) {
  const {
    name,
    symbol,
    symbolRef,
    id: { token },
    price,
    metrics,
    periodStats,
    dextScore,
  } = data
  const initialReserveRef = metrics.initialReserveRef
  const liquidity = metrics.liquidity

  const fiveMinDiff = periodStats['5m'].price.usd.diff
  const oneHourDiff = periodStats['1h'].price.usd.diff
  const sixHourDiff = periodStats['6h'].price.usd.diff
  const twentyFourHourDiff = periodStats['24h'].price.usd.diff
  const twentyFourHourSwaps = periodStats['24h'].swaps.total
  const twentyFourHourLiquidity = periodStats['24h'].liquidity.usd.last
  const twentyFourHourVolume = periodStats['24h'].volume.total

  return `代币名称:${name},信息${symbol}-${symbolRef}  
代币地址:${token}  
当前价格:${price.toFixed(8)}  
底池数量:${initialReserveRef}(${liquidity.toFixed(2)}U)  
5分钟:${fiveMinDiff.toFixed(8)}  
1小时:${oneHourDiff.toFixed(8)}  
6小时:${sixHourDiff.toFixed(8)}  
24小时:${twentyFourHourDiff.toFixed(8)},交易人数：${twentyFourHourSwaps}  
流动性：${twentyFourHourLiquidity.toFixed(2)}  
24小时交易量:${twentyFourHourVolume.toFixed(2)}  
dext评分：${dextScore.total}`
}
