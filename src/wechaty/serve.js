import { getGptReply } from '../openai/index.js'
import { getKimiReply } from '../kimi/index.js'
import { getXunfeiReply } from '../xunfei/index.js'
import { getDeepSeekFreeReply } from '../deepseek-free/index.js'
import { get302AiReply } from '../302ai/index.js'
import { getDifyReply } from '../dify/index.js'
import { getBitgetReply } from '../bitget/index.js'
import { getOllamaReply } from '../ollama/index.js'

/**
 * 获取ai服务
 * @param serviceType 服务类型 'GPT' | 'Kimi'
 * @returns {Promise<void>}
 */
export function getServe(serviceType) {
  switch (serviceType) {
    case 'bitget':
      return getBitgetReply
    case 'ChatGPT':
      return getGptReply
    case 'Kimi':
      return getKimiReply
    case 'Xunfei':
      return getXunfeiReply
    case 'deepseek-free':
      return getDeepSeekFreeReply
    case '302AI':
      return get302AiReply
    case 'dify':
      return getDifyReply
    case 'ollama':
      return getOllamaReply
    default:
      return getGptReply
  }
}
