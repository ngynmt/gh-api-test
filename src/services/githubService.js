import axios from 'axios';
import keys from '../env/clientKeys';

const githubURL = 'https://github.com';
const githubAPI = 'https://api.github.com';

export function getAccessToken(code) {
  const payload = {
    headers: {
      Accept: 'application/json'
    }
  };
  return axios.post(`${githubURL}/login/oauth/access_token?client_id=${keys.CLIENT_ID}&client_secret=${keys.CLIENT_SECRET}&code=${code}`, payload);
}

export function getReferenceToHead(repo, ref) {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`
    },
  };
  return axios.get(`${githubAPI}/repos/${localStorage.owner}/${repo}/git/refs/${ref}`, config);
}

export function getHeadCommit(url) {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`
    },
  };
  return axios.get(url, config); // url from getReferenceToHead response
}

export function createBlob(repo, content) {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`
    },
  };
  const payload = {
    content,
    encoding: 'utf-8'
  };
  return axios.post(`${githubAPI}/repos/${localStorage.owner}/${repo}/git/blobs`, payload, config);
}

export function getTree(url) {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`
    },
  };
  return axios.get(url, config); // url from getHeadCommit response
}

export function createTree(repo, files, base, sha) {
  // In API Docs: Update src/constants/navBarConstants.js
  // In API Docs Editor: Update src/data/content/mainList.js
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`
    },
  };
  const payload = {
    base_tree: base, // object.sha in getReferenceToHead response
    tree: []
  };
  files.forEach((path) => {
    payload.tree.push({
      path, // path to file, from root i.e. src/data/content/mainList.js
      mode: '100644', // mode must be one of "100644" (blob), "100755" (executable), "040000" (subdirectory/tree), "160000" (submodule/commit), or "120000" (blob specifying path of symlink)
      type: 'blob', // type must be one of "blob", "tree", or "commit"
      sha // sha from getTree call
    });
  });
  return axios.post(`${githubAPI}/repos/${localStorage.owner}/${repo}/git/blobs`, payload, config);
}

export function createCommit(repo, parents, tree, message) {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`
    },
  };
  const payload = {
    message: message || `Updating API documenation at ${Date.now()}.`, // commit message
    parents, // array of SHAs, usually contains just one SHA - in our case SHA of commit in getHeadCommit
    tree // SHA of tree returned in createTree response
  };
  return axios.post(`${githubAPI}/repos/${localStorage.owner}/${repo}/git/commits`, payload, config);
}

export function updateHead(repo, ref, sha) {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`
    },
  };
  const payload = {
    sha,
    force: true
  };
  return axios.patch(`${githubAPI}/repos/${localStorage.owner}/${repo}/git/refs/${ref}`, payload, config);
}

export function createPullRequest(repo, ref, pullRequest) {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.access_token}`
    },
  };
  const payload = {
    title: pullRequest.title || `Updating API documenation at ${Date.now()}.`,
    body: pullRequest.body || `Updating API documenation at ${Date.now()}.`,
    head: pullRequest.head,
    base: pullRequest.base || 'master'
  };
  return axios.patch(`${githubAPI}/repos/${localStorage.owner}/${repo}/git/refs/${ref}`, payload, config);
}
