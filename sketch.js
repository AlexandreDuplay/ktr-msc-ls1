var mgr = new SceneManager();
mgr.wire();
myStorage = window.localStorage;
var mdpChecked = false;
var userC
var mdpC
var tab
var user
var sel


function setup() {
  createCanvas(windowWidth, windowHeight);
  mgr.showScene(connect) 
}


function connect(){
  this.setup = function(){
    // création compte/connection
    nom = createInput()
    nom.position(width / 10 , 5 * height / 20)
    mdp = createInput()
    mdp.position(width / 10 , 7 * height / 20)
    //

    // validation
    myButton1 = new Clickable();
    myButton1.text = "Submit"
    myButton1.locate(width / 10, 9 * height / 20);
    myButton1.onPress = function() {
      if(nom.value()==""){
        alert("Your name is mandatory")
        return;
      }
      if(mdp.value()==""){
        alert("Your password is mandatory")
        return;
      }
      user = myStorage.getItem(""+nom.value())
      userC = nom.value()
      if(user== null){
        myStorage.setItem(""+nom.value(), ""+mdp.value()+",nocards");
      }else{
        tab = user.split(',')
        if(tab[0] !=mdp.value() ){
          alert("Wrong password")
          return
        }
      }
      nom.position(-1000,-1000)
      mdp.position(-1000,-1000)
      mdpC = mdp.value()
      
      mgr.showScene(connected)
    }
    //
    }
  
  this.draw = function(){
    background(220);
    // entrée des informations 
    text("Create account or connect :", width / 10, height /10)
    text("Name:", width / 10, 5*height/20 - height/100)
    text("PassWord:", width / 10, 7*height/20 - height/100)
    //
    myButton1.draw();
  }
}

function connected(){
  this.setup = function(){
    // création compte/connection
    nom = createInput()
    nom.position(width / 10 , 5 * height / 20)
    company = createInput()
    company.position(width / 10 , 7 * height / 20)
    mail = createInput()
    mail.position(width / 10 , 9 * height / 20)
    tel = createInput()
    tel.position(width / 10 , 11 * height / 20)
    //
    
    myButton1 = new Clickable();
    myButton1.text = "Add card to library"
    myButton1.locate(width / 10, 13 * height / 20);
    myButton1.onPress = function() {
      user = myStorage.getItem(""+userC)
      tab = user.split(',')
      if(tab[1]=="nocards" && nom.value()==""){
        alert("Your name is mandatory")
        return;
      }
      if(tab[1]=="cards" && mail.value()==""){
        alert("Email is mandatory")
        return
      }
      if(isNaN(tel.value())){
        alert("Your telephone number must not contain letters")
        return
      }
      if(tab[1]=="nocards"){
        myStorage.setItem(""+userC,""+mdpC+",cards,"+nom.value()+","+company.value()+","+mail.value()+","+tel.value() )
      }else {
        myStorage.setItem(""+userC,""+user+","+nom.value()+","+company.value()+","+mail.value()+","+tel.value() )
      }
        
    
    user = myStorage.getItem(""+userC)
    tab = user.split(',')
    for(var i = 4; i < tab.length;i+=4){
      sel.option(tab[i])
      sel.selected(tab[i])
    }
    nom.position(-1000,-1000)
    company.position(-1000,-1000)
    mail.position(-1000,-1000)
    tel.position(-1000,-1000)
    sel.position(-1000,-1000)
    mgr.scenes[mgr.findSceneIndex(connected)].setupExecuted = false
    mgr.scenes[mgr.findSceneIndex(connected)].enterExecuted = false
    mgr.showScene(connected)
      
    }
      
    myButton2 = new Clickable();
    myButton2.text = "log out"
    myButton2.locate(width / 10, 17 * height / 20);
    myButton2.onPress = function() {
      nom.position(-1000,-1000)
      company.position(-1000,-1000)
      mail.position(-1000,-1000)
      tel.position(-1000,-1000)
      sel.position(-1000,-1000)
      mgr.scenes[mgr.findSceneIndex(connect)].setupExecuted = false
      mgr.scenes[mgr.findSceneIndex(connect)].enterExecuted = false
      mgr.scenes[mgr.findSceneIndex(connected)].setupExecuted = false
      mgr.scenes[mgr.findSceneIndex(connected)].enterExecuted = false
      mgr.showScene(connect)
      return
    }
      
    sel = createSelect()
    
    sel.option("")
    sel.selected("")
    
    sel.position(5* width / 10 ,5*height/20)
    user = myStorage.getItem(""+userC)
    tab = user.split(',')
    for(var i = 4; i < tab.length;i+=4){
      sel.option(tab[i])
      sel.selected("")
    }
    
    
  }
  this.draw = function(){
    background(220);
    myButton1.draw()
    myButton2.draw()
    text("Name:", width / 10, 5*height/20 - height/100)
    text("Company name:", width / 10, 7*height/20 - height/100)
    text("Email:", width / 10, 9*height/20 - height/100)
    text("Telephone number:", width / 10, 11*height/20 - height/100)
    text("Saved Cards:", 5* width / 10, 5*height/20 - height/100)
    if(sel.value()!=null){
      tab = user.split(',')
      for(var n = 4;n < tab.length;n+=4){
        if(sel.value()==tab[n]){
          text("Name: "+ tab[n-2],5*width / 10, 7*height/20 )
          text("Company name: "+ tab[n-1],5*width / 10, 9*height/20 )
          text("Email: "+ tab[n],5*width / 10, 11*height/20 )
          text("Telephone number: "+ tab[n+1],5*width / 10, 13*height/20 ) 
        }
      }
      
    }
    
  }
}