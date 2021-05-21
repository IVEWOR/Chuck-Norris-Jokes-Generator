document.getElementById("form").addEventListener("submit", loadJokes);

function loadJokes(e, number, firstName, lastName) {
  // creating a object instance
  const xhr = new XMLHttpRequest();

  // Event Listeners
  number = document.getElementById("number").value;
  firstName = document.getElementById("firstName").value;
  lastName = document.getElementById("lastName").value;

  number = number.length > 0 ? number : 5;
  firstName = firstName.length > 0 ? firstName : "Chuck";
  lastName = lastName.length > 0 ? lastName : "Norris";

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
          output += `<li class="list-group-item d-flex justify-content-between align-items-start">
          <div class="ms-2 me-auto joke">${joke.joke}</div>
          <span class="badge rounded-pill btn btn-primary btn-sm">Copy</span>
          </li>`;
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

// Copy text

class Copy {
  copyText = (target) => {
    if (target.tagName === "SPAN") {
      navigator.clipboard.writeText(
        target.parentElement.firstElementChild.textContent
      );
      // Give feedback
      target.textContent = "Copied!";
      setTimeout(() => {
        target.textContent = "Copy";
      }, 3000);
    }
  };
}

document
  .getElementById("output")
  .addEventListener("click", function copyToClipboard(e) {
    const copy = new Copy();
    copy.copyText(e.target);
  });
