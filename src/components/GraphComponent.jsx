import React, { useRef, useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { entrySelector, selectValuesArray, setValues, clearValues} from '../slices/EntrySlice';
import EntryService from '../services/EntryService';
import { addValue } from '../slices/EntrySlice';
import { Button } from 'primereact/button';

import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"

const ChartComponent = ({ r }) => {
  const canvasRef = useRef(null);
  
  const dispatch = useDispatch();
  const username = localStorage.getItem('username');

  const [formData, setFormData] = useState({
    x: '',
    y: '',
    r: '',
  });

  const [stateEntries, setStateEntries] = useState([]);

  let entries = [];

  const [canvasClicked, setCanvasClicked] = useState(false);

  let {valuesArray} = useSelector(state => state.entry);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    let centerX = width / 2;
    let centerY = height / 2;
    let chartColor = "#87CEEB"
    let inChartColor = "#7188B1"

    let R = 100;
    if (r != 0) {
      R = r * 25;
    }

    canvas.addEventListener('click', handleClick);

    drawAllPoints(context, canvas);

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

      console.log(x, y)
      console.log(xt, yt);

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
      console.log("draw entries");
      EntryService.getEntriesByUsername(username).then((res) => {
        entries = res.data;
        for (let i = 0; i < entries.length; i++) {
          const currentData = entries[i];
          const x = parseFloat(currentData.x);
          const y = parseFloat(currentData.y);
          const r1 = parseFloat(currentData.r);
          if(r == r1){
              if(window.innerWidth<550){
                  drawPoint(
                      x * 14 + 110,
                      (-y * 14 + 110),
                      x,
                      y, context, canvas
                  );
              }else{
                  drawPoint(
                      x * 40 + 250,
                      (-y * 40 + 250),
                      x,
                      y, context, canvas
                  );
              }
          }
        }

        setStateEntries(res.data);
        console.log(stateEntries);
      });

      
      
    }

    


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

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
    


  }, [r, valuesArray]);


  const handleClick = async (event) => {
    console.log("clicked");
    const canvas = canvasRef.current;

    let mouseX = parseFloat(((event.clientX - canvas.getBoundingClientRect().left - 250) / 40).toFixed(2));
    let mouseY = parseFloat(-((event.clientY - canvas.getBoundingClientRect().top - 250) / 40).toFixed(2));

    const newFormData = {
      x: mouseX,
      y: mouseY,
      r: r,
    }

    EntryService.createEntry(newFormData, username).then(res => {
      console.log("entry created");

      const hit = res.data.hit;
      const updatedFormData = {
          ...formData,
          hit: hit
      };
      dispatch(addValue(res.data));
  });

  

  }

  const clear = async (event) => {
    console.log("clear");
    EntryService.clearEntriesForUser(username)
    .then(response => {
        console.log("Entries cleared successfully:", response);
        dispatch(clearValues());
        console.log("valuesArray:", valuesArray);

    })
    .catch(error => {
        console.error("Error clearing entries:", error);
    });
  }

  return (
  <div>
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        style={{ border: '1px solid black' }}
      ></canvas>
      <Button type="button" onClick={clear} className='clear-button'> Clear</Button>
    </div>
  </div>
  );

};

export default ChartComponent;
