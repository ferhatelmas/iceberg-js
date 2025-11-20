import { createFetchClient } from '../http/createFetchClient'
import type { AuthConfig, HttpClient } from '../http/types'
import { NamespaceOperations } from './namespaces'
import { TableOperations } from './tables'
import type {
  CreateTableRequest,
  NamespaceIdentifier,
  NamespaceMetadata,
  TableIdentifier,
  TableMetadata,
  UpdateTableRequest,
} from './types'

export interface IcebergRestCatalogOptions {
  baseUrl: string
  catalogName?: string
  auth?: AuthConfig
  fetch?: typeof fetch
}

export class IcebergRestCatalog {
  private readonly client: HttpClient
  private readonly namespaceOps: NamespaceOperations
  private readonly tableOps: TableOperations

  constructor(options: IcebergRestCatalogOptions) {
    const prefix = options.catalogName ? `/${options.catalogName}` : ''

    this.client = createFetchClient({
      baseUrl: options.baseUrl,
      auth: options.auth,
      fetchImpl: options.fetch,
    })

    this.namespaceOps = new NamespaceOperations(this.client, prefix)
    this.tableOps = new TableOperations(this.client, prefix)
  }

  async listNamespaces(parent?: NamespaceIdentifier): Promise<NamespaceIdentifier[]> {
    return this.namespaceOps.listNamespaces(parent)
  }

  async createNamespace(id: NamespaceIdentifier, metadata?: NamespaceMetadata): Promise<void> {
    await this.namespaceOps.createNamespace(id, metadata)
  }

  async dropNamespace(id: NamespaceIdentifier): Promise<void> {
    await this.namespaceOps.dropNamespace(id)
  }

  async loadNamespaceMetadata(id: NamespaceIdentifier): Promise<NamespaceMetadata> {
    return this.namespaceOps.loadNamespaceMetadata(id)
  }

  async listTables(namespace: NamespaceIdentifier): Promise<TableIdentifier[]> {
    return this.tableOps.listTables(namespace)
  }

  async createTable(
    namespace: NamespaceIdentifier,
    request: CreateTableRequest
  ): Promise<TableMetadata> {
    return this.tableOps.createTable(namespace, request)
  }

  async updateTable(id: TableIdentifier, request: UpdateTableRequest): Promise<TableMetadata> {
    return this.tableOps.updateTable(id, request)
  }

  async dropTable(id: TableIdentifier): Promise<void> {
    await this.tableOps.dropTable(id)
  }

  async loadTable(id: TableIdentifier): Promise<TableMetadata> {
    return this.tableOps.loadTable(id)
  }
}
