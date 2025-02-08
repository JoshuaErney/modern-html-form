// Get references to the form fields
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const usernameInput = document.getElementById("username");

// Function to generate and display clickable username suggestions
function generateUsernameSuggestions() {
  const firstName = firstNameInput.value.trim().toLowerCase();
  const lastName = lastNameInput.value.trim().toLowerCase();
  const username = usernameInput.value.trim();
  let suggestions = [];

  if (username) {
    // Hide suggestions if username input is not empty
    const usernameHelp = document.getElementById("usernameHelp");
    if (usernameHelp) {
      usernameHelp.innerHTML = "";
    }
    return;
  }

  if (firstName && lastName) {
    // Suggested username options
    suggestions = [
      `${firstName.charAt(0)}${lastName}`, // First initial + last name
      `${firstName}.${lastName}`, // First name + dot + last name
      `${firstName}${lastName.charAt(0).toUpperCase()}`, // First name + first initial of last name
      `${firstName}${lastName.length}`, // First name + length of last name
      `${firstName}${lastName}${Math.floor(Math.random() * 100)}`, // Full name + random number
    ];

    // Clear existing suggestions
    const usernameHelp = document.getElementById("usernameHelp");
    if (usernameHelp) {
      usernameHelp.innerHTML = "";

      // Add "Recommended Usernames:" text
      const smallText = document.createElement("small");
      smallText.textContent = "Recommended options: ";
      usernameHelp.appendChild(smallText);

      // Create clickable suggestions
      suggestions.forEach((suggestion) => {
        const suggestionSpan = document.createElement("span");
        suggestionSpan.textContent = suggestion;
        suggestionSpan.style.cursor = "pointer";
        suggestionSpan.style.color = "#4CAF50";
        suggestionSpan.style.marginRight = "10px";

        // Add click event to select the username
        suggestionSpan.addEventListener("click", () => {
          usernameInput.value = suggestion;
          usernameHelp.innerHTML = ""; // Hide suggestions after selection
        });

        // Append each suggestion to the usernameHelp element
        usernameHelp.appendChild(suggestionSpan);
      });
    }
  } else {
    // Clear suggestions if fields are empty
    const usernameHelp = document.getElementById("usernameHelp");
    if (usernameHelp) {
      usernameHelp.innerHTML = "";
    }
  }
}

// Function to add "Recommended options:" text
function addRecommendedOptionsText() {
  const firstName = firstNameInput.value.trim().toLowerCase();
  const lastName = lastNameInput.value.trim().toLowerCase();

  if (firstName && lastName) {
    // Clear existing suggestions
    let usernameHelp = document.getElementById("usernameHelp");
    if (!usernameHelp) {
      usernameHelp = document.createElement("div");
      usernameHelp.id = "usernameHelp";
      usernameInput.parentNode.appendChild(usernameHelp);
    }
    usernameHelp.innerHTML = "";

    // Generate username suggestions
    generateUsernameSuggestions();
  }
}

// Add event listeners to update the suggestions as the user types
firstNameInput.addEventListener("input", generateUsernameSuggestions);
lastNameInput.addEventListener("input", generateUsernameSuggestions);
usernameInput.addEventListener("input", generateUsernameSuggestions);

// Add event listener to add "Recommended options:" text when username field is in focus
usernameInput.addEventListener("focus", addRecommendedOptionsText);

// Hide suggestions when username field is not in focus
usernameInput.addEventListener("blur", () => {
  const usernameHelp = document.getElementById("usernameHelp");
  if (usernameHelp) {
    usernameHelp.innerHTML = "";
  }
});
