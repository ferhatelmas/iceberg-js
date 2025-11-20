export interface HttpRequest {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'HEAD'
  path: string
  query?: Record<string, string | undefined>
  body?: unknown
  headers?: Record<string, string>
}

export interface HttpResponse<T = unknown> {
  status: number
  headers: Headers
  data: T
}

export interface HttpClient {
  request<T = unknown>(req: HttpRequest): Promise<HttpResponse<T>>
}

export type AuthConfig =
  | { type: 'none' }
  | { type: 'bearer'; token: string }
  | { type: 'header'; name: string; value: string }
  | {
      type: 'custom'
      getHeaders: () => Record<string, string> | Promise<Record<string, string>>
    }
