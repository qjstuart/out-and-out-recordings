import type { StorybookConfig } from '@storybook/react-vite'
import type { UserConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(viteConfig: UserConfig) {
    const { default: tailwindcss } = await import('@tailwindcss/vite')
    viteConfig.plugins = viteConfig.plugins || []
    viteConfig.plugins.push(tailwindcss())
    return viteConfig
  },
}
export default config
