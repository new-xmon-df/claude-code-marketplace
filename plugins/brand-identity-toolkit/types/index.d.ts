export type Step = { id: string; status: 'done' | 'partial' | 'todo' | 'deferred'; title: string }

export type Snapshot = {
  current: Step | null
  openBefore: Step[]
  done: number
  total: number
  file: string
}

declare module 'claude-code' {
  interface PluginState {
    'brand-identity-toolkit': { snapshot: Snapshot | null }
  }
}
