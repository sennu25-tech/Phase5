const form = document.getElementById("question-form");
const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask-button");
const result = document.getElementById("result");
const resultTitle = document.getElementById("result-title");
const answer = document.getElementById("answer");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const question = questionInput.value.trim();

  if (!question) {
    result.hidden = false;
    resultTitle.textContent = "Error";
    answer.textContent = "Please enter a question.";
    return;
  }

  result.hidden = false;
  resultTitle.textContent = "Thinking...";
  answer.textContent = "Please wait for Gemini's answer.";

  askButton.disabled = true;
  askButton.textContent = "Please wait...";

  try {
    const response = await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    resultTitle.textContent = "Gemini's Answer";
    answer.textContent = data.answer;

  } catch (error) {
    resultTitle.textContent = "Error";
    answer.textContent = error.message;

  } finally {
    askButton.disabled = false;
    askButton.textContent = "Ask Gemini";
  }
});
