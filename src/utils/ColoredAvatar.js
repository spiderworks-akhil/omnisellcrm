import React, {useEffect} from 'react';
import {green} from "@mui/material/colors";
import {Avatar} from "@mui/material";

const ColoredAvatar = (props) => {

    let bgColors = {
        a:'#55efc4',
        b:'#81ecec',
        c:'#74b9ff',
        d:'#a29bfe',
        e:'#00b894',
        f:'#00cec9',
        g:'#0984e3',
        h:'#0984e3',
        i:'#dfe6e9',
        j:'#ffeaa7',
        k:'#fab1a0',
        l:'#ff7675',
        m:'#fd79a8',
        n:'#636e72',
        o:'#fdcb6e',
        p:'#e17055',
        q:'#d63031',
        r:'#e84393',
        s:'#2d3436',
        t:'#ff9ff3',
        u:'#feca57',
        v:'#ff6b6b',
        w:'#48dbfb',
        x:'#1dd1a1',
        y:'#00d2d3',
        z:'#5f27cd',
    }
    let colors = {
        a:'#00563e',
        b:'#048787',
        c:'#0755a5',
        d:'#1a0fa9',
        e:'#015e4c',
        f:'#036c6a',
        g:'#e5f4ff',
        h:'#e5f4ff',
        i:'#080808',
        j:'#7a5e01',
        k:'#910706',
        l:'#810100',
        m:'#78002b',
        n:'#fdfdfd',
        o:'#6c4702',
        p:'#871a00',
        q:'#480000',
        r:'#60002f',
        s:'#e9e9e9',
        t:'#870076',
        u:'#463000',
        v:'#6e0000',
        w:'#036074',
        x:'#00543e',
        y:'#006666',
        z:'#e0d3f9',
    }
    useEffect(()=>{
        console.log(bgColors[props.letter.toString().toLocaleLowerCase()])
    },[])
    return (
        <Avatar
            sx={{
                bgcolor: bgColors[props.letter.toString().toLocaleLowerCase()],
                color: colors[props.letter.toString().toLocaleLowerCase()]
            }}
            alt="Closed"
            src="/broken-image.jpg"
        >
            {props.letter}
        </Avatar>
    );
};

export default ColoredAvatar;
