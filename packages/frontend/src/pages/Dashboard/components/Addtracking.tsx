import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/Button';
import {InputContainer} from "../../../components/Input"

export const Addtracking: React.FC<{
  afterSubmit: () => void;
  hour: string;
  minut: string;
  second: string;
  endtime: string;
  starttime: string;
}> = ({ afterSubmit,hour, minut, second, endtime, starttime }) => {
  const [values, setValues] = useState({
    description: '',
    startTime: starttime,
    endTime: endtime,
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
        <h2>
          {hour}:{minut}:{second}
        </h2>
        <Button type="submit">Add Tracking </Button>
      </form>
    </>
  );
};
