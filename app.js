const config = {
    apiKey: "AIzaSyD7Ru6H_IaPgJHPp_TecYgxAtcxuTh_Fuc",
    authDomain: "contackform.firebaseapp.com",
    databaseURL: "https://contackform.firebaseio.com",
    projectId: "contackform",
    storageBucket: "",
    messagingSenderId: "1093334925098"
};
firebase.initializeApp(config);

const messageRef = firebase.database().ref('messages');

document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const {name, company, address, email, phone, message} = event.target
    const msg = {name: name.value, company: company.value, address:address.value, email: email.value, phone:phone.value, text:message.value};
	saveMessage(msg)

    const alert = document.querySelector('.alert');
    alert.style.display = 'block'

    setTimeout(() => {
        alert.style.display = 'none'
    }, 3000);
})
messageRef.on('value', gotData, errData)


function gotData(data) {
	const list = document.getElementById('list')
	while (list.firstChild) {
		list.removeChild(list.firstChild)
	}

	try {
		const messages = data.val();
		const keys = Object.keys(messages);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i]
			let li = document.createElement('li')
			let input = document.createElement('input');
			if(messages[key].name){

				li.innerText = `"${messages[key].name}" - "${messages[key].text}"`;
				li.setAttribute('id', key);
				li.addEventListener('click', (e) => {
					
					input.type = 'text'
					input.value = messages[key].text
					input.addEventListener('keypress', (e) => {
						console.log('submit')
						if(e.keyCode === 13){
							firebase.database().ref('messages/' + key).update({
								text:e.target.value
							})
						}
						
					})
					e.target.parentNode.insertBefore(input, e.target.nextSibling)
				})
				//li.appendChild(text)
				list.appendChild(li);
			}
	
		}
		
	} catch ({error}) {
		console.log(error)
	}
	function openEdit(key) {
		
		
	}
}


function errData(data) {
	console.log(data);
}
function saveMessage(message) {
    const newMessageRef = messageRef.push();

    console.log(message);
    newMessageRef.set(message)
}