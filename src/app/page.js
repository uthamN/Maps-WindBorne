'use client'

import "@/app/style.css";
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'
import TotalInfo from "@/components/info";
import dynamic from "next/dynamic";

const ShowAllGlobe =  dynamic(() => import('@/components/globe.js'), {
  ssr: false, 
});

export default function Home() {

  const [balData, setBalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);
  const [invalidBal, setIvalidBal] = useState(0);
  const url = 'https://a.windbornesystems.com/treasure/';

  

  useEffect(() => {
    setLoading(true)
    console.log(window.location.href);
    const width = window.innerWidth;
    console.log(width);
    if (show) {
        getData();
        console.log('running');
    }
  }, [show]);

  useEffect(() => {
    // console.log('Updated balData:', balData); 
  }, [balData]);

  useEffect(() => {
    // console.log('Updated invalidBal:', invalidBal); 
  }, [invalidBal]);

  async function getData() {
    console.log('Fetching data...');
    try {
        let rawData = "";

        for (let i = 0; i < 24; i++) {
            let ic = i < 10 ? '0' + i : i;

            const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}${ic}.json`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin":"*"

                }
            });

            if (response.status !== 200) {
                continue;
            } 

            const text = await response.text();
            const cleanedText = text.replace(/NaN/g, 'null');

            try {
                rawData = JSON.parse(cleanedText);
            } catch (e) {
                continue;
            }
            break;
        }        
        
        manageData(rawData);

    } catch (e) {
        console.error("Error fetching or processing data:", e);
    }
}


  const manageData = (data) => {
      const temp = [];
      let inv = 0;

      for (let i = 0; i < data.length; i++) {
          if (data[i][0] == null || data[i][1] == null || data[i][2] == null) {
              console.warn('Skipping invalid entry:', data[i]);
              inv +=1;
              continue;
          }

          const o = {
              lat: data[i][0],
              lng: data[i][1],
              alt: data[i][2],
              color: "white",
              name: i
          };

          temp.push(o);
      }

      setBalData(temp);
      setIvalidBal(inv);
      setLoading(false);
  };


  if (loading) {
    return (
      <div>
        Loading
      </div>
    )
  } else {
    return (
      <div>
        <div className="main">
          <div className="main_left">
            <ShowAllGlobe balData={balData}/>
          </div>
          <div className="main_right">
            <TotalInfo tb={balData.length} inv={invalidBal} />
          </div>
        </div>
      </div>
    );
  }
  
}
