import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import EntryService from '../services/EntryService.js';
import { addValue } from '../slices/EntrySlice.js';

const ChartComponent = () => {
    const dispatch = useDispatch();
    const canvasRef = useRef(null);
    const {valuesArray} = useSelector(
        state => state.entry
    );
    const [formData, setFormData] = useState({
        x: '',
        y: '',
        r: '',
        token: localStorage.getItem('token')
    });

    const r = 4;



    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        drawG(r, ctx, canvas);

        for (let i = 0; i < valuesArray.length; i++) {
            const currentData = valuesArray[i];
            const x = parseFloat(currentData.x);
            const y = parseFloat(currentData.y);
            const r1 = parseFloat(currentData.r);
            if(r==r1){
                if(window.innerWidth<550){
                    drawPointe(
                        x * 14 + 110,
                        (-y * 14 + 110),
                        x,
                        y, ctx, canvas
                    );
                }else{
                    drawPointe(
                        x * 40 + 250,
                        (-y * 40 + 250),
                        x,
                        y, ctx, canvas
                    );
                }
            }
          
        }
    }, [r, valuesArray]);

    
    const handleClick = (event) => {
        const canvas = canvasRef.current;

        let mouseX = parseFloat(((event.clientX - canvas.getBoundingClientRect().left - 250) / 40).toFixed(2));
        let mouseY = parseFloat(-((event.clientY - canvas.getBoundingClientRect().top - 250) / 40).toFixed(2));

        const newFormData = {
          x: mouseX,
          y: mouseY,
          r: 4,
        }
    
        EntryService.createEntry(newFormData).then(res => {
          console.log("entry created");
          dispatch(addValue(newFormData));
          
        });

    };


    function drawG(r, ctx, canvas){
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

      context.lineWidth = 2;

      let deltaY = 6
      let deltaX = 10
      context.font = "10px monospace"

      

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
    }


    function drawPointe(x, y, xt, yt, ctx) {
        xt = Number.parseFloat(xt);
        yt = Number.parseFloat(yt);
        let kode = validate(xt, yt, r);
        let color = '#2e2e2e';
        let colore = '#FF69B4';
        if(kode){
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
        return ((x >= 0 && y <= 0) && (y >= x/2 - r/2)) || ((x >= 0 && y >= 0) && (x <= r && y <= r))||(x <= 0 && y >= 0) && (x*x + y*y <= r*r/4);

    }

    return (
            <canvas
                ref={canvasRef}
                width={150}
                height={150}
                onClick={handleClick}
            ></canvas>
    );
};

export default ChartComponent;