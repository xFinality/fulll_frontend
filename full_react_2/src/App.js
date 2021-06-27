import React, {useState} from 'react';
import './App.css';

const App = () => {
  const [tooManyResult, setTooManyResult] = useState(false);
  const [noResult, setNoResult] = useState(true);
  const [result, setResult] = useState([]);
  const [rateLimit, setRateLimit] = useState(false);

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
        setRateLimit(false);
        return response.json();
      } else if(response.status===403) {
        setRateLimit(true);
      }
    }).then(resJson => {
      if(rateLimit)
        return (403);
      if(resJson){
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
      }

    }).catch((error) => {
      if(rateLimit)
        console.log("Rate limit exceeded")
      else 
        console.log(error)
    })

    
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
        !noResult && !rateLimit ? result.map((user) => {
          return (<div key={user.id}>{user.login}</div>)
        }): !rateLimit ? <div className="tooManyResult"> No Result </div>
        :
        <div className="tooManyResult">Rate Limit exceeded</div>
      }

      </div>
    </div>
  );
}

export default App;
