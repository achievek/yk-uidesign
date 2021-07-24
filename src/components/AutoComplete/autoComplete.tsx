import React,{FC,useState,ChangeEvent,KeyboardEvent,ReactElement,useEffect, useRef} from 'react'
import classnames from 'classnames'
import Input,{InputProps} from "../Input/input"
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'

interface DataSourceObject{
  value:string
}

export type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps,'onSelect'>{
  fetchSuggections:(str:string)=> DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?:(item:DataSourceType)=>void;
  renderOption?:(item:DataSourceType)=>ReactElement
}



export const AutoComplete: FC<AutoCompleteProps>=(props) =>{
  const {
    fetchSuggections,onSelect,value,renderOption,...restProps
  }=props
  const [inputvalue,setInputvalue]=useState(value as string)
  const [suggestions,setSugestions]=useState<DataSourceType[]>([])
  const [loading,setLoading] =useState(false)
  const deDebounceValue = useDebounce(inputvalue,500)
  const [highlightIndex,setHighlightIndex] =useState(-1)
  const triggrtSearch =useRef(false)
  const componetRef =useRef<HTMLDivElement>(null)
  useClickOutside(componetRef,()=>{setSugestions([])})
  useEffect(()=>{
    if(deDebounceValue&&triggrtSearch.current){
      const results=fetchSuggections(inputvalue)
      if(results instanceof Promise){
        console.log('加载中');
        setLoading(true)
        results.then(data=>{
          setSugestions(data)
          setLoading(false)
        })
      }else setSugestions(results)
    }else setSugestions([])
    setHighlightIndex(-1)
  },[deDebounceValue])
  console.log(suggestions);
  const highlight =(index:number) =>{
    if(index<0) index=0;
    if(index>=suggestions.length) index=suggestions.length-1
    setHighlightIndex(index)
  }
  const handleKeyDown =(e:KeyboardEvent<HTMLInputElement>)=>{
    switch(e.keyCode){
      case 13: 
      if(suggestions[highlightIndex])handleSelect(suggestions[highlightIndex])
      break;
      case 38: 
      highlight(highlightIndex-1)
      break;
      case 40: 
      highlight(highlightIndex+1)
      break;
      case 27: 
      setSugestions([])
      break;
      default: break;
    }
  }
  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const value =e.target.value.trim()
    setInputvalue(value)
    triggrtSearch.current=true
  }
  const renderTemplete =(item:DataSourceType) =>{
    return renderOption? renderOption(item):item.value
  }
  const generateDropdown =()=>{
    return (
      <ul className="yk-suggestion-list">
        {suggestions.map((item,index)=>{
          const cnames =classnames('suggestion-item',{
            'item-highlighted':index===highlightIndex
          })
          return (
            <li key={index} onClick={()=>handleSelect(item)} className={cnames}>
              {renderTemplete(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  const handleSelect =(item:DataSourceType)=>{
    setInputvalue(item.value)
    setSugestions([])
    if(onSelect){
      onSelect(item)
    }
    triggrtSearch.current=false
  }
  return(
    <div className="yk-auto-complete" ref={componetRef}>
      <Input value={inputvalue} onChange={handleChange} onKeyDown={handleKeyDown} />
      {loading&&<ul><div className="suggstions-loading-icon"><Icon icon="spinner" spin/></div></ul>}
      {(suggestions.length>0)&&generateDropdown()}
    </div>
  )
}