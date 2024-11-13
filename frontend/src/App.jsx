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

    Axios.post('http://localhost:3030/addfriend',{
      name: name,
      age: age
    })
    .then((data)=>{
      SetListOfFriend([...listOfFriend,{name:name,age:age}])
      console.log("friend added",data)
    })
    .catch((error)=>{
      console.log("fail to add friend",error)
    })
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
                            <button>Update</button>
                            <button id="remove-btn-border">X</button>
                      </div>
        })}
      </div>


    </>
  )
}

export default App
