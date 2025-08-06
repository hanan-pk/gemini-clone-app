export function getGeminiReply(userMessage) {
  const replies = [
    `Interesting question about "${userMessage}". Let me explain.`,
    `Here's what I found regarding "${userMessage}".`,
    `Based on your input: "${userMessage}", here's something helpful.`,
    "Sure, here’s something helpful!",
    "Let me think... okay, here's a response.",
    "I found something useful for you.",
    "Here's my take on it.",
  ];

  const randomReply = replies[Math.floor(Math.random() * replies.length)];
  return `${randomReply}`;
}
