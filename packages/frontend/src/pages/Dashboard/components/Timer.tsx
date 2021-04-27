import React, { useEffect, useState } from 'react';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { IconButton } from '@material-ui/core';
import { green, red, blue } from '@material-ui/core/colors';
import StopIcon from '@material-ui/icons/Stop';
import { Modal } from '../../../components/Modal';
import { Addtracking } from './Addtracking';
import styled from 'styled-components';

const TimerDiv = styled.div`
    display:flex;
    justify-content:center;
    height:300px;
`;

const ActivityBox = styled.div`
        
  
`;
const Head2 = styled.h2 `
text-align: center;
font-size : 400%;

`
export const Timer : React.FC<{ aftersubmit: () => void }> =  ({ aftersubmit }) =>{
  const [endTime, setEndTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [second, setSecond] = useState('00');
  const [minute, setMinute] = useState('00');
  const [hour, setHours] = useState('00');
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [addTrack, setAddtrack] = useState(false);
  useEffect(() => {
    let intervalId :any

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);
        const hourCounter = Math.floor(counter / 3600);
        const stringsecond = secondCounter.toString();
        const stringminute = minuteCounter.toString();
        const stringhour = hourCounter.toString();
        const computedSecond = stringsecond.length === 1 ? `0${stringsecond}` : stringsecond;
        const computedMinute = stringminute.length === 1 ? `0${stringminute}` : stringminute;
        const computedHour = stringhour.length === 1 ? `0${stringhour}` : stringhour;

        setSecond(computedSecond);
        setMinute(computedMinute);
        setHours(computedHour);
        setCounter((counter) => counter + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isActive, counter]);
  /**
   * StopandAdd create a end timestamps and submit to the databases
   * Cannot be paused during the counting. when pause just create a new tracking to the task
   */
  const StopandAdd = () => {
    setIsActive(false);
    const endtime = new Date().toTimeString();
    setEndTime(endtime);
    setAddtrack(true);
  };
  /**
   * Start create a start timestamp when there is none existed and begin to count at 1 second.
   */
  const startCount = () => {
    setIsActive(true);
    if(startTime === ''){
      const timestart = new Date().toTimeString();
      setStartTime(timestart);
      setCounter(1);     
    }else{
      setStartTime(startTime)
    }
  };
  /**
   * Reset reset all to 0.
   */
  const resetCount = () => {
    setStartTime('')
    setIsActive(false);
    setSecond('00');
    setMinute('00');
    setHours('00');
    setCounter(0);
  };
  return (
    <TimerDiv>
         {addTrack && (
        <Modal
          title="Save Tracking"
          onCancel={() => {
            setAddtrack(false);
          }}
        >
          <Addtracking
            afterSubmit={() => {
            aftersubmit();
              setAddtrack(false);
              resetCount();
            }}
            hour={hour}
            minut={minute}
            second={second}
            endtime={endTime}
            starttime={startTime}
          />
        </Modal>
      )}
        <ActivityBox>
        
        {!isActive ? (
            <IconButton data-testid="StartTime" size="medium" color="primary" onClick={startCount}>
            <PlayCircleFilledWhiteIcon style={{ color: green[500], fontSize: '120' }} />
            </IconButton>
        ) : (
            <IconButton data-testid="StopTime" size="medium" color="primary" onClick={StopandAdd}>
            <StopIcon style={{ color: red[500], fontSize: '120' }} />
            </IconButton>
        )}
        <IconButton onClick={resetCount}>
            <RotateLeftIcon style={{ color: blue[700], fontSize: '120' }} />
        </IconButton>
        <Head2>
            {hour}:{minute}:{second}
        </Head2>
        </ActivityBox>
    </TimerDiv>
  );
};
