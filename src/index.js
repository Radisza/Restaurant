import "./style.css";
import OpeningHours from "./text/opening_hours.csv";

function container() {
  const container = document.createElement("div");
  container.classList.add("main_container");
  return container;
}

function header() {
  const header = document.createElement("div");
  header.textContent = "B&W Book and Wine";
  header.classList.add("header");

  return header;
}

const user_panel_button_def = [
  ["Home", "home_btn", () => home_page()],
  ["Menu", "menu_btn", () => menu_page()],
  ["Contact", "contact_btn", () => contact_page()],
];

function userPanel() {
  const container = document.createElement("ul");
  container.classList.add("tab-list");

  for (const [name, btn_id, btn_action] of user_panel_button_def) {
    const button = document.createElement("li");
    button.id = btn_id;
    button.textContent = name;

    button.addEventListener("click", () => {
      const content = document.querySelector(".main_container");
      content.removeChild(content.lastChild);
      content.appendChild(btn_action());
    });
    container.appendChild(button);
  }

  container.classList.add("content_item");
  return container;
}

function openingHours() {
  const hours = document.createElement("table");

  const title = hours.createCaption();
  title.setAttribute("align", "top");
  title.textContent = "Opening hours";

  const thead = hours.createTHead();
  let row = thead.insertRow();
  for (const row_title of OpeningHours[0]) {
    const cell = row.insertCell();
    cell.textContent = row_title;
  }

  const tbody = hours.createTBody();

  for (let i = 1; i < OpeningHours.length; i++) {
    const [day, open, closed] = OpeningHours[i];
    if (day == "") {
      continue;
    }

    const row = tbody.insertRow();
    const cell = row.insertCell();
    cell.textContent = day;

    if (open == "" || closed == "==") {
      const cell = row.insertCell();
      cell.textContent = "closed";
    } else {
      for (const value of [open, closed]) {
        const cell = row.insertCell();
        cell.textContent = value;
      }
    }
  }

  const container = document.createElement("div");
  container.appendChild(hours);

  return container;
}

function google_maps() {
  const map = document.createElement("div");
  map.classList.add("google-map");
  map.innerHTML =
    '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4864.758893463113!2d16.962009623898705!3d51.13329939022866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470fea71044c9a65%3A0xd17dfefe94a8a0b2!2sHala%20Targowa%20T%C4%99cza!5e0!3m2!1spl!2spl!4v1712652905845!5m2!1spl!2spl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>';

  return map;
}

function home_page() {
  const container = document.createElement("div");
  container.classList.add("content_item");

  // TITLE
  const title = document.createElement("div");
  title.classList.add("header");
  title.textContent = "Visit us!";
  container.appendChild(title);

  // CONTENT
  const content = document.createElement("div");
  content.classList.add("flex_container");

  content.appendChild(google_maps());
  content.appendChild(openingHours());

  container.appendChild(content);

  //QUOTE

  const quote = document.createElement("div");
  quote.classList.add("quote");

  const text = document.createElement("p");
  text.textContent =
    "Fantastic coffee <3 Kayna was so intensely black currant- flavoured it was magical. It's also very relaxing to sit there and watch your coffee being brewed for you. The atmosphere is super cozy. Also, they won the world 2016 aeropress championship, so they offer coffee brewed using the winning method.";
  quote.appendChild(text);

  const author = document.createElement("p");
  author.textContent = "Henryk Jakistam";
  quote.appendChild(author);

  container.appendChild(quote);

  return container;
}

function menu_page() {
  const content = document.createElement("h1");
  content.textContent = "MENU!";
  return content;
}
function contact_page() {
  const content = document.createElement("h1");
  content.textContent = "CONTACT US!";
  return content;
}

const body_content = container();
body_content.appendChild(header());
body_content.appendChild(userPanel());
body_content.appendChild(home_page());

document.body.appendChild(body_content);
