const major = 0
const minor = 2
const patch = 1
const security = 0

var c_init = false


var firebaseConfig = {
    apiKey: "AIzaSyCcgbrX_UKi_HYNxwgFQqb18cd6uimK12M",
    authDomain: "unote-cc660.firebaseapp.com",
    projectId: "unote-cc660",
    storageBucket: "unote-cc660.appspot.com",
    messagingSenderId: "910546176912",
    appId: "1:910546176912:web:2c7561587cf1dbfe878115"
  };
firebase.initializeApp(firebaseConfig);
var db = firebase.database()
var autulogin = false

function send_message(){
    db.ref('chats/').once('value', function(message_object) {
      var index = parseFloat(message_object.numChildren()) + 1
      db.ref('chats/' + `message_${index}`).set({
        name: get_name(),
        message: document.getElementById("msgbox").value,
        index: index,
      })
      document.getElementById("msgbox").value = ""
      })
    }


function outdated_build(){
  var error_screen = document.getElementById("outdated-ver")
  userspace.style.display = "none"
  error_screen.style.display = "block"
}

function outdated_security_patch(){
  document.getElementById("error-message").innerHTML = "İhlal edilmiş güvenlik protokolü algılandı, çerezleri temizlemeyi deneyin"
  outdated_build()
}

function provisionmode(){
  document.getElementById("error-message").innerHTML = "Bakımdayız! Lütfen daha sonra tekrar gelin."
  outdated_build()
}


function version_control(){
  const userspace = document.getElementById("userspace")
  db.ref("Ver/").on("value", function(version_object) {
    version = version_object.val()
    if(version["suspend"] == 1){
      provisionmode()
      return
    }
    if(version["major"] > major){
      outdated_build()
      return
    }
    if(version["security"] > security){
      outdated_security_patch()
      return
    }
  })
}

function get_name(){
    return localStorage.getItem("name")
}

function save_name(username){
    localStorage.setItem('name', username)
}

function getToChat(){
  if(get_name()=="admin" || get_name()=="ingiltere"){
    if(localStorage.getItem("admin") != "enabled"){
      return
    }
  }
    if(autulogin==false){
      save_name(document.getElementById("username-input").value)
    }
    var username_panel = document.getElementById("usrcon")
    var chat_panel = document.getElementById("msgshowroom")
    username_panel.style.display = "none"
    chat_panel.style.display = "block"
    loads_chat()
}

function loads_chat(){
    db.ref('chats/').on('value', function(messages_object) {
        document.getElementById("messagerecv").innerHTML=""
        if(messages_object.numChildren() == 0){
          return
        }
        var messages = Object.values(messages_object.val());
          var guide = []
          var unordered = []
          var ordered = [] 
  
          for (var i, i = 0; i < messages.length; i++) {
            guide.push(i+1)
            unordered.push([messages[i], messages[i].index]);
          }
  

          guide.forEach(function(key) {
            var found = false
            unordered = unordered.filter(function(item) {
              if(!found && item[1] == key) {
                ordered.push(item[0])
                found = true
                return false
              }else{
                return true
              }
            })
          })
          
          var prev_name
          ordered.forEach(function(data) {
            var parent = document.getElementById("messagerecv")
            var name = data.name
            var message = data.message
            var message_element = document.createElement("p")
            var username_element = document.createElement("p")
            if(c_init==false){
              prev_name=name
              c_init = null
            }
            username_element.style.color = "red"
            username_element.style.fontSize = "20px"
            username_element.style.marginLeft = "25px"
            username_element.innerHTML = name
            message_element.innerHTML = message
            message_element.style.marginLeft = "30px"
            message_element.style.fontSize = "15px"
            message_element.style.marginBottom = "25px"
            message_element.style.marginTop = "-15px"
            if(name=="ingiltere" || name=="admin"){
              var admin_tag = document.createElement("img")
              admin_tag.src = "admin_tag.png"
              admin_tag.style.width = "30px"
              admin_tag.style.height = "30px"
              admin_tag.style.marginBottom = "-7px"
              username_element.style.color = "green"
              username_element.append(admin_tag)
            }
            if(prev_name == name){
              if(c_init==null){
                parent.append(username_element)
                c_init=true
              }
            }
            else{
              parent.append(username_element)
            }
          prev_name = name
            console.log(prev_name)
            parent.append(message_element)
            
          })
          var msgDir = document.getElementById("msgshowroom")
          msgDir.scrollTop = msgDir.scrollHeight;
        })
}

window.onload = function() {
  version_control()
    if(get_name() != null && parseInt(get_name().length)>0){
      autulogin=true
      getToChat()
  }
    var username_input = document.getElementById("username-input")
    var enter_button = document.getElementById("loginbtn")
    username_input.onkeyup = function(){
        if(username_input.value != "admin" && username_input.value != "ingiltere" && username_input.value.length > 0){
            enter_button.style.display="block"
        }
        else{
          if(localStorage.getItem("admin")=="enabled"){
            enter_button.style.display="block"
          }
          else{
            enter_button.style.display="none"
          }
        }
    }
    var send_message = document.getElementById("msgbox")
    var send_message_button = document.getElementById("msgsend")
    send_message.onkeyup = function(){
        if(send_message.value.length > 0){
            send_message_button.style.display = "inline-block"
            send_message.style.borderRadius="15px 0 0 15px"
        }
        else{
            send_message_button.style.display = "none"
            send_message.style.borderRadius="15px"
        }
    }
    
}
