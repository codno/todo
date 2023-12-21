const createBtn = document.getElementById('add-btn');
const list = document.getElementById('list');

let todos = [];

function createNewTodo(){

    const item = {
        id: new Date().getTime(), // 고유 값 필요
        text: '',
        complete:false
    }

    //배열 처음에 새 아이템 추가
    todos.unshift(item);

    //요소생성
    const {itemEl,textEl,editBtnEl,removeBtnEl} = createEl(item);
    
    //생성 눌렀을때 새 리스트가 가장 위로
    list.prepend(itemEl);

    textEl.removeAttribute('disabled');
    textEl.focus();
    saveData();
}
createBtn.addEventListener('click',createNewTodo);

function createEl(item){
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    //체크되었을때, div class 추가
    if(item.complete){
        itemEl.classList.add('complete');
    }

    const textEl = document.createElement('input');
    textEl.type = 'text';
    textEl.value = item.text;
    textEl.setAttribute('disabled',''); // 첫 생성시 입력방지

    const actionEl = document.createElement('div');
    actionEl.classList.add('action');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText='edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons','remove-btn');
    removeBtnEl.innerText='remove_circle';

    textEl.addEventListener('input',()=>{
        item.text = textEl.value;
    })

    textEl.addEventListener('blur',()=>{
        textEl.setAttribute('disabled','');
        saveData();
    })

    editBtnEl.addEventListener('click',()=>{
        textEl.removeAttribute('disabled');
        textEl.focus();
    })

    checkboxEl.addEventListener('change',()=>{
        item.complete = checkboxEl.checked;
        if(item.complete){
            itemEl.classList.add('complete');
        }
        else{
            itemEl.classList.remove('complete');
        }
        saveData();
    })

    removeBtnEl.addEventListener('click',()=>{
       todos = todos.filter(t=>t.id !== item.id);
       itemEl.remove();

       saveData();
    })

    
    actionEl.append(editBtnEl);
    actionEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(textEl);
    itemEl.append(actionEl);

    return {itemEl,textEl,editBtnEl,removeBtnEl}

}

function saveData(){
    const data = JSON.stringify(todos);

    localStorage.setItem('my_todos',data);
}

function loadData(){
    const data = localStorage.getItem('my_todos');

    if(data){
        todos=JSON.parse(data);
    }
}
function displayTodos(){

    loadData();

    for(let i = 0; i <todos.length; i++){
        const item = todos[i];
        const {itemEl} = createEl(item);

        list.append(itemEl);
    }
}

displayTodos();
