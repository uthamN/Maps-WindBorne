'use client'

import { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';

import darkEarth from '@/../../public/earth-dark.jpg';

const GlobeObject = {
    title: "dark earth",
    image: darkEarth
}

export default function ShowOneGlobe({ balData }) { 
    const [processedData, setProcessedData] = useState([]);

    useEffect(() => {
        processData();
    }, [balData]);

    const processData = () => {
        if (!balData || balData.length < 2) return;
        
        let temp = [];
        for (let i = 0; i < balData.length - 1; i++) {
            let o = {
                "id": balData[i].id + "hr ago",
                "startLat": balData[i].arr[0],
                "endLat": balData[i + 1].arr[0],
                "startLng": balData[i].arr[1],
                "endLng": balData[i + 1].arr[1],
            };
            temp.push(o);
        }
        setProcessedData(temp);
    };

    return (
        <div>
            <Globe
                width={'60vw'}
                height={'auto'}
                globeImageUrl={GlobeObject.image.src}
                arcsData={processedData}
                globeOffset={[-310,0]}
                arcLabel="id"
                arcStartLat="startLat"
                arcEndLat="endLat"
                arcStartLng="startLng"
                arcEndLng="endLng"
                arcAltitude={0.05}
                showGraticules={true}
                backgroundColor='rgba(255, 0, 0, 0)'
                pointOfView={{'lat': balData[0].arr[0], 'lng':balData[0].arr[1], 'altitude':12500}}
                lineHoverPrecision={1}
            />
        </div>
    );
}
