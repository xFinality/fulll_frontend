import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [tooManyResult, setTooManyResult] = useState(false);
  const [noResult, setNoResult] = useState(true);
  const [result, setResult] = useState([]);

  /*
  Call the github API
  Use the input value as q to look for the users
  Control if the rate limit is exceed, if there is no result or if there is too many results
  */
  const getAPIResult = async (event) => {
    let APIresult = [];
    const resJson = await fetch(`https://api.github.com/search/users?q=${event.target.value}`, {
      method: 'GET'
    }).then(response => {
      if(response.status === 200) {
        return response.json();
      } else if(response.status===403) {
        console.log('Rate limit exceeded');
        throw new Error('Rate limit exceeded');
      }
    })
    
    if(resJson.total_count !== resJson.items.length)
      setTooManyResult(true);
    else
      setTooManyResult(false)
    if(resJson.total_count !== 0)
      setNoResult(false);
    else
      setNoResult(true);
    APIresult=resJson.items;
    setResult(APIresult);
    return APIresult;
  }

  return (
    <div className="App">
      <label>
        Search users on github : 
        <input name="search" defaultValue="" onChange={(event) => getAPIResult(event)} />
      </label>
      {
        
      tooManyResult ? <div className="tooManyResult">Too many result. Only 30 shown.</div>
      :<div></div>
      }

      <div>
      { 
      !noResult ? result.map((user) => {
        return (<div>{user.login}</div>)
      }):<div className="tooManyResult"> No Result </div>
      }

      </div>
    </div>
  );
}

export default App;
