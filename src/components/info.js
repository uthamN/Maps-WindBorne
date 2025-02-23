'use client';
import { useEffect, useState } from "react";

export default function TotalInfo(props) {

    const [ab, setAb] = useState(0);

    useEffect(()=> {
        setAb(props.tb - props.inv);
    }, []);
    

    return (
        <div className="container">            
            <div className="title">Balloon Data System </div>

            <div className="distance_display">
                <p>Welcome to the Balloon Data System, your window into the movement of balloons across the globe!  
                   Track their journey, explore their flight paths, and discover the places they’ve passed over.</p>
            </div>

            <div className="usage">
                <h3>What it does</h3>
                <p>Imagine a network of balloons soaring across the Earth, gathering data as they drift through the skies. 
                    Our system fetches and displays the latest positions of these balloons in real-time. By selecting a balloon,
                     users can unlock a treasure trove of information, including:</p><br></br>
                <ul>
                    <li>Its exact coordinates over the past 24 hours.</li>
                    <li>The distance traveled during that period.</li>
                    <li>The locations it has passed over, whether land or sea.</li>
                </ul>
            </div>

            <div className="usage">
                <h3>How It Works</h3>
                <ul>
                    <li>Click on a balloon to view its last 24 hours of movement.(They are those white dots on the globe on the left. Hover on them to get the balloon id)</li>
                    <li>Check detailed location data and visualize the journey.</li>
                    <li>All flights are displayed on an interactive 3D globe.</li>
                    <li> If certain balloon positions are unavailable, the system informs users about potential data gaps.</li>
                    <li>Additionally, you can also play with the globe on the left!</li>
                </ul>
            </div>

            <div className="stats">
                <h3>Live Balloon Statistics</h3>
                <div className="stats-container">
                    <div className="stat-card available">
                        <h2>{ab}</h2>
                        <p>Active Balloons</p>
                    </div>
                    <div className="stat-card unavailable">
                        <h2>{props.inv}</h2>
                        <p>Data Unavailable</p>
                    </div>
                    <div className="stat-card unavailable">
                        <h2>{props.tb}</h2>
                        <p>Total Balloons</p>
                    </div>
                </div>
            </div>

            <div className="why">
                <h3>But Why???</h3>
                <p>This system is more than just a visualization tool; it represents a powerful insight into atmospheric movement, 
                    research, and global tracking technologies. Whether you're an enthusiast, a researcher, or simply curious, 
                    the Balloon Data System provides a unique window into the world above us.</p><br></br>
                <p>Aside from that, I recently learnt about a library to represent something on a globe, wanted to use that. 
                    A lot of learning and fun!</p>
            </div>

            <div className="why">Where will the wind take them next? Track and explore now!</div>

            
        </div>
    );
}
