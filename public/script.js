let i = 0;
let count = [1];
let width = [90];

function addChild(id) {
  if (width[i] > 50) {
    width[i] = width[i] - 10;
  }
  count[i] += 1;
  let str =
    `<div class="query">
<input
  type="text"
  name="query1"
  id=` +
    count[i] +
    `
  style="width: ` +
    width[i] +
    `%; height: 30px"
/>
<button onclick="addChild('` +
    i +
    `')" id="` +
    count[i] +
    `" class="addChild">+</button>

</div>`;

  const butt = `<button onclick="addQuery()" id="addNewQuery">Add query</button>`;
  const html = document.getElementById(id).innerHTML;

  const list = document.getElementById("query1");
  list.removeChild(list.lastElementChild);
  document.getElementById("query1").innerHTML += str + butt;
  console.log(document.getElementById("query1").lastChild);
}

function addQuery() {
  console.log("hello");
  count.push(1);
  width.push(90);
  i += 1;
  addChild(i);
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
});
