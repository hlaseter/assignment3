import { madlibs } from './resources/resources.js';

// console.log(`${madlibs.length} madlibs loaded`);
let ind = 0;
let user_inputs = []



function getMadlib(){
  const rand = Math.floor(Math.random() * madlibs.length);
  //console.log(madlibs[rand]);
  //console.log(madlibs[rand].content.match(/\[([^\])]*)\]/g));
  return madlibs[rand];
}

function get_blanks_list(madlib){

  const bl = madlib.content.match(/\[([^\])]*)\]/g);
  //bl.forEach(function(item, index){
    
   // const b = document.createElement('b');
    //container.appendChild(b);
    //b.appendChild(document.createTextNode(item));


//  });
  return bl;

}

function create_vmodel(text, inputwrapper){
  const div = document.createElement('div')
  div.classList.add('divdiv' + ind)
  
  const inp = document.createElement('input')
  inp.setAttribute('id', ind)
  inp.setAttribute('v-model', "message");
  inp.setAttribute("placeholder", "edit me");
  inp.setAttribute('onfocus', "this.value = this.value=='name'?'':this.value;")
  const p = document.createElement('p')
  //const ptxt = document.createTextNode("{{ message }}");
  inputwrapper.appendChild(div)
  //p.appendChild(ptxt)
  div.appendChild(inp);
  div.appendChild(p);
  const wap = new Vue({
    el: '.divdiv' + ind,
    data: {
      message: blanks_list[ind]
    }
  });
  ind ++;




}

const container = document.getElementById('madlib-container');
function display_story(ml){

  
  while(container.firstChild){
    container.removeChild(container.firstChild);
  }
  const madlibText = document.createTextNode(ml)

  container.appendChild(madlibText);


}

function setup_input_boxes(list, inputwrapper){
  ind = 0;
  user_inputs = []
  while(inputwrapper.firstChild){
    inputwrapper.removeChild(inputwrapper.firstChild);
  }
  list.forEach(function (item, index) {
    const box = document.createElement('div');
    box.classList.add('inp')
    const PoS = item;
  create_vmodel(PoS, inputwrapper);
  user_inputs[index] = ''
  });

}

function replaceItems(mad,items) {

  let i = 0;


  let r = mad.replace(/\[([^\])]*)\]/g,function (mat,p1,off,str) {
    
    if (items[i][0] == '['){
      return items[i++]
    }
    else{
      return items[i++].toUpperCase()
    }
     
   });
  
  display_story(r)
  //display_story(r);
}

const handleInput = event => {

  let index = event.target.id;
  blanks_list[index] = event.target.value;
  replaceItems(madlib.content.toString(), blanks_list)
  
  
  
}

let madlib = getMadlib();
let blanks_list = get_blanks_list(madlib);
function main(){
  madlib = getMadlib()
  blanks_list = get_blanks_list(madlib);
  const inputwrapper = document.getElementById('input-container')
  
  
  display_story(madlib.content)

  setup_input_boxes(blanks_list, inputwrapper);
  
  



}
window.onload = function() {
  main();
};
document.getElementById("get-madlib").addEventListener("click", main);
document.getElementById('input-container').addEventListener('input', handleInput)
