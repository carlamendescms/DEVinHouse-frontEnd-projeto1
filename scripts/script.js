let btnAdd = document.getElementById('btnAdd');
let txtItem = document.getElementById('txtItem');
let taskList = [];
let checkList = document.getElementById('checkList');

function addCheck() {
	if(txtItem.value){	

        addNewElements(txtItem.value, false);
        
		let savedElement = {
			'texto': txtItem.value,
			'valor': false
        }
        
		saveLocalStorage(savedElement);
		
	}else {

		alert('Oops, é necessário digitar um texto para inserir!');
	}
	clearText();
	txtItem.focus();
	
}

function addNewElements(text, value){
	let checkItem = document.createElement('input');
	let checkLabel = document.createElement('label');
    let trashIcon = document.createElement('i');
	let divItens = document.createElement('div');
	
	let i = checkList.lastElementChild ? parseInt(checkList.lastElementChild.id.split('_')[1]) + 1 : 0;
	
	checkItem.type= 'checkbox';
	checkItem.setAttribute('id', 'check_'+i);
	checkItem.setAttribute('name', 'check_'+i);
	checkItem.checked = value;
	
	checkLabel.setAttribute('for', 'check_'+i);
	checkLabel.textContent = text;
	
	trashIcon.setAttribute('class', 'far fa-trash-alt');
    trashIcon.setAttribute('id', 'trash_'+i);
    trashIcon.setAttribute('title', 'Clique aqui para excluir esta tarefa!');
    
	
	divItens.setAttribute('id', 'div_'+i);
	if(value === true){
		divItens.setAttribute('class', 'checked');
	}
	divItens.appendChild(checkItem);
	divItens.appendChild(checkLabel);
    divItens.appendChild(trashIcon);	
	checkList.appendChild(divItens);

	checkItem.addEventListener('change', changeStatus);
}


function deleteChecklist(id) {
    let btnConfirmDelete = confirm('Deseja excluir definitivamente esse item?');
    if (btnConfirmDelete === true) {
        let arrayIndex = parseInt(id.split('_')[1]);
        taskList.splice(arrayIndex, 1);
	    checkList.replaceChildren();
	    localStorage.setItem('taskList', JSON.stringify(taskList));
	    loadTaskList();
    }	
}

//Pega o elemento e adiciona um listener para click
checkList.addEventListener( 'click', function( e ) {
	// e.target é o elemento clicado
	// se ele for um item de lista
	if ( e.target && e.target.nodeName === 'I' ) {
		// Item da lista encontrado!  Mostrando o ID!
		//console.log( 'Item ', e.target.id, ' foi clicado!' );
		let id = e.target.parentElement.id;
		deleteChecklist(id);		
	}
}, false);

function clearText(){
	document.getElementById("txtItem").value = '';
}


function saveLocalStorage(checkList){
	taskList.push(checkList);
	localStorage.setItem('taskList', JSON.stringify(taskList)); //verificar se é essa mesma função
}


function loadTaskList(){
	taskList = JSON.parse(localStorage.getItem('taskList'));
	if(!taskList) taskList = [];
	for (i=0;i<taskList.length;i++){
		addNewElements(taskList[i]['texto'], taskList[i]['valor']);
	} 
}

function changeStatus(){
	this.parentElement.classList.toggle("checked");
	var index = parseInt(this.id.split('_')[1]);
	taskList[index]['valor'] = !taskList[index]['valor'];
	localStorage.setItem('taskList', JSON.stringify(taskList));
}

function verifyKey(event) {
	//console.log(event)
	if(event.key === 'Enter') {
		addCheck();
	}
}

btnAdd.addEventListener('click', addCheck);

txtItem.addEventListener('keyup', verifyKey);

loadTaskList();


