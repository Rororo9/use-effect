import React, { useEffect, useState } from "react";
import Details from "./Details";

const List = () => {
    const [data, setData] = useState([]);
    const [info, setInfo] = useState();

    const fetchApi = () =>
        fetch(
            "https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json"
        );
    useEffect(() => {
        fetchApi()
            .then((response) => response.json())
            .then((response) => {
                setData(response);
            });
    }, []);

    const handleClick = (e) => {
        const pick = data.find((item) => item.name === e.target.outerText);
        setInfo(pick);
        const listItemColor = document.querySelector(".list-item-color");
        if (listItemColor === null) {
            e.target.classList.add("list-item-color");
        } else {
            listItemColor.classList.remove("list-item-color");
            e.target.classList.add("list-item-color");
        }
    };

    return (
        <div className="container-result">
            <ul className="list">
                {data.map((user) => (
                    <li className="list-item" key={user.id} onClick={handleClick}>
                        {user.name}
                    </li>
                ))}
            </ul>
            {info && <Details info={info} />}
        </div>
    );
}

export default List;