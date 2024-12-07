import { v4 as uuidV4 } from "uuid";

type Person = {
  id: string;
  name: string;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");
let people: Person[] = loadPeople();
people.forEach(addListItem);

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input?.value) return;

  const newPerson: Person = {
    id: uuidV4(),
    name: input.value,
    createdAt: new Date(),
  };

  people.push(newPerson);
  savePeople();
  addListItem(newPerson);
  input.value = "";
});

function addListItem(person: Person) {
  const item = document.createElement("li");

  const nameSpan = document.createElement("span");
  nameSpan.textContent = person.name;

  const btnGroup = document.createElement("div");
  btnGroup.classList.add("btn-group");

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit-btn");
  editBtn.addEventListener("click", () => {
    const newName = prompt("Edit the name:", person.name);
    if (newName !== null && newName.trim() !== "") {
      person.name = newName.trim();
      nameSpan.textContent = person.name;
      savePeople();
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    people = people.filter((p) => p.id !== person.id);
    savePeople();
    item.remove();
  });

  btnGroup.append(editBtn, deleteBtn);
  item.append(nameSpan, btnGroup);
  list?.append(item);
}

function savePeople() {
  localStorage.setItem("PEOPLE", JSON.stringify(people));
}

function loadPeople(): Person[] {
  const peopleJSON = localStorage.getItem("PEOPLE");
  return peopleJSON ? JSON.parse(peopleJSON) : [];
}
