import React, {useState, useEffect} from 'react';
import './App.css';

import Checkbox from './Components/Checkboxes/Checkbox';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberChecked:0,
      selectAll: false,
      allCheckbox: [
        {
          id: 0,
          isChecked: false
        },
        {
          id: 1,
          isChecked: false
        },
        {
          id: 2,
          isChecked: false
        },
        {
          id: 3,
          isChecked: false
        },
      ]
    }
  }
/*
Handle the selectAll button behavior
*/
  handleSelectAll(event) {
    let allCheck = this.state.allCheckbox;
    let nb = this.state.numberChecked;

    allCheck.map((check) => {
      check.isChecked = event.target.checked;
      return check;
    })
    if(event.target.checked) {
      nb=4;
    } else {
      nb = 0;
    }

    this.setState({numberChecked:nb,selectAll:event.target.checked,allCheckbox:allCheck});
  }

  /*
  Handle the click on 1 checkbox
  set the state value of that checkbox accordingly
  add or remove 1 to numberChecked
  */
  handleOneCheckbox(event) {
    let allCheck = this.state.allCheckbox;
    let nb = this.state.numberChecked;

    allCheck[event.target.id].isChecked = !allCheck[event.target.id].isChecked;

    if(nb === 4 && !event.target.checked) {
      this.setState({selectAll:false})
    }

    if(event.target.checked)
    {
      this.setState({numberChecked:this.state.numberChecked+1});
      nb++;
    } else {
      this.setState({numberChecked:this.state.numberChecked-1});
      nb--;
    }

    if(nb === 4) {
      this.setState({selectAll:true})
    }

    this.setState({allCheckbox:allCheck});
  }


  render () {
    const {allCheckbox, selectAll} = this.state;
    return (
      <div className="App">
        <form className='Form'>
          <Checkbox checkboxLabel="Select All" checked={selectAll} onChange={(event) => this.handleSelectAll(event)}/>
          {
            allCheckbox.map(check => {
              return(
                <Checkbox checkboxLabel={`Item ${check.id}`}  id={check.id} checked={allCheckbox[check.id].isChecked} onChange={(event) => this.handleOneCheckbox(event)}/>
                )
            })
          }
        </form>
      </div>
    );
  }
}

export default App;
