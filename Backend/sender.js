const url = "http://20.244.56.144/train/auth"; // Replace with Server B's IP address
const data = {
  companyName: "Straindules",
  clientID: "5a9052cc-f989-4980-b532-b9824e37c08e",
  ownerName: "Ritik",
  ownerEmail: "ritiksachan927@gmail.com",
  rollNo: "2000970100084",
  clientSecret: "wUhuIAVSudzskSci",
};

const sendRequest = (url, data = {}, { headers } = {}) => {
  return axios.post(url, data);
};

module.exports = sendRequest;
