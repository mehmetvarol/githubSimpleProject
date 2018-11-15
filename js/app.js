//Elementleri seçme
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();
document.addEventListener("DOMContentLoaded", getAllSearched);

eventListeners();

function eventListeners() {
  githubForm.addEventListener("submit", getData);
  clearLastUsers.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e) {
  let username = nameInput.value.trim();
  if (username === "") {
    alert("Lütfen geçerli bir kullanıcı adı giriniz.")
  } else {
    github.getGithubData(username)
      .then((response) => {
        if (response.user.message === "Not Found") {
          // Hata
          ui.showError("Kullanıcı Bulunamadı");
        } else {
          ui.addSearchedUserToUI(username);
          Storage.addSearchedUserToStorage(username);
          ui.showUserInfo(response.user);
          ui.showRepoInfo(response.repo);
        }
      }).catch((err) => {
        ui.showError(err);
      });
  }
  ui.clearInput(); // Input'umuzu temizliyoruz.
  e.preventDefault();
}

function clearAllSearched() {
  // Tüm arananları temizle
if (confirm("Emin misiniz?")) {
//Silme
  Storage.clearAllSearchedUsersFromStorage(); // Storageden temizleme
  ui.clearAllSearchedFromUI();
 }

}

function getAllSearched() {
  // Arananları Storageden al ve ui'a ekle
  let users = Storage.getSearchedUsersFromStorage();

  let result = "";
  users.forEach(user => {
    result += `<li class="list-group-item">${user}</li>`

  });
  lastUsers.innerHTML = result;
}