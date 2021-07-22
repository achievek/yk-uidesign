import React from 'react'
import {storiesOf} from '@storybook/react'
import Input from './input'
import '../../styles/index.scss'


const defaultInput = () =>{
  return(
    <Input    style={{width: '300px'}}
    placeholder="placeholder"/>
  )
}
const disabledInput = () => (
  <Input
    style={{width: '300px'}}
    placeholder="disabled input"
    disabled 
  />
)
const iconInput = () => (
  <Input
    style={{width: '300px'}}
    placeholder="input with icon"
    icon="search"
  />  
)
const sizeInput = () => (
  <>
    <Input
      style={{width: '300px'}}
      defaultValue="large size"
      size="lg"
    />
    <Input
      style={{width: '300px'}}
      placeholder="small size"
      size="sm"
    />
  </>
)
const pandInput = () => (
  <>
    <Input
      style={{width: '300px'}}
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      style={{width: '300px'}}
      defaultValue="google"
      append=".com"
    />
    
  </>
)

storiesOf('Input Component',module)
.add('Input', defaultInput)
.add('被禁用的 Input', disabledInput)
.add('带图标的 Input', iconInput)
.add('大小不同的 Input', sizeInput)
.add('带前后缀的 Input', pandInput)