import React from "react";

import style from "./SchedulesTable.module.scss";
import Button from "../button/Button";

const SchedulesTable = (props) => {
  return (
    <div>
      <div className={style["table-wrapper"]}>
        <h1>{props.title}</h1>
        <div className={style.wrapper}>
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.elements.map((element) => {
                return (
                  <tr key={element.ID_Class}>
                    <td>{element.Class_no}</td>
                    <td>{element.Year}</td>
                    {props.userLoggedIn ? (
                      <td>
                        <Button
                          onClick={() => props.actions[0][1](element)}
                          text={props.actions[0][0]}
                        />
                        <Button
                          onClick={() => props.actions[1][1](element)}
                          text={props.actions[1][0]}
                        />
                        <Button
                          onClick={() => props.actions[2][1](element)}
                          text={props.actions[2][0]}
                        />
                      </td>
                    ) : (
                      <td>
                        <Button
                          onClick={() => props.actions[1][1](element)}
                          text={props.actions[1][0]}
                        />
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SchedulesTable;
