# Maps
This project is created using the data provided by WindBorne. This application shows the location of all the balloons around the world by WindBorne, one can access the trajectory of any balloon by clicking on it, also the location of the balloon over the last 24 hours is presented.

The application is deployed: [Link to Maps](https://maps-d31zm0zyv-uthams-projects-d19d9bb6.vercel.app/)

**NOTE**
This application uses [CORS anywhere](https://cors-anywhere.herokuapp.com/) to avoid CORS error, so if you see a blank globe its a good chance that you need to visit this website and click on get access button.


Also this project is developed using [Next.js](https://nextjs.org).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## What it does
Imagine a network of balloons soaring across the Earth, gathering data as they drift through the skies. Our system fetches and displays the latest positions of these balloons in real-time. By selecting a balloon, users can unlock a treasure trove of information, including:

 - Its exact coordinates over the past 24 hours.
 - The distance traveled during that period.
 - The locations it has passed over, whether land or sea.

 ## How it Works
Click on a balloon to view its last 24 hours of movement.(They are those white dots on the globe on the left. Hover on them to get the balloon id)

 - Check detailed location data and visualize the journey.
 - All flights are displayed on an interactive 3D globe.
 - If certain balloon positions are unavailable, the system informs users about potential data gaps.
 - Additionally, you can also play with the globe on the left!

 ## But Why?
  This system is more than just a visualization tool; it represents a powerful insight into atmospheric movement, research, and global tracking technologies. Whether you're an enthusiast, a researcher, or simply curious, the Balloon Data System provides a unique window into the world above us.
  Aside from that, I recently learnt about a library to represent something on a globe, wanted to use that. A lot of learning and fun!

  ## Some Screenshots of the application
  ![alt text](http://url/to/img.png)
  ![alt text](http://url/to/img.png)