'use client';

import { useEffect, useState } from "react";
import React from "react";
// import ShowOneGlobe from "./components/globe";
import '@/app/style.css';
import SingleInfo from "./components/info";

import dynamic from "next/dynamic";

const ShowOneGlobe =  dynamic(() => import('@/app/[balId]/components/globe.js'), {
  ssr: false, 
});

export default function BalloonDataPage({ params }) {
    const { balId } = React.use(params);

    const url = 'https://cors-anywhere.herokuapp.com/https://a.windbornesystems.com/treasure/';
    const [loading, setLoading] = useState(true);
    const [uncleanData, setUncleanData] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        setLoading(true);
        getData();
    }, []);

    useEffect(() => {
        // console.log('Updated uncleanData:', uncleanData);
    }, [uncleanData]);

    useEffect(() => {
        // console.log('Updated uncleanData:', uncleanData);
    }, [data]);

    useEffect(() => {
        cleanData();
    }, [uncleanData]); 
    

    const getData = async () => {
        const temp = [];
        try {
            for (let i = 0; i < 24; i++) {
                let ic = (i >= 0 && i < 10) ? '0' + i : i;
                
                const response = await fetch(`${url}${ic}.json`);
                if (response.status !== 200) {
                    console.log(`${response.status} fetching ${i}.json`);
                    temp.push({ 'arr': [null, null, null], 'id': i });
                    continue;
                }

                const text = await response.text();

                try {
                    let cleanedText = text.replace(/NaN/g, 'null');

                    if (cleanedText[0] !== '[') {
                        cleanedText = '[' + cleanedText;
                    }
                    if (cleanedText[cleanedText.length - 1] !== ']') {
                        cleanedText = cleanedText + ']';
                    }

                    let rawData = null;
                    try {
                        rawData = JSON.parse(cleanedText);
                    } catch (e) {
                        console.error(`Error parsing JSON for ${i}.json:`, e);
                        temp.push({ 'arr': [null, null, null], 'id': i });
                        continue;
                    }

                    if (balId && rawData[balId]) {
                        temp.push({ 'arr': rawData[balId], 'id': i });
                    } else {
                        temp.push({ 'arr': [null, null, null], 'id': i });
                    }
                } catch (e) {
                    console.error(`Error parsing JSON for ${i}.json:`, e);
                    console.error('Invalid JSON content:', text);
                    temp.push({ 'arr': [null, null, null], 'id': i });
                }
            }

            setUncleanData(temp);
            setLoading(false);
        } catch (e) {
            console.error("Error fetching data:", e);
            setLoading(false); 
        }
    };

    const cleanData = () => {
        const cleanData = uncleanData.filter(item => item.arr[0] != null ||
            item.arr[1] != null ||
            item.arr[2] != null);
        setData(cleanData);
    };


    return (
        <div>
            <div className="main">
                <div className="main_left">
                    {!loading && data.length > 0 ? (
                        <ShowOneGlobe balData={data} />
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                <div className="main_right">
                    {!loading && data.length > 0 ? (
                        <SingleInfo info={uncleanData} />
                    ) : (
                        <div>Loading...</div>
                    )
                    }
                </div>
            </div>
        </div>
    );
}