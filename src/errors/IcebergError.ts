export interface IcebergErrorResponse {
  type?: string
  message: string
  code?: string | number
}

export class IcebergError extends Error {
  readonly status: number
  readonly icebergType?: string
  readonly icebergCode?: string | number
  readonly details?: unknown

  constructor(
    message: string,
    opts: {
      status: number
      icebergType?: string
      icebergCode?: string | number
      details?: unknown
    }
  ) {
    super(message)
    this.name = 'IcebergError'
    this.status = opts.status
    this.icebergType = opts.icebergType
    this.icebergCode = opts.icebergCode
    this.details = opts.details
  }
}
