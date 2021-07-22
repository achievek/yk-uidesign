import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuitem'
import SubMenu from './components/Menu/Submenu'
import Transition from './components/Transition/transition'
import Input from './components/Input/input'
import { library} from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
library.add(fas)

function App() {
  const [show,setShow]=useState(false)
  return (
    <div className="App">
      <header className="App-header">
        <Input icon='search' style={{width:'300px'}}/>
        <Menu defaultIndex={'0'} onSelect={(index)=>alert(index)} mode='vertical' defaultOpenSubmenus={['2']}>
          <MenuItem>cool link</MenuItem>
          <MenuItem  disabled>cool link2</MenuItem>
          <MenuItem>cool link3</MenuItem>
          <MenuItem>cool link4</MenuItem>
          <SubMenu title="Dropdown">
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
          </SubMenu>
        </Menu>
        <Button size='lg' onClick={()=>setShow(!show)}>Toggle</Button>
        <Transition in={show} timeout={300} animation='zoom-in-left' wrapper>
          <div>
            <p>Edit <code>src/App.tsx</code>and save to reload</p>
            <p>Edit <code>src/App.tsx</code>and save to reload</p>
            <p>Edit <code>src/App.tsx</code>and save to reload</p>
            <p>Edit <code>src/App.tsx</code>and save to reload</p>
            <p>Edit <code>src/App.tsx</code>and save to reload</p>
          </div>
        </Transition>
        <Transition in={show} timeout={300} animation='zoom-in-top' wrapper>
          <Button btnType={'primary'} size='lg'>A large button</Button>
        </Transition>
        {/* <Button autoFocus>hello</Button>
        <Button onClick={(e)=>{e.preventDefault();alert("123")}} btnType={'primary'} size={'lg'}>hello</Button>
        <Button className="aa" btnType={'default'} size={'lg'}>hello</Button>
        <Button btnType={'danger'} size={'lg'}>hello</Button>
        <Button btnType={'link'} target="_blank" href="http://www.baidu.com" size={'sm'}>hello</Button>
        <Button  disabled btnType={'link'} href="www.baidu.com" size={'sm'}>hello</Button> */}
      </header>
    </div>
  );
}

export default App;
