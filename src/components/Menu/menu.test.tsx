import React from 'react'
import {fireEvent, render,RenderResult,cleanup} from '@testing-library/react'

import Menu,{MenuProps} from './menu'
import MenuItem from './menuitem'
import Submenu from './Submenu'
const testProps:MenuProps ={
  defaultIndex:'0',
  onSelect:jest.fn(),
  className:'test'
}

const testVerProps:MenuProps ={
  defaultIndex:'0',
  mode:'vertical'
}

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem >
        active
      </MenuItem>
      <MenuItem disabled >
        disabled
      </MenuItem>
      <MenuItem >
        xyz
      </MenuItem>
      <Submenu title='aa'>
        <MenuItem>
          d1
        </MenuItem>
      </Submenu>
    </Menu>
  )
}
const createStyleFile =()=>{
  const cssFile:string=`
  .yk-menu{
    display:none
  }
  .yk-menu{
    display:block
  }
` 
  const style=document.createElement('style')
  style.type='text/css'
  style.innerHTML=cssFile
  return style
}

let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledELement:HTMLElement
describe('test Menu and MenuItem component',()=>{
  beforeEach(()=>{
    wrapper=render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement=wrapper.getByTestId('test-menu')
    activeElement=wrapper.getByText('active')
    disabledELement=wrapper.getByText('disabled')
  })
  it('should render correct Menu and Menu based on default,',()=>{
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('yk-menu test')
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(menuElement.querySelectorAll(':scope >li').length).toEqual(4)
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledELement).toHaveClass('menu-item is-disabled')
  })
  it('click items should change active and call the right callback',()=>{
    const thirdItem=wrapper.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
    fireEvent.click(disabledELement)
    expect(disabledELement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })
  it('click items should change active and call the right callback', () => {
    cleanup()
    const wrapper= render(generateMenu(testVerProps))
    const menuElement=wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when hover on subMenu',()=>{
    // expect(wrapper.queryByText('d1')).not.toBeVisible()
    // fireEvent.mouseEnter()
  })
})