//Targets div with class of overview - div where profile info will appear
const overview = document.querySelector(".overview");
//Targets github username
const username = "saxby-b";
//Targets ul list
const repoList = document.querySelector(".repo-list");
//Targets repo section
const repos = document.querySelector(".repos");
//Targets repo data section
const repoData = document.querySelector(".repo-data");

const profile = async function () {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const user = await res.json();
  information(user);
};
profile();

const information = function (user) {
  const newDiv = document.createElement("div");
  newDiv.classList.add("user-info");
  newDiv.innerHTML = `<figure>
    <img alt="user avatar" src=${user.avatar_url} />
    </figure>
    <div>
     <p> <strong> Name:</strong> ${user.name} </p>
     <p> <strong> Bio:</strong> ${user.bio} </p>
     <p> <strong> Location:</strong> ${user.location} </p>
     <p> <strong> Number of public repos: </strong> ${user.public_repos} </p>
    </div>`;
  overview.append(newDiv);
  getRepoInfo();
};

const getRepoInfo = async function () {
  const resource = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repoInfo = await resource.json();
  displayRepoInfo(repoInfo);
};

const displayRepoInfo = function (repoInfo) {
  for (repo of repoInfo) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}`;
    repoList.append(li);
  }
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    specificRepoInfo(repoName);
  }
});

const specificRepoInfo = async function (repoName) {
  const res = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await res.json();
  console.log(repoInfo);
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);
  const languages = [];
  for (let key in languageData) {
    languages.push(key);
  }
  displaySpecificRepoInfo(repoInfo, languages);
};

const displaySpecificRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <h3> Name: ${repoInfo.name} </h3>
    <p> Description: ${repoInfo.description} </p>
    <p> Default Branch: ${repoInfo.default_branch} </p>
    <p> Languages: ${languages.join(", ")} </p>
    <a class="visit" href=${repoInfo.html_url} target="_blank" rel=noreferrer noopener"> View on Github! </a>`;
    repoData.append(div);
    repoData.classList.remove("hide");
    repos.classList.add("hide");
}
