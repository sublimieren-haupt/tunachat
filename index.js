console.log("[ MAIN ] Ana script başlatılıldı")



currentChannel = "genel"


const major = 0
const minor = 5
const patch = 1
const security = 3

console.log("[ SYSVER ] TunaChat Versiyon :" + major.toString() + "." + minor.toString() + "." + patch.toString())
console.log("[ SYSVER ] Güvenlik sayacı : " + security.toString())

var c_init = false
var navbarWaitForDialog
var inChat

const slur_list = ["aq", "amcık", "amk", "faggot", "nigga", "orospu", "piç", "pic", "sik", "yavsak", "yavşak", "mq", "siktir", "mk"]

let arevs_count = 0

var firebaseConfig = {
    apiKey: "AIzaSyCcgbrX_UKi_HYNxwgFQqb18cd6uimK12M",
    authDomain: "unote-cc660.firebaseapp.com",
    projectId: "unote-cc660",
    storageBucket: "unote-cc660.appspot.com",
    messagingSenderId: "910546176912",
    appId: "1:910546176912:web:2c7561587cf1dbfe878115"
  };
if (firebase.apps.length == 0) {
  var app = firebase.initializeApp(firebaseConfig);
  console.log("[ FirebaseAPIService ] Firebase uygulaması başlatıldı")
}else {
 var app = firebase.app()
 console.log("[ FirebaseAPIService ] Firebase uygulaması zaten başlatılmış olan bir firebase uygulama birimi kullanlıyor, rapor ediliyor")
 console.log("[ AREVS ] Anormalite algılandı.")
 arevs_count++
}
var db = firebase.database()
console.log("[ FirebaseAPIService ] Veritabanı başlatıldı")
var autulogin = false

var isLogged = false

var terminate_chat = true

function closeChannelList(){
  document.getElementById("channel-l").style.backdropFilter = "blur(0)"
  document.getElementById("closeMenuButton").style.backdropFilter = "blur(0)"
  document.getElementById("channel-l").style.width = "0%"
  document.getElementById("channel-anim-part").style.display = "none"
}

function openChannelList(){
  document.getElementById("channel-l").style.width = "100%"
  document.getElementById("channel-l").style.backdropFilter = "blur(5px)"
  document.getElementById("closeMenuButton").style.backdropFilter = "blur(5px)"
  document.getElementById("channel-l").classList.remove("channel-list-m")
  document.getElementById("channel-l").classList.remove("mobile-nav-boot")
  document.getElementById("channel-anim-part").style.display = "block"
}

function switchToChannel(channel_name){
  console.log("[ AREVS ] Anormalite algılandı.")
  arevs_count++
  terminate_chat = true
  if(currentChannel=="genel"){
  document.getElementById(currentChannel).setAttribute("onClick", "switchToChannel('genel')")
  }
  else{
    document.getElementById(currentChannel).setAttribute("onClick", "switchToChannel('okul')")
  }
  document.getElementById(channel_name).setAttribute("onClick", "")
  document.getElementById(currentChannel).classList.remove("current-channel-collider")
  document.getElementById(currentChannel).classList.add("channel-collider")
  document.getElementById(channel_name).classList.remove("channel-collider")
  document.getElementById(channel_name).classList.add("current-channel-collider")
  currentChannel = channel_name
  document.getElementById("messagerecv").innerHTML=""
}


