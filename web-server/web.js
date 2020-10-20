const express = require("express");
const app = express();

const port = 3000;

const navItems = [
  {
    path: "/home",
    title: "home",
    image: "img1.jpg",
  },
  {
    path: "/explore",
    title: "explore",
    image: "img2.jpg",
  },
  {
    path: "/messages",
    title: "messages",
    image: "img3.jpg",
  },
];

const messages = [
  {
    path: "/messages/id=1",
    title: "message 1",
    image: "img4.jpg",
  },
  {
    path: "/messages/id=2",
    title: "message 2",
    image: "img5.jpg"
  },
];

const renderImage = (path, _navItems=navItems) => {
  let image = ``
  _navItems.forEach((navItem) => {
      if (navItem.path === path) {
          image += `<img src="${navItem.image}" alt="${navItem.title}" width="200" height="100">`
      }
  });
  return image; 
}

const renderContent = (content) =>{
  return `<h3>${content}</h3>`
}

const renderNavBar = (path, navItems) => {
  let navBar = `<ul>`;

  navItems.forEach((navItem) => {
    if (navItem.path === path) {
      navBar += `<li><i>${navItem.title}</i></li>`;
    } else {
      navBar += `<li><a href="${navItem.path}">${navItem.title}</a></li>`;
    }
  });

  navBar += `</ul>`;

  return navBar;
};

const renderPage = (path, content, _navItems = navItems) => {
  const image = renderImage(path, _navItems);
  const navBar = renderNavBar(path, _navItems);
  const pageContent =renderContent(content);
  return `${navBar}${image}${pageContent}`;
};

// Home
app.get("/home", (req, res) => {
  res.send(renderPage("/home", "Home page"));
});

// Explore
app.get("/explore", (req, res) => {
  res.send(renderPage("/explore", "Explore page"));
});

// Messages
app.get("/messages", (req, res) => {
  const commonContent = renderPage("/messages", "Messages page");
  const messageList = renderNavBar(req.path, messages);
  res.send(`${commonContent}${messageList}`);
});

// Messages content
app.get("/messages/:messageId", (req, res) => {
  const commonContent = renderPage("/messages", "Messages page");
  const messagePage = renderPage(req.path, req.params.messageId, messages);
  res.send(`${commonContent}${messagePage}`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});