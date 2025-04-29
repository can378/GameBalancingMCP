const axios = require('axios');

async function callClaudeAPI(message) {
  try {
    const response = await axios.post('http://localhost:5000/claude-api', { data: message });
    return response.data.reply;
  } catch (error) {
    console.error('Claude API 호출 실패:', error);
    throw new Error('Claude API 호출 실패');
  }
}

module.exports = { callClaudeAPI };
