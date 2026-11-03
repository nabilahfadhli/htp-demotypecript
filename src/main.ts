import * as core from '@actions/core'
import { wait } from './wait.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')

    const milliseconds = Number.parseInt(ms, 10)

    if (!Number.isFinite(milliseconds) || milliseconds < 0) {
      throw new Error('milliseconds must be a non-negative number')
    }

    core.debug(`Waiting ${milliseconds} milliseconds ...`)

    core.debug(new Date().toTimeString())
    await wait(milliseconds)
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())

    await core.summary
      .addHeading('RKM Advanced Job Summary', 2)
      .addImage(
        'https://octodex.github.com/images/droidtocat.png',
        'Droidtocat',
        {
          width: '64',
          height: '64'
        }
      )
      .addTable([
        [
          { data: 'File', header: true },
          { data: 'Result', header: true }
        ],
        ['foo.js', 'Pass'],
        ['bar.js', 'Fail'],
        ['test.js', 'Pass']
      ])
      .addLink('My custom link', 'https://writeabout.net')
      .write()
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    } else {
      core.setFailed(String(error))
    }
  }
}
