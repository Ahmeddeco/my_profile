
import { Mastra } from '@mastra/core/mastra'
import { weatherWorkflow } from './workflows/weather-workflow'
import { marketingAgent } from "@/bot/agents/marketing-agent"
import { developmentAgent } from "@/bot/agents/development-agent"
import { supervisorAgent } from "@/bot/agents/supervisor-agent"
import { storage } from "@/bot/storage"
import { chatRoute } from "@mastra/ai-sdk"
import { MastraEditor } from '@mastra/editor'



export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { marketingAgent, developmentAgent, supervisorAgent },
  storage,
   server: {
    apiRoutes: [
      chatRoute({
        path: '/chat/user',
        agent: 'supervisorAgent',
      }),
      chatRoute({
        path: '/chat/marketing',
        agent: 'marketingAgent',
      }),
      chatRoute({
        path: '/chat/development',
        agent: 'developmentAgent',
      }),
    ],
  },
  editor: new MastraEditor(),
})
