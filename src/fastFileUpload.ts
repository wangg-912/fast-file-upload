import { fastFile } from './fastFile'
import type{FileInfo,Options} from "./type"

// fastFileUpload('input[type="file"]', {
//   perCallback: (fileInfo) => {
//     console.log('单个文件每一次调用', fileInfo)
//   },
//   lastCallback: (files) => {
//     console.log('所有文件最后一次总和的调用', files)
//   },
// })
/**
 * @description 会在单个文件全部分完片后依次回调
 * @author Gang.W
 * @param {String} selector 选择Html元素
 * @param {Options}   options  事件回调 interface Options
 */
export const fastFileUpload =(selector:string, options?: Options)=>{
    const el = document.querySelector(selector) as HTMLInputElement;
    const { perCallback , lastCallback, chunkSize } = options || {};

    el.onchange = async () => {
        const files = el.files ? Array.from(el.files) : []
        const results: FileInfo[] = []
        let fileCount = files.length;
        for (const file of files) {
            fastFile(file, chunkSize).then((chunks) => {
              fileCount--;
              const fileInfo = {
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified,
                chunks,
              }
              perCallback && perCallback({ ...fileInfo, isDone: fileCount === 0 });
              results.push(fileInfo);
              if (fileCount === 0)
                lastCallback && lastCallback(results)
            })
          }
    }

}