//Targets div with class of overview - div where profile info will appear
const overview = document.querySelector(".overview");
//Targets github username
const username = "saxby-b";

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
};
