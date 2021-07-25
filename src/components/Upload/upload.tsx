import React,{ChangeEvent, FC,useRef,useState} from 'react'
import axios from 'axios'

import Button from '../Button/button'

export type UploadFilesStatus ='ready' | 'uploading'|'success' |'error'

export interface UploadFile{
  uid:string;
  size:number;
  name:string;
  status?:UploadFilesStatus
  percent?:number;
  raw?:File;
  response?:any;
  error?:any;
}

export interface UploadProps{
  action:string;
  beforeUpload?:(file:File)=> boolean | Promise<File>;//???
  onProgress?:(percentage:number,file:File) =>void;
  onSuccess?:(data:any,file:File)=>void;
  onError?:(err:any,file:File) =>void;
  onChange?:(file:File)=>void
}


export const Upload:FC<UploadProps>=(props) =>{
  const{
    action,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange
  }=props
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const handleClick =()=>{
    if(fileInput.current){
      fileInput.current.click()
    }
  }
  const handleFileChange =(e:ChangeEvent<HTMLInputElement>)=>{
    const files=e.target.files
    if(!files) return
    UploadFiles(files)
    if(fileInput.current){
      fileInput.current.value=''//清空
    }
  }
  const UploadFiles =(files:FileList)=>{
    let postFiles=Array.from(files)
    postFiles.forEach(file=>{
      if(!beforeUpload){
        post(file)
      }
      else{
        const result = beforeUpload(file)
        if(result&&result instanceof Promise){
          result.then(processedFile =>{
            post(processedFile)
          })}
          else if(result !==false){
            post(file)
          }
        }
      }
    )
  } 
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }
  const post =(file:File)=>{
    let _file:UploadFile={
      uid:Date.now()+'upload-file',
      status:'ready',
      name:file.name,
      size:file.size,
      percent:0,
      raw:file
    }

    const formData =new FormData()
    formData.append(file.name,file)
    axios.post(action,formData,{
      headers:{
        'Content-Type':'multipart/form-data'
      },
      onUploadProgress:(e)=>{
        let percentage=Math.round((e.loaded*100)/e.total) || 0;
        if(percentage<100){
          updateFileList(_file,{percent:percentage,status:'uploading'})
          if(onProgress) onProgress(percentage,file)
        }
      }
    }).then(resp=>{
      console.log(resp);
      alert('上传成功')
      updateFileList(_file,{response:resp.data,status:'success'})
      if(onSuccess){
        onSuccess(resp.data,file)
      }
      if(onChange){
        onChange(file)
      }
    }).catch(err =>{
      updateFileList(_file,{error:err,status:'error'})
      console.log(err);
      if(onError){
        onError(err,file)
      }
      if(onChange){
        onChange(file)
      }
    })
  }
  const fileInput =useRef<HTMLInputElement>(null)
  console.log('filelist内容为',fileList);
  return (
    <div className='yk-upload-component' >
      <Button btnType="primary" onClick={handleClick}>Upload File</Button>
      <input className="yk-file-inpit" style={{display:'none'}} type='file' ref={fileInput} onChange={handleFileChange} />
    </div>
  )
}


export default Upload