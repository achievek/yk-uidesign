import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import '../../styles/index.scss'

import Button from './button'

const styles:React.CSSProperties={
  textAlign:'center'
}
const CenterDecortor =(storyFn:any) => <div style={styles}>{storyFn()}</div>


const defaultButton =()=>(
  <Button onClick={action('clicked')} >默认button</Button>
)

const buttonWithSize =()=>(
  <>
    <Button size='lg'>Large button</Button>
    <Button size='sm'>Small button</Button>
  </>
)

const buttonWithType =()=>(
  <>
    <Button btnType='primary'>Primary button</Button>
    <Button btnType='danger'>Danger button</Button>
    <Button btnType='link' href="https://gogle.com">Link button</Button>
  </>
)

storiesOf('Button Component',module)
.addDecorator(CenterDecortor)
.addParameters({info:{
  text:'this is a very nice component',
  inline:true
}})
.add('默认button',defaultButton)
.add('不同尺寸的Button',buttonWithSize)
.add('不同类型的Button',buttonWithType)