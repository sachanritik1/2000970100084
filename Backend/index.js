const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/trains/sort/:sortBy/:coach", async (req, res) => {
  const data = {
    companyName: "Straindules",
    clientID: "5a9052cc-f989-4980-b532-b9824e37c08e",
    ownerName: "Ritik",
    ownerEmail: "ritiksachan927@gmail.com",
    rollNo: "2000970100084",
    clientSecret: "wUhuIAVSudzskSci",
  };
  const authApiResponse = await axios.post(
    "http://20.244.56.144/train/auth",
    data
  );

  const authToken = authApiResponse.data.access_token;

  const response = await axios.get("http://20.244.56.144/train/trains", {
    headers: { Authorization: "Bearer " + authToken },
  });

  //trains with departure time less than 30 minutes are ignored

  const trains = response.data.filter((train) => {
    if (date(train.departureTime) > 30 * 60 * 1000) {
      return true;
    }
    return false;
  });

  //sorting based upon price(AC, sleeper), seatsAvailable(AC, sleeper) and departure time

  const sortBy = req.params.sortBy;
  const coach = req.params.coach;
  if (sortBy === "price") {
    trains.sort((a, b) => {
      if (coach === "AC") return a.price.AC - b.price.AC;
      else return a.price.sleeper - b.price.sleeper;
    });
  }
  if (sortBy === "seatsAvailable") {
    trains.sort((a, b) => {
      if (coach === "AC") return b.seatsAvailable.AC - a.seatsAvailable.AC;
      else return b.seatsAvailable.sleeper - a.seatsAvailable.sleeper;
    });
  }

  function date(timeObject) {
    const { Hours = 0, Minutes = 0, Seconds = 0 } = timeObject;
    const hoursInMilliseconds = Hours * 60 * 60 * 1000;
    const minutesInMilliseconds = Minutes * 60 * 1000;
    const secondsInMilliseconds = Seconds * 1000;
    return hoursInMilliseconds + minutesInMilliseconds + secondsInMilliseconds;
  }

  if (sortBy === "departure") {
    trains.sort((a, b) => {
      return date(b.departureTime) - date(a.departureTime);
    });
  }

  res.send(trains);
});

app.get("/trains/:trainNumber", async (req, res) => {
  const trainNumber = req.params.trainNumber;
  const data = {
    companyName: "Straindules",
    clientID: "5a9052cc-f989-4980-b532-b9824e37c08e",
    ownerName: "Ritik",
    ownerEmail: "ritiksachan927@gmail.com",
    rollNo: "2000970100084",
    clientSecret: "wUhuIAVSudzskSci",
  };
  const authApiResponse = await axios.post(
    "http://20.244.56.144/train/auth",
    data
  );

  const authToken = authApiResponse.data.access_token;

  const response = await axios.get(
    "http://20.244.56.144/train/trains/" + trainNumber,
    {
      headers: { Authorization: "Bearer " + authToken },
    }
  );
  res.send(response.data);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}....`);
});
