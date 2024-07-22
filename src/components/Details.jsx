import React, { useEffect, useState } from "react";

const Details = ({ info }) => {
    const [detail, setDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${info.id}.json`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                setDetail(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [info]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (detail.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div className="details">
            <img className="banner" src={detail.avatar} key={detail.id} alt="banner" />
            <div className="name">{detail.name}</div>
            <div className="city">City: {detail.details.city}</div>
            <div className="company">Company: {detail.details.company}</div>
            <div className="position">Position: {detail.details.position}</div>
        </div>
    );
};

export default Details;