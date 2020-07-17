import pino from 'pino'

const noPrettyLogger = pino()

function _handleFatalError(
    error: Error,
    finalLogger: pino.Logger,
    ...args: any[]
): void {
    finalLogger.fatal(error)
    process.exit(1)
}

export const handleFatalError: (
    error: Error | null,
    ...args: any[]
) => void = pino.final(noPrettyLogger, _handleFatalError)
