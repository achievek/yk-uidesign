import React,{useState,createContext} from 'react'
import classNames from 'classnames'
import {MenuItemProps} from './menuitem'
type MenuMode ='horizontal' | 'vertical'
type SelectCallBack =(selectedIndex:string)=>void

export interface MenuProps{
  defaultIndex?:string;
  className?:string;
  mode?:MenuMode;
  style?:React.CSSProperties;
  onSelect?:SelectCallBack;
  defaultOpenSubmenus?:string[]
}
interface ImenuContext{
  index:string;
  onSelect?:SelectCallBack;
  mode?:MenuMode;
  defaultOpenSubmenus?:string[]
}
export const MenuContext = createContext<ImenuContext>({index:'0'})

const Menu:React.FC<MenuProps> =(props) =>{
  const {className,mode,style,children,defaultIndex,onSelect,defaultOpenSubmenus}=props;
  const [currentActive,setActive]=useState(defaultIndex)
  const classes=classNames('yk-menu',className,{
    'menu-vertical':mode==='vertical',
    'menu-horizontal':mode!=='vertical'
  })
  const handleClick =(index:string) =>{
    setActive(index)
    if(onSelect){
      onSelect(index)
    }
  }
  const passedContext:ImenuContext={
    index:currentActive? currentActive:'0',
    onSelect: handleClick,
    mode,
    defaultOpenSubmenus
  }
  const renderChildren =()=>{
    return React.Children.map(children,(child,index)=>{
      const chilldElement =child as React.FunctionComponentElement<MenuItemProps>
      const {displayName} =chilldElement.type
      if(displayName==='Menu-item'||'SubMenu'){
        return React.cloneElement(chilldElement,{index:index.toString()})
      }else{
        console.log("warning:Menu has a child which is not a MenuItem");   
      }
    })
  }
  return(
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps={
  defaultIndex:'0',
  mode:'horizontal',
  defaultOpenSubmenus:[]
}


export default Menu