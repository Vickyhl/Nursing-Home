import React, { useState, useEffect } from "react";
import { useHttpClient } from "../../src/shared/hooks/http-hook.js";
import "./bloodStatus.css";

const BloodStatus = (props) => {
  const [data, setData] = useState([]);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/data`);
        console.log(responseData);

        setData(responseData);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);

  return (
    <table>
      <thead>
        <tr>
          <th>type</th>
          <th>amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.type}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BloodStatus;
