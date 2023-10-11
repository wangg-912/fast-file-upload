/**
 * @description 配置
 * @author Gang.W
 */
export interface Options {
    perCallback?: (fileInfo: FileInfo & { isDone: boolean }) => void
    lastCallback?: (filesInfo: FileInfo[]) => void
    splitCallback?: (fileInfo: FileInfo) => void
    chunkSize?: number
  }
/**
 * @description 文件信息
 * @author Gang.W
 */
  export interface FileInfo {
    name: string
    type: string
    size: number
    lastModified: number
    chunks: ChunkInfo
  }

/**
 * @description 分片信息
 * @author Gang.W
 */
export interface ChunkInfo {
    start: number
    end: number
    index: number
    hash: string
  }