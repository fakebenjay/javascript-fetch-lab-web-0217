const repo = 'javascript-fetch-lab'
var userName = 'learn-co-curriculum'

function getIssues() {
  fetch(`https://api.github.com/repos/${userName}/${repo}/issues`, {
    method: 'get',
    })
  .then(res => res.json())
  .then(showIssues);
}

function showIssues(json) {
  const template = Handlebars.compile(document.getElementById('issues-template').innerHTML)
  $("#issues").html(template(json))
}

function showIssues(json) {
  const template = Handlebars.compile($('#issues-template').html())
  document.getElementById("issues").innerHTML = template(json)
}

function createIssue() {
  const token = getToken()
  const postData = {
    title: $('#title').val(),
    body: $('#body').val()
  };

  fetch(`https://api.github.com/repos/${userName}/${repo}/issues`, {
    method: 'post',
    headers: {
      Authorization: `token ${token}`
    },
    body: JSON.stringify(postData)
  }).then(res => res.json())
  .then(getIssues);
}

function showResults(json) {
  const template = Handlebars.compile($('#repo-template').html())
  $('#results').html(template(json))
  userName = json.owner.login
}

// function showResults(json) {
//   const template = Handlebars.compile(document.getElementById('repo-template').innerHTML)
//   document.getElementById("results").innerHTML = template(json)
//   userName = json.owner.login
// }

function forkRepo() {
  const token = getToken()

  fetch(`https://api.github.com/repos/${userName}/${repo}/forks`, {
    method: 'post',
    headers: {
      Authorization: `token ${token}`
    }
  }).then(res => res.json())
  .then(showResults);
}

function getToken() {
  const token = 'U NO CAN HAS MY KEY';
  return token
}
