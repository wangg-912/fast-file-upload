import type { ChunkInfo } from './type'

const THREAD_COUNT = navigator.hardwareConcurrency || 4; //CPU核心数

export const fastFile=(
    file:File,
    CHUNK_SIZE:number=5*1024*1024
): Promise<ChunkInfo>=>{
    return new Promise((resolve)=>{
        const result: any = []
        let finishCount = 0
        const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
        const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT);

        for(let i =0;i<THREAD_COUNT; i++){
            const worker = new Worker('./dist/work.js',{type:'module'});
            const startIndex = i * workerChunkCount;
            let endIndex = startIndex + workerChunkCount;
            if (endIndex > chunkCount){
                endIndex = chunkCount;
            }
            worker.postMessage({ file, i, CHUNK_SIZE, startIndex, endIndex });
            worker.onmessage = ({ data }) => {
                for (let i = startIndex; i < endIndex; i++)
                result[i] = data[i - startIndex];

                worker.terminate();
                finishCount++;
                if (finishCount === THREAD_COUNT)
                    resolve(result);
            }
            
        }
    })

}