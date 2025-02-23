'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Haversine formula to calculate distance
const haversineDistance = (lat1, lon1, lat2, lon2) => {
    if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) return 0;

    const R = 6371; // Earth's radius in km
    const toRad = (deg) => deg * (Math.PI / 180);

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
};

export default function SingleInfo({ info }) {
    const [data, setData] = useState(info);
    const [loading, setLoading] = useState(true);
    const [locData, setLocData] = useState([]);
    const router = useRouter();

    const url = 'https://nominatim.openstreetmap.org/reverse?';

    useEffect(() => {
        getDataLocations();
    }, [data]);

    const goBack = () => router.push('/');

    const getDataLocations = async () => {
        let tempLocData = [];

        try {
            for (let i = 0; i < data.length; i++) {
                if (!data[i].arr[0] || !data[i].arr[1]) {
                    tempLocData.push('No coordinate data available');
                    continue;
                }

                const response = await fetch(`${url}lat=${data[i].arr[0]}&lon=${data[i].arr[1]}&format=json`);
                const res = await response.json();
                tempLocData.push(res.display_name || 'No data available. Possibly over an ocean!');
            }

            setLocData(tempLocData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotalDistance = () => {
        let totalDistance = 0;
        for (let i = 0; i < data.length - 1; i++) {
            totalDistance += haversineDistance(data[i].arr[0], data[i].arr[1], data[i + 1].arr[0], data[i + 1].arr[1]);
        }
        return totalDistance.toFixed(2);
    };

    return (
        <div className="container">
            <button className="back-button" onClick={goBack}>⬅ Back</button>
            <h2 className="table-title">Balloon Data in the Last 24 Hours</h2>

            <div className="distance_display">
                <p>
                You are currently seeing path how the balloon you selected flew over the last 24 hours. 
                It sure was a long journey!!! Now you can hover over the arc on the globe on your left, it will 
                show you when the balloon was actually there. Further statistics on this journey will be displayed below.
                <br></br><br></br>
                Meanwhile you can play around with the globe (It rotates!!!)
                </p>
            </div>


            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p className="loading-text">Loading... <br /> This might take a moment. <br /> Trust me, this works!!!</p>
                </div>

            ) : (
                <>
                    <div className="distance_display">
                        <p>
                            The balloon started was at <span className="highlights"> {locData[23]}</span>, 24 hours ago. Over one day, 
                            it travelled around <span className="highlights">{calculateTotalDistance()}km </span> and reached 
                            <span className="highlights"> {locData[0]}</span>, where it is currently present. You can get more 
                            detailed info from the table below
                        </p>
                    </div>

                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Time (Hours Ago)</th>
                                    <th>Latitude</th>
                                    <th>Longitude</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index}h ago</td>
                                        <td>{item.arr[0] !== null ? item.arr[0].toFixed(6) : "N/A"}</td>
                                        <td>{item.arr[1] !== null ? item.arr[1].toFixed(6) : "N/A"}</td>
                                        <td>{locData[index] || "Fetching..."}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
}
