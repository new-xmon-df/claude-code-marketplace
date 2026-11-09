import { expect, test } from 'claude-code/testing'

const PROGRESS = [
  'Paso actual: 3.9',
  '- ✅ 1.1 Discovery',
  '- ⚠️ 2.1 Four axes with the owner',
  '- ⏸ 2.2 Deferred step',
  '- ⬜ 3.9 Tests and package',
  '- ⬜ 4.8 Applications',
].join('\n')

const BAND = {
  plugin: 'brand-identity-toolkit',
  component: 'AbovePrompt',
  props: {
    hasSurvey: false,
    isWorking: false,
    maxRows: 4,
    bodyColumns: 120,
    scroll: { offset: 0, bodyRows: 4 },
    view: {},
  },
} as const

test('shows the current step and flags an earlier open one', async ($, on) => {
  on('fs.exists', () => ({ value: true }))
  on('fs.read', () => ({ value: PROGRESS }))
  on('session.cwd', () => ({ value: '/project' }))
  on('command.register', () => ({ value: { command: 'progreso' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })

  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect((await ui.find({ type: 'Text', text: /3\.9 Tests and package/ }))?.text).toContain('3.9')
  expect((await ui.find({ type: 'Text', text: /Sin cerrar/ }))?.text).toContain('2.1')
  const link = await ui.find({ type: 'Link' })
  expect(link?.text).toContain('2/5 cerrados')
  expect(link?.text).toContain('file:///project/brand/progress.md')
  await ui.unmount()
})

test('draws nothing when the project has no progress file', async ($, on) => {
  on('fs.exists', () => ({ value: false }))
  on('command.register', () => ({ value: { command: 'progreso' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  on('ui.render', ($, e) => {
    const { Text } = $.ui.resolve(e)
    return <Text>engine</Text>
  })
  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })

  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  expect((await ui.find({ type: 'Text' }))?.text).toBe('engine')
  await ui.unmount()
})

test('strips control characters from step titles', async ($, on) => {
  on('fs.exists', () => ({ value: true }))
  on('fs.read', () => ({ value: 'Paso actual: 1.1\n- ⬜ 1.1 Discovery\u001b]8;;https://evil.test\u0007 link\u001b[2J' }))
  on('session.cwd', () => ({ value: '/project' }))
  on('command.register', () => ({ value: { command: 'progreso' } }))
  on('session.start', (_, e) => ({ cwd: e.cwd }))
  await $.session.start({ cwd: '/', surface: 'terminal', isInteractive: true })

  const ui = await $.ui.mount({ ...BAND, surface: 'terminal' })
  const text = (await ui.find({ type: 'Text', text: /1\.1 Discovery/ }))?.text ?? ''
  expect(text).toContain('1.1 Discovery')
  expect(/[\u0000-\u001f\u007f-\u009f]/.test(text)).toBe(false)
  await ui.unmount()
})
