document.getElementById("btn1").addEventListener("click", loadJokes);

function loadJokes() {
  // creating a object instance
  const xhr = new XMLHttpRequest();
  // Opening file
  xhr.open("GET", "http://api.icndb.com/jokes/random/4", true);
  // Loading files
  xhr.onload = function () {
    if (this.status === 200) {
      const jokes = JSON.parse(this.responseText);
      let output = "";
      if (jokes.type === "success") {
        jokes.value.forEach((joke) => {
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        output += "Something went wrong";
      }
      document.getElementById("output").innerHTML = output;
    }
  };

  // Sending
  xhr.send();
}
