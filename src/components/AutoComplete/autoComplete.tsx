import React,{FC,useState,ChangeEvent,ReactElement,useEffect} from 'react'
import Input,{InputProps} from "../Input/input"
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'

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
  useEffect(()=>{
    if(deDebounceValue){
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

  },[deDebounceValue])
  console.log(suggestions);
  
  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const value =e.target.value.trim()
    setInputvalue(value)
  }
  const renderTemplete =(item:DataSourceType) =>{
    return renderOption? renderOption(item):item.value
  }
  const generateDropdown =()=>{
    return (
      <ul>
        {suggestions.map((item,index)=>{
          return (
            <li key={index} onClick={()=>handleSelect(item)}>
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
  }
  return(
    <div className="yk-auto-complete">
      <Input value={inputvalue} onChange={handleChange} />
      {loading&&<ul><Icon icon="spinner" spin/></ul>}
      {(suggestions.length>0)&&generateDropdown()}
    </div>
  )
}