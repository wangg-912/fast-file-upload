# fast-file-upload
一款简单使用并且快速的分片上传封装函数工具，使用 Worker 进行分片上传，Worker 开启数量根据 CPU 内核数控制，支持多个文件同时上传，每片默认按照 5MB 进行分片，可自己设置。另外提供了 2 个函数，fastFileUpload函数中得Upload 会在单个文件全部分完片后依次回调。

# Version
V 0.0.1

# Install
```
npm install fast-file-upload --save
or
pnpm add fast-file-upload

```

# Usage
```
import { fastFileUpload } from 'fast-file-upload'

fastFileUpload('input[type="file"]', {
  perCallback: (fileInfo) => {
    console.log('单个文件每一次调用', fileInfo)
  },
  lastCallback: (files) => {
    console.log('所有文件最后一次总和的调用', files)
  },
})
```

# Params
- FileInfo 参数

| 属性 | 描述 | 类型 | 是否必填 |
| ------- | -------| ------- | ------- |
| name  | 文件名称  | string  | 是 |
| type  | 文件类型  | string  | 是 |
| size  | 文件大小  | number  | 是 |
| lastModified  | 最近一次返回时间戳  | number  | 是 |
| chunks  | 文件分片信息  | object  | 是 |



- ChunkInfo 参数
| 属性 | 描述 | 类型 | 是否必填 |
| ------- | -------| ------- | ------- |
| start  | 分片开始大小  | number  | 是 |
| end  | 分片结束大小  | number  | 是 |
| index  | 分片索引  | number  | 是 |
| hash  | 分片映射  | string  | 是 |


- fastFileUpload 配置

| 配置字段 | 配置描述 | 类型 | 备注 |
| ------- | -------| ------- | ------- |
| chunkSize  | 分片大小  | number  | 每个分片大小 |


- fastFileUpload 事件

| 事件字段 | 事件描述 | 类型 | 备注 |
| ------- | -------| ------- | ------- |
| perCallback  | 前置分片  | function  | 除大文件分片的最后一个分片的所有前置分片 |
| lastCallback  | 最后分片  | function  | 大文件分片的最后一个分片 |
| splitCallback  | 分片  | function  | 大文件分片的每个分片 |



