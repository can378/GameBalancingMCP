const { callClaudeAPI } = require('./claudeAPI');

async function handleMessage(message) {
  console.log('클라우드 API 호출 중...');
  const claudeResponse = await callClaudeAPI(message);
  return { reply: `Claude로부터 받은 응답: ${claudeResponse}` };
}

module.exports = { handleMessage };
