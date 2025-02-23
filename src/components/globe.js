'use client'

import { useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import Image from "next/image";
import { useRouter } from 'next/navigation'


import darkEarth from '@/../../public/earth-dark.jpg';

const GlobeObject = {
    title: "dark earth",
    image: darkEarth
}


export default function ShowAllGlobe(props) {

    const [balData, setBalData] = useState(props.balData);
    const router = useRouter()

    useEffect(() => {
        console.log('rendering show all balloons page');
    }, []);


    const navigateTo = (id) => {
        console.log('navigating to: ' + id.name)
        router.push(`/${id.name}`)
    }

    return (
        <div >
            <Globe
            width={'60vw'}
            height={'auto'}
            globeImageUrl= {GlobeObject.image.src}
            pointAltitude= {0.001}
            pointColor= "color"
            globeOffset={[-310,0]}
            backgroundColor='rgba(255, 0, 0, 0)'
            showGraticules= {true}
            pointsData={balData}
            pointLabel= "name"
            pointsMerge = {false}
            onPointClick={navigateTo}
            />
        </div>
    );

}
