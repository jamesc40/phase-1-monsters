const url = "http://localhost:3000/monsters"

//accum to keep track of pages
let totalPages = 0;

window.addEventListener('DOMContentLoaded', (e) => {
    loadMonsters();
    makeForm();
    makeButtonsWork();
})

function loadMonsters(){

    // console.log(totalPages);
    //fetch the data based on the amount of pages
    console.log(`${url}/?_limit=50&_page=${totalPages}`)
    fetch(`${url}/?_limit=50&_page=${totalPages}`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(monster => makeMonsters(monster)));

    //add to the totalPages every time the functin is called
    totalPages++;
    console.log(totalPages)
}

function makeMonsters(someMonster){
    // console.log(someMonster)
    // const body = document.querySelector('body');
    let monster = document.querySelector('#monster-container');

    //create elements to place monsters into
    let name = document.createElement('h2');
    let age = document.createElement('h3');
    let description = document.createElement('p');

    //add monster info to html tags
    name.textContent = someMonster.name
    age.textContent = someMonster.age
    description.textContent = someMonster.description

    //append tags to the DOM
    monster.append(name, age, description)

}

function makeForm () {

    //creates a form inside of the create monster container
    const newMonster = document.querySelector('#create-monster');
    const form = document.createElement('form');

    //creates input for name, age and description along with a submit button
    const name = document.createElement('input');
    name.setAttribute('type', 'text');
    name.setAttribute('placeholder', 'Monster Name');

    const age = document.createElement('input');
    age.setAttribute('type', 'number')
    age.setAttribute('placeholder', 'Monster Age' )

    const description = document.createElement('input');
    description.setAttribute('type', 'textarea');
    description.setAttribute('placeholder', 'Description');

    const submit = document.createElement('input')
    submit.setAttribute('type', 'submit');

    //adds an event listener to the form that posts the object
    form.addEventListener('submit', e => {

        e.preventDefault();

        const objMonster = {
            'name': name.value,
            'age':  age.value,
            'description': description.value,
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(objMonster)
        })

        form.reset();
    })

    //appends the form to the DOM
    form.append(name, age, description, submit);
    newMonster.append(form);

}

function makeButtonsWork() {

    const next = document.querySelector('#forward');
    console.log(next);
    //calls the monster fetch on the click of the next button
    next.addEventListener('click', () => loadMonsters());

}

