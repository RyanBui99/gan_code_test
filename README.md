# GAN Integrity backend code challenge

The script `index.js` uses a local api to perform various operations on a set of cities. Your task is to implement an api so that the script runs successfully all the way to the end.

Run `npm install` and `npm run start` to start the script.

(For docker users, run `docker-compose build` and `docker-compose up -d`)

Your API can load the required data from [here](addresses.json).

In the distance calculations, you can assume the earth is a perfect sphere and has a radius is 6371 km.

Once you are done, please provide us with a link to a git repo with your code, ready to run.

# Reflecction

I chose to go with an express as I am assuming that you will use a framework on top of Node.js. The use of Docker is to make sure that you can run the app despite which Node version you have installed but also because the job description highlighted it as a plus :).

I value structure and readability since I strive to make my code as understandable as possible for my team members. So my approach was trying to set up a clear structure.

The first 3 test cases were straight forward.

The 4th (and 5th) test case was more tricky, but ended up in a solution where I broke it down like this:

1.  initialize memory cache with guid as key which should store status - to know where we are in the procces and citites.
    1.a find the cities async to prevent blockers.
    1.b return result uri to client
2.  method to find cities
3.  check memory cache for given guid and return cities depending on the status

The 6th was also straight forward.
