import fetch from 'node-fetch';  
import {SocksProxyAgent} from 'socks-proxy-agent';  
const proxy = 'socks5h://127.0.0.1:10808';  
const agent = new SocksProxyAgent(proxy);  
let content = 'bgb'
fetch('https://api.bitget.com/api/v2/spot/market/tickers?symbol=bgbUSDT', {  
  agent,  
  timeout: 5000  
})  
.then(response => response.json())  
.then(data => console.log(data))  
.catch(error => console.error('请求失败:', error));

const msggg = getBitgetReply('bgb');
console.log(msggg)

export async function getBitgetReply(content) {
  // 拼接字符串"USDT"  
  content = content.toUpperCase()+ "USDT"; 
  console.log('🚀🚀🚀 / content', content)
  try {  
    const response = await  fetch('https://api.bitget.com/api/v2/spot/market/tickers?symbol='+content, {  
      agent,  
      timeout: 5000  
    })
    const data = await response.json();
    console.log(data)

      // 检查data属性是否非空  
    if (!data || !data.data || data.data.length === 0) {  
      return `未查到币种: ${content}`; 
    }   
    // 假设我们只对第一个元素感兴趣  
    const tickerData = data.data[0];  
  
    // 提取symbol和lastPr  
    const { symbol: tickerSymbol, lastPr: tickerLastPr } = tickerData;  
    console.log(`Symbol: ${tickerSymbol}, Last Price: ${tickerLastPr}`)

    // 构造并返回所需信息  
    return `Symbol: ${tickerSymbol}, Last Price: ${tickerLastPr}`;  
  } catch (error) {  
    console.error('请求失败:', error); // 处理请求错误  
    return `查寻币种: ${content}失败`;  
  }  
}