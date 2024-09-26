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
    const { results } = data
    // 检查data属性是否非空
    if (results.length === 0) {
      arrMsg[0] = `未查到dex信息: ${content}`
    } else {
      //根据token，对查询结果进行分类，单个token取池子最大的数据
      const desResultarr = generateResult(results)
      //最后遍历查询结果
      for (let i = 0, count = 0; i < desResultarr.length && count < 3; i++) {
        arrMsg[i] = formatData(desResultarr[i])
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
当前价格:${null == price ? 0 : price.toFixed(8)}  
底池数量:${null == liquidity ? 0 : formatNumberToHumanReadable(liquidity)}U  
5分钟:${null == fiveMinDiff ? 0 : convertToPercentage(fiveMinDiff)}  
1小时:${null == oneHourDiff ? 0 : convertToPercentage(oneHourDiff)}  
6小时:${null == sixHourDiff ? 0 : convertToPercentage(sixHourDiff)}  
24小时:${null == twentyFourHourDiff ? 0 : convertToPercentage(twentyFourHourDiff)},交易人数：${twentyFourHourSwaps}  
流动性：${null == twentyFourHourLiquidity ? 0 : formatNumberToHumanReadable(twentyFourHourLiquidity)}U  
24小时交易量:${null == twentyFourHourVolume ? 0 : formatNumberToHumanReadable(twentyFourHourVolume)}U  
dext评分：${dextScore.total}`
}

function generateResult(results) {
  // 使用Map来存储token及其对应的最大liquidity结果
  const tokenMap = new Map()

  // 遍历results数组
  results.forEach((item) => {
    const {
      id: { token },
      metrics,
    } = item
    const liquidity = metrics ? metrics.liquidity : 0 // 假设metrics和liquidity可能存在也可能不存在

    // 如果Map中已存在此token，则比较liquidity
    if (tokenMap.has(token)) {
      const currentMaxLiquidity = tokenMap.get(token).metrics.liquidity
      if (liquidity > currentMaxLiquidity) {
        // 如果当前liquidity更大，则更新Map中的项
        tokenMap.set(token, item)
      }
      // 如果liquidity不大于当前Map中的值，则不做任何操作
    } else {
      // 如果Map中不存在此token，则直接添加
      tokenMap.set(token, item)
    }
  })

  // 将Map中的值转换为数组返回
  return Array.from(tokenMap.values())
}

function formatNumberToHumanReadable(number) {
  // 处理小数点后的数字，保留两位小数
  const decimalPart = Math.round((number % 1) * 100) / 100
  let numberPart = Math.floor(number)

  let unit = ''
  if (numberPart >= 1000000000) {
    numberPart /= 1000000000
    unit = 'B' // Billion
  } else if (numberPart >= 1000000) {
    numberPart /= 1000000
    unit = 'M' // Million
  } else if (numberPart >= 1000) {
    numberPart /= 1000
    unit = 'K' // Thousand
  }

  // 处理小数点后为零的情况，避免显示多余的.00
  if (decimalPart === 0) {
    return `${numberPart.toFixed(0)}${unit}`
  } else {
    // 保留两位小数
    return `${numberPart.toFixed(2)}${unit}`
  }
}

function convertToPercentage(number) {
  // 将数字乘以100，并保留两位小数
  const percentage = (number * 100).toFixed(2)
  // 添加百分比符号
  return `${percentage}%`
}
