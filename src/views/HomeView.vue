<template>
  <div class="main">
    <div class="card">
      <div class="search"></div>
      <div class="weather loading">
        <h2 class="city">Weather in {{ city }}</h2>
        <div class="ms-5">
          <h1 class="temp">{{ tempr }}°C</h1>

          <div class="flex"></div>

          <div class="humidity">Humidity: {{ humd }}%</div>
          <div class="wind">Wind speed: {{ speed }} km/h</div>
        </div>
        <h2 class="city">Time in {{ city }}</h2>
        <div>
          <h4 class="ms-5">{{ timestamp }}</h4>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="card1">
        <img
          src="https://openweathermap.org/img/wn/04n.png"
          alt="weathericon"
          class="icon1"
        />
        <h2 class="temp1">{{ temps1 }}°C</h2>
      </div>
      <div class="card1">
        <img
          src="https://openweathermap.org/img/wn/04n.png"
          alt="weathericon"
          class="icon2"
        />
        <h2 class="temp2">{{ temps2 }}°C</h2>
      </div>
      <div class="card1">
        <img
          src="https://openweathermap.org/img/wn/04n.png"
          alt="weathericon"
          class="icon3"
        />
        <h2 class="temp3">{{ temps3 }}°C</h2>
      </div>
      <div class="card1">
        <img
          src="https://openweathermap.org/img/wn/04n.png"
          alt="weathericon"
          class="icon4"
        />
        <h2 class="temp4">{{ temps4 }}°C</h2>
      </div>
      <div class="card1">
        <img
          src="https://openweathermap.org/img/wn/04n.png"
          alt="weathericon"
          class="icon5"
        />
        <h2 class="temp5">{{ temps5 }}°C</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiKey: "f69a2ef29064a2c89d2de93e09e1ed50",
      xhttp: "",
      parser: "",
      xmlDoc: "",
      Url: "",
      city: "",
      xml_response: "",
      data_weather: "",
      tempr: "",
      humd: "",
      speed: "",
      temps1: "",
      temps2: "",
      temps3: "",
      temps4: "",
      temps5: "",
      timestamp: "",
    };
  },
  mounted() {
    this.displayWeather();
    this.getNow();
  },
  methods: {
    getNow() {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    },

    fetchWeather() {
      this.xhttp = new XMLHttpRequest();

      /// *** RESPOSNS DATA IN XML FORMAT ****////

      this.Url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        this.$store.state.latt +
        "&lon=" +
        this.$store.state.lann +
        "&mode=xml&units=metric&appid=f69a2ef29064a2c89d2de93e09e1ed50";

      this.xhttp.open("GET", this.Url, true);
      this.xhttp.send();

      this.xhttp.onreadystatechange = function () {
        // if any error.
        if (this.readyState == 0 || this.status == 404 || this.status == 403) {
          alert("please write the country name correctly 😐");
        }

        if (this.readyState == 4 && this.status == 200) {
          this.xml_response = this.responseText;

          // *** XML FORMAT ///

          //parsing xml file
          this.parser = new DOMParser();
          this.xmlDoc = this.parser.parseFromString(
            this.xml_response,
            "text/xml"
          );
          //console.log(xmlDoc);

          // var speed =xmlDoc.getElementsByTagName('speed')[0].getAttribute('value');
          // console.log(speed);
        }
      };
    },

    displayWeather() {
      console.log("khkh");

      this.forcasthWeather();
    },
    forcasthWeather() {
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
          this.$store.state.latt +
          "&lon=" +
          this.$store.state.lann +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => response.json())
        .then((data) => this.displayF(data))

        .catch(() =>
          alert("Something Went Wrong:Check Your Internet Coneciton")
        );
    },
    displayF: function (data) {
      this.data_weather = data;
      //console.log(this.data_weather.city.name);
      this.city = this.data_weather.city.name;
      this.tempr = this.data_weather.list[0].main.temp;
      this.humd = this.data_weather.list[0].main.humidity;
      this.speed = this.data_weather.list[0].wind.speed;
      this.temps1 = this.data_weather.list[1].main.temp;
      this.temps2 = this.data_weather.list[2].main.temp;
      this.temps3 = this.data_weather.list[3].main.temp;
      this.temps4 = this.data_weather.list[4].main.temp;
      this.temps5 = this.data_weather.list[5].main.temp;
    },
  },
};
</script>

<style scoped>
.main {
  padding: 4%;
  align-items: center;
  height: 100vh;
  margin: 0;
  font-family: "Open Sans", sans-serif;
  background: #222;
  background-image: url("https://source.unsplash.com/1600x900/?landscape");
  background-size: cover;
  font-size: 120%;
}

.card {
  background: #000000d0;
  color: white;
  padding: 2em;
  border-radius: 30px;
  width: 100%;
  max-width: 420px;
  margin: auto;
}

.search {
  display: flex;
  align-items: center;
  justify-content: center;
}

button {
  margin: 0.5em;
  border-radius: 50%;
  border: none;
  height: 44px;
  width: 44px;
  outline: none;
  background: #7c7c7c2b;
  color: white;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

input.search-bar {
  border: none;
  outline: none;
  padding: 0.4em 1em;
  border-radius: 24px;
  background: #7c7c7c2b;
  color: white;
  font-family: inherit;
  font-size: 105%;
  width: calc(100% - 100px);
}

button:hover {
  background: #7c7c7c6b;
}

h1.temp {
  margin: 0;
  margin-bottom: 0.4em;
}

.flex {
  display: flex;
  align-items: center;
}

.description {
  text-transform: capitalize;
  margin-left: 8px;
}

.weather {
  display: block;
  color: white;
}
.container {
  display: flex;
  justify-content: space-evenly;
  margin-top: 5%;
}
.card1 {
  background: #000000d0;
  color: white;
  text-align: center;
  padding: 1rem;
  border-radius: 30px;
  width: 10rem;
  height: 9rem;
}
</style>
