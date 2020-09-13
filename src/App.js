import React, { useState } from "react";
import "./App.css";
import Slider from "./Slider";
import SidebarItem from "./SidebarItem";

const DEFAULT_OPTIONS = [
  {
    name: 'Sepia',
    property: 'sepia',
    value:10,
    range:{
      min:0,
      max:100,
    },
    unit: '%',
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value:100,
    range:{
      min:0,
      max:200,
    },
    unit: '%',
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value:10,
    range:{
      min:0,
      max:360,
    },
    unit: 'deg',
  },

];
function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);

  const selectedIndex = options[selectedOptionIndex];


  function handleSliderRange({target}){
    setOptions(prevOptions=>{
      return prevOptions.map((option,index)=>{
        if(index!==selectedOptionIndex) return option

        return {...option, value:target.value}
      
      })
    })
  }

  function getImageCssStyle(){
    const filters=options.map(option=>{
      return `${option.property}(${option.value}${option.unit})`
    })
    return {filter:filters.join(' ')}
  }
  console.log(getImageCssStyle())
  return (
    <div className="container">
      <div className="main-image" style={getImageCssStyle()} />
      <div className="sidebar">
        {options.map((option, index) => {
          return (
            <SidebarItem
              key={index}
              name={option.name}
              active={index===selectedOptionIndex}
              handleClick={()=>{ setSelectedOptionIndex(index)
              }}
            />
          );
        })}
      </div>
      <Slider
      min={selectedIndex.range.min}
      max={selectedIndex.range.max}
      value={selectedIndex.value}
      handleChange={handleSliderRange}
      
      />
       
    </div>
  );
}

export default App;
