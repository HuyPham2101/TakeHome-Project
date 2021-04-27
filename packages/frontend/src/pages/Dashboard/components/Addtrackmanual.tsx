import { TextField } from '@material-ui/core';
import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import {InputContainer} from "../../../components/Input"

export const AddtrackingManual: React.FC<{
  afterSubmit: () => void;
}> = ({ afterSubmit}) => {
  const [values, setValues] = useState({
    description: '',
    startTime:'' ,
    endTime: '',
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch(`/tracking`, {
      body: JSON.stringify({
        ...values,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    afterSubmit();
  };

  return (
    <>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
        onSubmit={onSubmitForm}
      >
        <InputContainer name="description" type="text" onChange={fieldDidChange} value={values.description} />
        <label htmlFor="startTime">startTime</label>
        <TextField
          placeholder="00:00:00"
          id="startTime"
          name="startTime"
          type="text"
          onChange={fieldDidChange}
          value={values.startTime}
          inputProps={{ maxLength: 8 }}
          required={true}
        />
        <label htmlFor="endTime">endTime</label>
        <TextField
          placeholder="00:00:00"
          id="endTime"
          name="endTime"
          type="text"
          onChange={fieldDidChange}
          value={values.endTime}
          inputProps={{ maxLength: 8 }}
          required={true}
        />
        <Button type="submit">Add Tracking </Button>
      </form>
    </>
  );
};