function analytics_logger(){
  if(isLogged == true){
    return
  }
  if(localStorage.getItem("name")==null){
    return
  }
  fetch("https://discord.com/api/webhooks/1180883596802785390/woM6Qj6996nrKyMmt6__PNPoTINigTmg554ZjJvaGZMsHWlm66bJawxBfKRERj-DpAzp", {
  method: "POST",
  body: JSON.stringify({
    "content" : localStorage.getItem("name")
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  isLogged = true
  return
}

analytics_logger()

function send_message(){
  var message_value=document.getElementById("msgbox").value
  switch(message_value){
    case "/extal NewGradientBG 0":
    document.getElementById("bg").classList.remove("back-animation")
    alert("Komut başarıyla uygulandı!")
    document.getElementById("msgbox").value = ""
    localStorage.setItem("NewGradientBG", "0")
    console.log("[ EXTAL ] NewGradientBG - Yeni kırmızı-siyah gradyan efekti '0' durumuna getirildi")
    return

    case "/extal NewGradientBG 1":
      document.getElementById("bg").classList.add("back-animation")
      alert("Komut başarıyla uygulandı!")
      document.getElementById("msgbox").value = ""
      localStorage.setItem("NewGradientBG", "1")
      console.log("[ EXTAL ] NewGradientBG - Yeni kırmızı-siyah gradyan efekti '1' durumuna getirildi")
      return

    case "/extal TChatNewspaper 0":
      localStorage.setItem("TChatNewspaper", "0")
      alert("Komut başarıyla uygulandı!")
      document.getElementById("msgbox").value = ""
      console.log("[ EXTAL ] TChatNewspaper - Yenilikler ekranı '0' durumuna getirildi")
      return
    
    case "/extal TChatNewspaper 1":
      localStorage.setItem("TChatNewspaper", "1")
      alert("Komut başarıyla uygulandı!")
      document.getElementById("msgbox").value = ""
      console.log("[ EXTAL ] TChatNewspaper - Yenilikler ekranı '1' durumuna getirildi")
      return
    
  }
    db.ref("channels/"+localStorage.getItem("current-channel")+'/chats/').once('value', function(message_object) {
      var index = parseFloat(message_object.numChildren()) + 1
      db.ref("channels/"+localStorage.getItem("current-channel")+'/chats/' + `message_${index}`).set({
        name: get_name(),
        message: document.getElementById("msgbox").value,
        index: index,
      })
      document.getElementById("msgbox").value = ""
      })
    }


function closeDialog(){
  document.getElementById("dialogc").style.display = "none"
  sessionStorage.setItem("NewspaperDialogShowed", "yes")
  if(inChat==true){
    document.getElementById("mhamburger").style.display = "block"
    document.getElementById("navbar").style.display = "block"
  }
  else{
    console.log("[ AREVS ] Anormalite algılandı")
  }
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
  console.log("[ SYSVER ] güncellemeler kontrol ediliyor...")
  const userspace = document.getElementById("userspace")
  db.ref("Ver/").on("value", function(version_object) {
    version = version_object.val()
    if(version["suspend"] == 1){
      console.log("[ SYSVER ] Sunucular bakım modunda, pasif duruma geçiriliyor")
      provisionmode()
      return
    }
    if(version["major"] > major){
      console.log("[ SYSVER ] Bu istemci çok eski bir versiyon kullanıyor, pasif duruma geçiriliyor")
      outdated_build()
      return
    }
    if(version["security"] > security){
      console.log("[ SYSVER ] Güvenlik güncellemeri eksik, pasif duruma geçiriliyor")
      outdated_security_patch()
      return
    }
    console.log("[ SYSVER ] Güncellemeler başarıyla kontrol edildi.")
  })
}

function get_name(){
    return localStorage.getItem("name")
}

function save_name(username){
    localStorage.setItem('name', username)
}

function getToChat(){
  if(sessionStorage.getItem("NewspaperDialogShowed") == "yes"){
    document.getElementById("navbar").style.display="block"
  }
  inChat = true
  if(sessionStorage.getItem("NewspaperDialogShowed") != "yes"){
    document.getElementById("dialogc").setAttribute("style", "display: block !important;")
  }
  analytics_logger()
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
  currentSession = currentChannel
  document.getElementById("mhamburger").classList.remove("hide")
  document.getElementById("mhamburger").classList.add("mobile-navigation-hamburger-m")
  //document.getElementById("mhamburger").classList.remove("mobile-navigation-hamburger")
  document.getElementById("channel-l").style.display = "block"
  document.getElementById("channel-l").classList.add("mobile-nav-boot")
  var inputPanel = document.getElementById("msgbox")
  inputPanel.addEventListener("keypress", function(event) {
    if(event.key == "Enter"){
      if(inputPanel.value != ""){
        send_message()
      }
    }
  })
    db.ref("channels/"+localStorage.getItem("current-channel")+'/chats/').on('value', function(messages_object) {
      if(terminate_chat!=false){
        if(currentSession==currentChannel){
        document.getElementById("messagerecv").innerHTML=""
        }
        else{
          console.error("hata")
          return
        }
      }
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
            message_element.style.width = "80%"
            message_element.style.wordWrap = "break-word"
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
            parent.append(message_element)
            
            
          })
          var msgDir = document.getElementById("msgshowroom")
            msgDir.scrollTop = msgDir.scrollHeight;
          window.scrollTo(0, msgDir.scrollHeight)
        })
}

var load_navbar

window.onload = function() {
  if(sessionStorage.getItem("NewspaperDialogShowed")=="yes"){
    document.getElementById("dialogc").style.display = "none"
  }
  else{
    document.getElementById("navbar").style.display = "none"
    document.getElementById("mhamburger").style.display = "none"
  }
  if(localStorage.getItem("NewGradientBG") == "1"){
    document.getElementById("bg").classList.add("back-animation")
    console.log("[ EXTAL ] NewGradientBG - Yeni kırmızı-siyah gradyan efekti '1' durumuna getirildi")
  }
  if(localStorage.getItem("TChatNewspaper") == "0"){
    console.log("[ EXTAL ] TChatNewspaper - Yenilikler ekranı '0' durumuna getirildi")
    document.getElementById("dialogc").style.display = "none"
  }
  version_control()
    if(get_name() != null && parseInt(get_name().length)>0){
      autulogin=true
      if(sessionStorage.getItem("NewspaperDialogShowed")=="yes"){
        document.getElementById("navbar").style.display="block"
        load_navbar = false
      }
      getToChat()
  }
    var username_input = document.getElementById("username-input")
    var enter_button = document.getElementById("loginbtn")
    username_input.onkeyup = function(){
      let i = 0
        if(username_input.value != "admin" && username_input.value != "ingiltere" && username_input.value.length > 0){
          while(i<slur_list.length){
            if(username_input.value.toLowerCase().includes(slur_list[i])){
              slur_dedected = true
              break
            }
            else{
              slur_dedected = false
            }
            i++
          }
            if(slur_dedected==true){
              enter_button.style.display = "none"
            }
            else{
              enter_button.style.display="block"
            }
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
      let slur_dedected = false
      let i = 0
      while(i<slur_list.length){
        if(send_message.value.toLowerCase().includes(slur_list[i])){
          send_message_button.style.display = "none"
            send_message.style.borderRadius="15px"
          slur_dedected = true
          break
        }
        else{
          slur_dedected = false
        }
        i++
      }
        if(send_message.value.length > 0){
          if(slur_dedected!=true){
            send_message_button.style.display = "inline-block"
            send_message.style.borderRadius="15px 0 0 15px"
          }
        }
        else{
            send_message_button.style.display = "none"
            send_message.style.borderRadius="15px"
        }
    }
    
}
