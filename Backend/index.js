const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/trains", async (req, res) => {
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
  res.send(response.data);
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
