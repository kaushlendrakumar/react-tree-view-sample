import React from 'react';
import './App.scss';

function App() {

  // start initialize state value
  const [itemList, setItemList] = React.useState({
    list: []
  });
  // end initialize state value

  // start API call
  React.useEffect(() => {
    fetch('http://localhost:3000/App.json')
      .then(results => results.json())
      .then(data => {
        console.log("data:", data);
        // set initalize value after API Call
        setItemList({ ...itemList, list: data.response });
      });
  }, []);
  // end API call

  // start collapseTree event
  const collapseTree = (data) => {
    console.log("collapseTree...", data);
    data.isChildShow = !data.isChildShow;
    setItemList({ ...itemList, data });
  }
  // end collapseTree event

  // start newHtml
  function newHtml(data) {
    if (data && data.length > 0) {
      return data.map((item, index) => {
        return (
          <div key={`${item.name}${index}`}>
            {
              (item.children && item.children.length > 0) ? 
                <span className="collapsable-icon collapsable-box" onClick={() => collapseTree(item)}>
                  { (item.isChildShow) ? <>&#9660;</> : <>&#9658;</> }
                </span>
                : <span className="collapsable-box">&nbsp;</span>
            }
            <span className="title-name">Name: </span> {item.name}, <span className="title-name">Age: </span> {item.age}
            {
              (item.isChildShow && item.children && item.children.length > 0) ?
                <ul>
                  <li>{newHtml(item.children)}</li>
                </ul>
                : ''
            }
          </div>
        )
      })
    }
    else {
      return "";
    }

  }
  // end newHtml

  
  return (
    <div className="app-container">
      <div className="header">React App - cyware - Tree View Collapsable</div>
      {
        itemList.list.map((parentDetails, index) => {
          return (
            <div key={`${parentDetails.name}${index}`} className="each-family-container">
              <div className="heading-1">Family {index + 1}</div>
              {
                (parentDetails.children && parentDetails.children.length > 0) ?
                  <span className="collapsable-icon collapsable-box" onClick={() => collapseTree(parentDetails)}>
                    {(parentDetails.isChildShow) ? <>&#9660;</> : <>&#9658;</>}
                  </span>
                  : <span className="collapsable-box">&nbsp;</span>
              }
              <span className="title-name">Name: </span> {parentDetails.name}, <span className="title-name">Age: </span> {parentDetails.age}
              {
                (parentDetails.isChildShow && parentDetails.children && parentDetails.children.length > 0) ?
                  <ul>
                    <li>{newHtml(parentDetails.children)}</li>
                  </ul>
                  : ''
              }

            </div>
          )
        })
      }
    </div>
  );
}

export default App;
