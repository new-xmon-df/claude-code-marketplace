import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Snapshot, Step } from '../types'

const PROGRESS_FILE = 'brand/progress.md'
const snapshot = atom({ plugin: 'brand-identity-toolkit', key: 'snapshot' } as const, null)

const STEP_LINE = /^- (\S+)\s+(\d+\.\d+)\s+(.*)$/
const CURRENT_LINE = /(?:current step|paso actual|next step|siguiente paso)\s*:\s*\**\s*(\d+\.\d+)/i

function statusOf(mark: string): Step['status'] {
  if (mark.startsWith('✅')) return 'done'
  if (mark.startsWith('⏸')) return 'deferred'
  if (mark.startsWith('⚠')) return 'partial'
  return 'todo'
}

function shorten(text: string, max = 70): string {
  const plain = text.replace(/\*\*/g, '').replace(/`/g, '')
  return plain.length > max ? `${plain.slice(0, max - 1)}…` : plain
}

export function parse(markdown: string, file: string): Snapshot | null {
  const steps: Step[] = []
  for (const line of markdown.split('\n')) {
    const match = STEP_LINE.exec(line)
    const [, mark, id, title] = match ?? []
    if (mark && id && title) {
      steps.push({ id, status: statusOf(mark), title: shorten(title) })
    }
  }
  if (steps.length === 0) return null

  const isClosed = (step: Step) => step.status === 'done' || step.status === 'deferred'
  const named = CURRENT_LINE.exec(markdown)?.[1]
  let index = named ? steps.findIndex(step => step.id === named) : -1
  if (index < 0) index = steps.findIndex(step => !isClosed(step))

  return {
    current: steps[index] ?? null,
    openBefore: index >= 0 ? steps.slice(0, index).filter(step => !isClosed(step)) : [],
    done: steps.filter(isClosed).length,
    total: steps.length,
    file,
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const result = await next(e)
    await $.command.register({ name: 'progreso', description: 'Vuelve a leer brand/progress.md y actualiza la banda de progreso' })
    let fresh: Snapshot | null = null
    try {
      if (await $.fs.exists(PROGRESS_FILE)) fresh = parse(await $.fs.read(PROGRESS_FILE), `${await $.session.cwd()}/${PROGRESS_FILE}`)
    } catch {
      fresh = null
    }
    await update($, snapshot, () => fresh)
    return result
  })

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    let fresh: Snapshot | null = null
    try {
      if (await $.fs.exists(PROGRESS_FILE)) fresh = parse(await $.fs.read(PROGRESS_FILE), `${await $.session.cwd()}/${PROGRESS_FILE}`)
    } catch {
      fresh = null
    }
    await update($, snapshot, () => fresh)
    return result
  })

  on('prompt.submit', async ($, e, next) => {
    let fresh: Snapshot | null = null
    try {
      if (await $.fs.exists(PROGRESS_FILE)) fresh = parse(await $.fs.read(PROGRESS_FILE), `${await $.session.cwd()}/${PROGRESS_FILE}`)
    } catch {
      fresh = null
    }
    await update($, snapshot, () => fresh)
    return next(e)
  })

  on('command.run', { command: 'progreso' }, async $ => {
    let fresh: Snapshot | null = null
    try {
      if (await $.fs.exists(PROGRESS_FILE)) fresh = parse(await $.fs.read(PROGRESS_FILE), `${await $.session.cwd()}/${PROGRESS_FILE}`)
    } catch {
      fresh = null
    }
    await update($, snapshot, () => fresh)
    const state = await read($, snapshot)
    return { text: state?.current ? `Progreso releído: paso actual ${state.current.id} (${state.done}/${state.total} cerrados).` : 'No hay brand/progress.md en este proyecto.' }
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const state = await read($, snapshot)
    if (e.props.hasSurvey || state === null) return next(e)

    const { Box, Link, Text } = $.ui.resolve(e)
    const current = state.current

    return (
      <Box flexDirection="column">
        <Text>
          <Text dimColor>Marca · paso actual </Text>
          <Text bold>{current ? `${current.id} ${current.title}` : 'todo cerrado'}</Text>
          <Text dimColor>{'  ('}</Text>
          <Link href={`file://${state.file}`}>{`${state.done}/${state.total} cerrados`}</Link>
          <Text dimColor>{')'}</Text>
        </Text>
        {state.openBefore.length > 0 ? (
          <Text color="warning">
            {`⚠ Sin cerrar antes del actual: ${state.openBefore.map(step => step.id).join(', ')}`}
          </Text>
        ) : null}
      </Box>
    )
  })
}
