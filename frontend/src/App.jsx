import { useState,useEffect} from 'react';
import Axios from 'axios';
import './App.css'

function App() {

  const [ name ,setName ] = useState("");
  const [ age, setAge ] = useState(0);
  const [listOfFriend,SetListOfFriend] = useState([])

  const handleName = (event) =>{
    setName(event.target.value);
  }

  const handleAge = (event) => {
      setAge(event.target.value);
  }

  const AddFriend = () =>{

    // Use the `_id` returned from the server response to ensure the list has the correct ID.

    Axios.post('http://localhost:3030/addfriend',{
      name: name,
      age: age
    })
    .then((data)=>{
      SetListOfFriend([...listOfFriend,{_id: response.data.id,name:name,age:age}])
      console.log("friend added",data)
    })
    .catch((error)=>{
      console.log("fail to add friend",error)
    })
  }

  const updateFriend = (id) =>{
    let newAge = prompt("Enter the age here ....");
    console.log(id)

    Axios.put("http://localhost:3030/update",{
      newAge : newAge,
      id:id
    })
    .then((data)=>{
      SetListOfFriend(listOfFriend.map((val)=>{
          return val._id == id ? {...val,age:newAge}:val;
      }))
    })
    console.log(id);

  }

  const deleteFriend = (id) => {

    Axios.delete(`http://localhost:3030/delete/${id}`).then(() => {
          SetListOfFriend(listOfFriend.filter((val) => val._id !== id));
          console.log("Friend deleted");
     })
      .catch((error) => {
            console.log("Error deleting friend:", error);
      });

  }

  useEffect(()=>{
    const fetchData = () =>{
      Axios.get('http://localhost:3030/read')
        .then((response)=>{
          SetListOfFriend(response.data);
          console.log(response);
        })
        .catch((error)=>{
          console.log(error)
        })

    }
    fetchData()
  },[])


  return (
    <>
      <div className='input-box'>

        <div className="inputs">
          <input type="text" placeholder='enter name here..' onChange={handleName}/>
          <input type="number" placeholder='enter age here..' onChange={handleAge} />

          <button className='add-btn' onClick={AddFriend}>Add Friend</button>
        </div>

      </div>
      <div  className='Listoffriends'>
        {listOfFriend.map((data,key)=>{
              return <div  className='friendContainer'>
                            <div  className='friend' key={key}>
                                <h3>{data.name}</h3>
                                <h3>{data.age}</h3>
                            </div>
                            <button  onClick={()=>updateFriend(data._id)}>Update</button>
                            <button id="remove-btn-border" onClick={()=>deleteFriend(data._id)}>X</button>
                      </div>
        })}
      </div>


    </>
  )
}

export default App
