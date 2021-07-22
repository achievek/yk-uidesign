import React, { InputHTMLAttributes, ReactElement,FC} from 'react'
import classNames from 'classnames'
import {IconProp} from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type InputSize ='lg'|'sm'

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>,"size">{
  disabled?:boolean;
  size?:InputSize;
  icon?:IconProp;
  prepend?:string | ReactElement;
  append?:string | ReactElement;
}

const Input :FC<InputProps>=(props)=>{
  //1.第一步  取出各种属性
  const {disabled,size,icon,prepend,append,style,...restProps}=props;
  //2.根据属性计算不同的className
  const classes =classNames('yk-input-wrapper',{
      [`input-size-${size}`]:size,
      'is-disabled':disabled,
      'input-group-append':!!append,
      'input-group-preend':!!prepend
  })
  return (
    <div className={classes} style={style}>
      {prepend && <div className="yk-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input 
        className="yk-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="yk-input-group-append">{append}</div>}
    </div>
  )
}

export default Input;