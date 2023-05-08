import { FaPlus } from "react-icons/fa"
import { useRef } from "react"
const Additem = ({newItem,setNewItem,handleSubmit}) => {
    const inputRef=useRef()
 
  return (
    <form className="addForm" onSubmit={handleSubmit}>
        <label htmlFor='addItem'>Add Item</label>
        <input 
        autoFocus
        ref={inputRef}
        id="addItem"
        type="text"
        placeholder='Add item'
        required
        value={newItem}
        onChange={(e)=>{setNewItem(e.target.value)}}/>
        
        <button
        type='submit'
        aria-label="Add item"
        onClick={()=>inputRef.current.focus()}><FaPlus/></button>
      
    </form >
  )
}

export default Additem
