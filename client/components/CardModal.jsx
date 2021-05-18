import React from 'react';

export default function CardModal() {
  console.log('CardModal is open');
    return (
      <div>
        <form>
          <input placeholder='Company Name'></input>
          <input placeholder='Job Title'></input>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    )
}