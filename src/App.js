import { useState, useEffect } from "react";
import Headers from "./Header";
import Additem from "./Additem";
import Content from "./Content";
import Footer from "./Footer";
import SearchItem from "./SearchItem";
import apiRequest from "./apiRequest";
function App() {
  const API_URL = "http://localhost:3500/items";

  //here we shortcircuited with an empty array just
  //make sure that when the app first runs it creates an empty array
  // const [items, setItems] = useState(
  //   JSON.parse(localStorage.getItem("shoppinglist")) || []
  // );
  const [items, setItems] = useState([]);

  const [fetchError, setfetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw Error("Didn't recieve expected data");
        }
        const listItems = await response.json();

        setItems(listItems);
        setfetchError(null);
      } catch (error) {
        setfetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    //simulating a scenario of an api delay
    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);
  // //with empty dependecy arrray
  // useEffect(()=>{
  //   console.log("loading")
  // },[])
  // //with items in dependecy arrray,hook is called whenever the items state changes
  // useEffect(()=>{
  //   console.log("Updating item")
  // },[items])
  //without dependecy arrray
  //  useEffect(()=>{
  //   console.log("rendering")
  // })

  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  //without dependecy arrray
  // useEffect(() => {
  //   localStorage.setItem("shoppinglist", JSON.stringify(items));
  // }, [items]);

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
    const postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(myNewItem),
    };
    const response = await apiRequest(API_URL, postOptions);
    if (response) {
      setfetchError(response);
    }
  };

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({checked:myItem[0].checked}),
    };
    const reqUrl=`${API_URL}/${id}`
    const response = await apiRequest(reqUrl, updateOptions);
    if (response) {
      setfetchError(response);
    }
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    const deleteOptions={
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify()
    }
    const reqUrl=`${API_URL}/${id}`
    const response=await apiRequest(reqUrl,deleteOptions)
    if(response){setfetchError(response)}


  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    console.log(`submitted : ${newItem}`);
    setNewItem("");
  };

  return (
    <div className="App">
      <Headers title="Add/Delete LIST items" />
      <Additem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem setSearch={setSearch} search={search} />
      <main>
        {fetchError && <p style={{ color: "red" }}>Error : {fetchError}</p>}
        {isLoading && <p style={{ color: "blue" }}>Loading items...</p>}
        {!fetchError && !isLoading && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            setItems={setItems}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
