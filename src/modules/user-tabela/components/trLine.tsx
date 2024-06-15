import React from 'react';
import { DataTable } from '../@types/types';
import formatDate from '../utils/formatDate';
import isItApproved from '../utils/isItApproved';
import StarIcon from './starIcon';
import ViewIcon from './viewIcon';

export default function TrLine({ data }: { data: DataTable }) {

  const starsNumber = Array.from(Array(5).keys())

  return (
    <tr>
      <td className='name-table'>
        {data.name}
      </td>
      <td>
        {formatDate(data.date, "date")}
      </td>
      <td className='task-table'>
        {data.task}
      </td>
      <td>
        {formatDate(data.date, "hour")}
      </td>
      <td>
        {isItApproved(data.status)}
      </td>
      <td className='task-stars'>
        <div>
          {typeof data.raitingStars === "number" ? starsNumber.map(starNum => (
            <StarIcon nota={data.raitingStars} pos={starNum} key={starNum} />
          )) : "-"}
        </div>
      </td>
      <td className='obs-table'>
        {data.obs}
      </td>
      <td className='task-icon'>
        <div className='btn-view'>
          <ViewIcon />
        </div>
      </td>
    </tr>
  )
}