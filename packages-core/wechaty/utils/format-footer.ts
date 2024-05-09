export const formatFooter = (context?: { name: string; version: string }) =>
  context ? `${context.name} ${context.version}` : "正在初始化"
