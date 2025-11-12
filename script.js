let emails = [
  { id: 1, from: "alice@example.com", to: "user@example.com", subject: "Hello!", body: "Hi there!", read: false },
  { id: 2, from: "bob@example.com", to: "user@example.com", subject: "Meeting", body: "Meeting at 3 PM", read: true }
];

const emailList = document.getElementById("emailList");
const emailView = document.getElementById("emailView");
const composeView = document.getElementById("composeView");
const composeBtn = document.getElementById("composeBtn");
const composeForm = document.getElementById("composeForm");

// Show emails in the sidebar
function renderEmails() {
  emailList.innerHTML = "";
  emails.forEach(email => {
    const li = document.createElement("li");
    li.textContent = `${email.from} - ${email.subject}`;
    li.className = email.read ? "read" : "";
    li.onclick = () => viewEmail(email.id);
    emailList.appendChild(li);
  });
}

// Show email content
function viewEmail(id) {
  const email = emails.find(e => e.id === id);
  email.read = true;
  emailView.innerHTML = `
    <h2>${email.subject}</h2>
    <p><strong>From:</strong> ${email.from}</p>
    <p>${email.body}</p>
  `;
  composeView.style.display = "none";
  emailView.style.display = "block";
  renderEmails();
}

// Compose button
composeBtn.onclick = () => {
  composeView.style.display = "block";
  emailView.style.display = "none";
}

// Send new email
composeForm.onsubmit = (e) => {
  e.preventDefault();
  const newEmail = {
    id: emails.length + 1,
    from: "user@example.com",
    to: document.getElementById("to").value,
    subject: document.getElementById("subject").value,
    body: document.getElementById("body").value,
    read: false
  };
  emails.push(newEmail);
  composeForm.reset();
  composeView.style.display = "none";
  renderEmails();
}

renderEmails();
