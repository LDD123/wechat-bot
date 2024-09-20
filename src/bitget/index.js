import { SocksProxyAgent } from 'socks-proxy-agent'
import fetch from 'node-fetch'
const proxy = 'socks5h://127.0.0.1:10808'
const agent = new SocksProxyAgent(proxy)

export async function getBitgetReply(content) {
  // 拼接字符串"USDT"
  content = content.toUpperCase() + 'USDT'
  console.log('🚀🚀🚀 / content', content)
  try {
    // const response = await fetch('https://api.bitget.com/api/v2/spot/market/tickers?symbol='+content, {
    //   agent,
    //   timeout: 5000
    // })
    const response = await fetch('https://api.bitget.com/api/v2/spot/market/tickers?symbol=' + content)
    const data = await response.json()

    // 检查data属性是否非空
    if (!data || !data.data || data.data.length === 0) {
      return `未查到币种: ${content}`
    }
    // 假设我们只对第一个元素感兴趣
    const tickerData = data.data[0]

    // 提取symbol和lastPr
    const { symbol: tickerSymbol, lastPr: tickerLastPr, open: tickeropen } = tickerData
    console.log(`${tickerSymbol}, Last Price: ${tickerLastPr}`)

    // 构造并返回所需信息
    return `${tickerSymbol}, Last Price: ${tickerLastPr}(${((tickerLastPr / tickeropen - 1) * 100).toFixed(4)}%)`
  } catch (error) {
    console.error('请求失败:', error) // 处理请求错误
    return `查寻币种: ${content}失败`
  }
}
