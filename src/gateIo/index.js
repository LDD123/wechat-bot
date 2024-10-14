import { SocksProxyAgent } from 'socks-proxy-agent'
import fetch from 'node-fetch'
import { getBitgetReply } from '../bitget/index.js'
const proxy = 'socks5h://127.0.0.1:10808'
const agent = new SocksProxyAgent(proxy)

export async function getGateIoReply(processMsg) {
  const content = processMsg.replace(' ', '')

  console.log('🚀🚀🚀 / content', content)
  try {
    // const response = await fetch('https://api.bitget.com/api/v2/spot/market/tickers?symbol='+content, {
    //   agent,
    //   timeout: 5000
    // })
    const response = await fetch(`https://api.gateio.ws/api/v4/spot/tickers?currency_pair=${content}_USDT&timezone=all`)
    const data = await response.json()
    if (Array.isArray(data)) {
      const gateObj = data[0]
      const { currency_pair, last, change_percentage } = gateObj
      // 构造并返回所需信息
      return `${currency_pair}, Last Price: $${last}(${change_percentage}%)`
    } else if (typeof data === 'object' && data !== null) {
      if (!data.hasOwnProperty('currency_pair')) {
        //调用bitget交易所查询币种
        const bitgetResponse = await getBitgetReply(content)
        return bitgetResponse
      } else {
        const { currency_pair, last, change_percentage } = data
        // 构造并返回所需信息
        return `${currency_pair}, Last Price: $${last}(${change_percentage}%)`
      }
    } else {
      //调用bitget交易所查询币种
      const bitgetResponse = await getBitgetReply(content)
      return bitgetResponse
    }
  } catch (error) {
    console.error('请求失败:', error) // 处理请求错误
    return `查寻币种: ${content}失败`
  }
}
