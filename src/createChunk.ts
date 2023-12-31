import SparkMD5 from 'spark-md5'
import type{ ChunkInfo } from './type'

const hashMap = new Map();

/**
 * @description 文件分片
 * @author Gang.W
 * @param { File } file 文件
 * @param { Number } index 分片索引
 * @param { Number} chunkSize 分片大小
 */
export const createChunk = (
    file:File,
    index:number,
    chunkSize:number
): Promise<ChunkInfo> => {
    return new Promise((resolve)=>{
        const start = index * chunkSize
        const end = start + chunkSize
        const spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader();

        fileReader.onload=(e)=>{
            const fileBuffer = e.target?.result as ArrayBuffer;
            let hash
            if (!hashMap.has(fileBuffer)) {
                spark.append(fileBuffer)
                hash = spark.end()
            }
            else {
                hash = hashMap.get(fileBuffer)
            }

            resolve({
                start,
                end,
                index,
                hash,
              })
        }
        fileReader.readAsArrayBuffer(file.slice(start, end))
    })
}