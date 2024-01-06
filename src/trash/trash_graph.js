import React, { useRef, useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { entrySelector } from '../slices/EntrySlice';
import EntryService from '../services/EntryService';
import { Button } from 'primereact/button';
import {setValues, addValue} from "../slices/EntrySlice";

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

const ChartComponent = () => {
  const canvasRef = useRef(null);
  const R = 100; // Change R value as needed
  const dispatch = useDispatch();

  //const [stateEntries, setStateEntries] = useState([]);

  const {valuesArray} = useSelector(state => state.entry);
  console.log(valuesArray);

  const handleClick = async (event) => {
    console.log("clicked");
    const canvas = canvasRef.current; 

    let mouseX = parseFloat(((event.clientX - canvas.getBoundingClientRect().left - 250) / 40).toFixed(2));
    let mouseY = parseFloat(-((event.clientY - canvas.getBoundingClientRect().top - 250) / 40).toFixed(2));

    if(window.innerWidth<550){
        mouseX = parseFloat(((event.clientX - canvas.getBoundingClientRect().left - 110) / 14).toFixed(2));
        mouseY = parseFloat(-((event.clientY - canvas.getBoundingClientRect().top - 110) / 14).toFixed(2));
    }

    // setFormData(prevFormData => ({
    //   ...prevFormData,
    //   x: mouseX,
    //   y: mouseY,
    //   r: 4,
    // }));
    // console.log(formData);

    const newFormData = {
      x: mouseX,
      y: mouseY,
      r: 4,
    }

    EntryService.createEntry(newFormData).then(res => {
      console.log("entry created");
      dispatch(addValue(newFormData));
      
    });

  }

  // const clear = async () => {
  //   EntryService.clearAllEntries().then(() => {
  //     const canvas = canvasRef.current;
  //     const context = canvas.getContext('2d');
  //     context.clearRect(0, 0, canvas.width, canvas.height);
  //     drawChart(context, canvas.width, canvas.height, R, chartColor);
  //   });
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await EntryService.getEntries();
        //setStateEntries(res.data); // Update stateEntries with fetched data
        dispatch(setValues(res.data));
        console.log("valuesArray: ", valuesArray);
      } catch (error) {
        console.error('Error fetching entries:', error);
      }
    };

    fetchData();

    const canvas = canvasRef.current;
    canvas.addEventListener('click', handleClick);

    return () => {
      // Cleanup: Remove the event listener when component unmounts
      canvas.removeEventListener('click', handleClick);
    };

  }, []); // Run only on mount


  useEffect(() => {
    console.log("in useEffect 2.0");
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    //context.clearRect(0, 0, canvas.width, canvas.height);
    const width = canvas.width;
    const height = canvas.height;
    let centerX = width / 2;
    let centerY = height / 2;
    let chartColor = "#87CEEB"
    let inChartColor = "#7188B1"

    function drawChart(context, width, height, R, color) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = color
  
      // rectangle
      context.fillRect(width / 2, height / 2, -R * 2, -R * 2)
  
      //triangle -2x + r = y
      context.beginPath()
      context.moveTo(width / 2, height / 2)
      context.lineTo(width / 2, height / 2 - R * 2)
      context.lineTo(width / 2 + R, height / 2)
      context.fill()
      context.closePath()
  
      //circle
      context.beginPath()
      context.moveTo(width / 2, height / 2)
      context.arc(width / 2, height / 2, 2 * R, Math.PI / 2, -Math.PI / 2)
      context.fill()
      context.closePath()

      context.font = '12px Arial';
      context.fillStyle = 'black';
      context.fillText('X', width - 10, height / 2 - 10);
      context.fillText('Y', width / 2 + 10, 10);
  
  }
    
    context.lineWidth = 2;

    let deltaY = 6
    let deltaX = 10
    context.font = "10px monospace"

    drawChart(context, width, height, R, chartColor)

    context.fillStyle = 'black'
    context.strokeStyle = 'black'


    // X axis
    context.beginPath();
    context.moveTo(0, height / 2);
    context.lineTo(width, height / 2);
    context.stroke();
    context.closePath();


    // Y axis
    context.beginPath();
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.stroke();
    context.closePath();

    // y arrow
    let length = 7
    context.beginPath();
    context.moveTo(width / 2 - length, length)
    context.lineTo(width / 2, 0)
    context.lineTo(width / 2 + length, length)
    context.fill()
    context.closePath()

    // x arrow

    context.beginPath();
    context.moveTo(width - length, height / 2 - length)
    context.lineTo(width - length, height / 2 + length)
    context.lineTo(width, height / 2)
    context.fill()
    context.closePath()

    // x text

    context.fillText('R/2', width / 2 + R, height / 2 - deltaY)
    context.fillText('R', width / 2 + R * 2, height / 2 - deltaY)

    context.fillText('-R/2', width / 2 - R - deltaX, height / 2 - deltaY)
    context.fillText('-R', width / 2 - R * 2 - deltaX, height / 2 - deltaY)

    //y text

    context.fillText('R/2', width / 2 + deltaX, height / 2 - R)
    context.fillText('R', width / 2 + deltaX, height / 2 - R * 2)

    context.fillText('-R/2', width / 2 + deltaX, height / 2 + R)
    context.fillText('-R', width / 2 + deltaX, height / 2 + R * 2)

    console.log("valuesArray: ", valuesArray);
    //console.log("stateEntries: ", stateEntries);
 

    let r = 4;

    function drawPoint(x, y, xt, yt, ctx) {
      xt = Number.parseFloat(xt);
      yt = Number.parseFloat(yt);
      let valid = validate(xt, yt, r);
      let color = '#2e2e2e';
      let colore = '#FF69B4';
      if(valid){
          colore = '#ffffff';
          color = '#FF69B4';
      }

      ctx.beginPath();
      ctx.arc(x, y, 3+1, 0, 2 * Math.PI);
      ctx.fillStyle = colore;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 3, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.font = '12px Arial';
      ctx.fillStyle = '#000000';
      ctx.fillText('('+xt+'; '+yt+')', x + 10, y);
  }

  function validate(x, y, r){
    if(r===0){
        return false;
    }
    return (x <= 0 && y <= 0 && x * x + y * y <= r * r) || (x <= 0 && y >= 0 && x >= -r && y <= r)||(x >= 0 && y >= 0 && y <= (-2) * x + r);
  }

  function drawAllPoints(context, canvas) {
    console.log("in drawAllPoints");

    if (valuesArray && valuesArray.length > 0) {
      const data = valuesArray[0];
      for (let i = 0; i < data.length; i++) {
        const currentData = data[i];
        const x = parseFloat(currentData.x);
        const y = parseFloat(currentData.y);
        const r1 = parseFloat(currentData.r);
        console.log(x, y, r1);
        drawPoint(
            x * 40 + 250,
            (-y * 40 + 250),
            x,
            y, context, canvas
        );
      }
    }
  }

    drawAllPoints(context, canvas);

  }, [valuesArray]);



  return (
    <div>
      <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ border: '1px solid black' }}
    ></canvas>

    {/* <Button type="button" onClick={clear}> Clear</Button> */}
    </div>
    
  );

};

export default ChartComponent;
