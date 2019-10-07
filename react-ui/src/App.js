import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [shown, setShown] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(true)




  useEffect(() => {
    // console.log('Effect');
    setIsLoading(false); 
    // setIsError(false);
    axios
    // .get(`https://restcountries.eu/rest/v2/capital/${search}`)
    .get(`https://restcountries.eu/rest/v2/name/${search}`) 
    // .get(`https://restcountries.eu/rest/v2/currency/${search}`)
    .then(response => {
      console.log('Promise fulfiled for Name', response);
      setData(response.data);
      
    }) 
    .catch(error => {
      console.log('Name error:', error.response);
      // setIsError(false);
    });
    
    axios
    .get(`https://restcountries.eu/rest/v2/capital/${search}`)
    //.get(`https://restcountries.eu/rest/v2/name/${search}`) 
    // .get(`https://restcountries.eu/rest/v2/currency/${search}`)
    .then(response => {
      console.log('Promise fulfiled for Capital', response);
      setData(response.data);
      
    })
    .catch(error => {
      console.log('Capital error:', error.response);
      // setIsError(false);
    });
    axios
    //.get(`https://restcountries.eu/rest/v2/capital/${search}`)
    //.get(`https://restcountries.eu/rest/v2/name/${search}`) 
    .get(`https://restcountries.eu/rest/v2/currency/${search}`)
    .then(response => {
      console.log('Promise fulfiled for Currency', response);
      setData(response.data);
      
    })
    .catch(error => {
      console.log('Currency error:', error.response);
      // setIsError(false);
    });
    
  }, [search]);

  const handelSearchChanged = (e) => {
    e.preventDefault();
    setSearch(e.target.value);

    if (e.target.value.length < 3){
      document.getElementById("text").style.visibility = "visible";
    }else{
      document.getElementById("text").style.visibility = "hidden";
    }
  }


  const toggleShown = (name) => {
    setShown(prevShown => ({
      ...prevShown,
      [name]:!prevShown[name]
    }));
  }

  const labelStyle = {
    visibility: 'hidden',
    color: 'red'
  };


  return (
    <Fragment>
      {/* {isError && <div>something went wrong...</div>} */}
      {isLoading ? (<div>Loading ...</div>): (
      <div>
        Find Country: <input type = 'text'  value = {search} onChange = {handelSearchChanged} placeholder = "Search Country info..."/>
        <label id = "text" style={labelStyle}>Too many matches, Specify another letter</label>
      </div> 
      )} 
      
     <div> 
     {data.map(item => (
        <ul key={item.name}>
          {item.name ? (<button id = "show" onClick ={() => toggleShown(item.name)}>Show</button>): null}<br/>
          <div><strong>{item.name}</strong></div>
          {shown[item.name] ? 
          <div>
          Capital:{item.capital}<br/>
          Population:{item.population}<br/>
          Area:{item.area}<br/>
          Region:{item.region}<br/>
            {item.languages.map(lan => (
              <ul>
                <li>
                Languages:{lan.name}
               </li>
              </ul>
            ))}
            {item.currencies.map(cu => (
              <ul>
                <li>
                Currency:{cu.name}
               </li>
              </ul>
            ))}
            {/* <ul>
            <li>Languages:{item.languages[0].name} | Native Name:{item.languages[0].nativeName}<br/></li>
            <li>Currency:{item.currencies[0].code}<br/></li>
            </ul> */}

          <img src = {item.flag} alt = "flag" width = "150" height = "90" border = "1px solid #000000" />
          </div>
          :null}
        </ul>
      ))}
      </div>
    </Fragment>
  );
}
export default App;

