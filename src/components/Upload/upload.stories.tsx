import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {Upload} from './upload'

const filePre =(file:File)=>{
  const newFile =new File([file],'new_name.py',{type:file.type})
  console.log('预处理完成');
  return Promise.resolve(newFile)
}
const SimpleUpload =()=>{
  return(
    <Upload action="http://jsonplaceholder.typicode.com/posts"
      onProgress={action('progess')}
      onSuccess={action('success')}
      onError={action('error')}
      onChange={action('changed')}
      // beforeUpload={filePre}
    />
  )
}

storiesOf('Upload component',module)
.add('Upload',SimpleUpload)