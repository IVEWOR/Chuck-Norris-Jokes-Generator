document.getElementById("form").addEventListener("submit", loadJokes);

function loadJokes(e, number = 5, firstName = "Chuck", lastName = "Norris") {
  // creating a object instance
  const xhr = new XMLHttpRequest();

  // Event Listeners
  number = document.getElementById("number").value;
  firstName = document.getElementById("firstName").value;
  lastName = document.getElementById("lastName").value;

  // Opening file
  xhr.open(
    "GET",
    `http://api.icndb.com/jokes/random/${number}?firstName=${firstName}&lastName=${lastName}`,
    true
  );

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

  e.preventDefault();
}
