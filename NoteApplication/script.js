
// Panel seçiciler
const newNoteAdd = document.getElementById("addbutton");
const noteAddPannel = document.querySelector(".newnotepannel");
const menuPannel = document.querySelector(".section");
const newTittle = document.querySelector("#enterTittle");
const newNoteArea = document.querySelector("#notearea");
const notelist = document.querySelector(".menulist");
const noteEdit = document.querySelector(".note-edit-Section");
const updateTitle = document.querySelector("#updateTittleInput");
const updateTextArea = document.querySelector("#updateTextArea");


// Alerts seçiciler

const info1 = document.getElementById("alertplease1");
const info2 = document.getElementById("alertplease2");
const successadd = document.getElementById("alertsuccess");
const infodiv1 = document.getElementById("infodiv1");
const infodiv2 = document.getElementById("infodiv2");
const updatedAlert = document.getElementById("updatedAlert");
const updatesuccessbtn = document.getElementById("updatesuccessbtn");
const pleaseUpdateTextAreaAlert = document.getElementById("pleaseUpdateTextAreaAlert");
const pleaseUpdateTittleAlert = document.getElementById("pleaseUpdateTittleAlert");





// Buton seçici

const okaybtn = document.getElementById("okaybtn");
const showAllNotes = document.getElementById("showlistbutton");
const clearbutton = document.getElementById("clearbutton");
const btnNo = document.getElementById("btnNo");
const btnYes = document.getElementById("btnYes");
const saveNewNote = document.getElementById("saveNewNote");
const cancelNewNote = document.getElementById("cancelNewNote");






// Menü işlemleri (kapatma açma)

document.querySelector("#btnCancel").addEventListener("click", () => {
    noteAddPannel.style.display = "none";
    menuPannel.style.display = "grid";
    info2.style.display = "none";
    info1.style.display = "none";
    newTittle.value = "";
    newNoteArea.value = "";

});


const notes = JSON.parse(localStorage.getItem("notes") || "[]");


newNoteAdd.addEventListener("click", noteAdd)

function noteAdd() {
    noteAddPannel.style.display = "grid";
    menuPannel.style.display = "none";
}


function showNotes() {

    document.querySelectorAll(".note").forEach(note => note.remove())
    
    notes.forEach((note, index) => {
    
        let divTag = `
    <div  class="note">

    <div onClick="selectionNote(${index}, '${note.dates}', '${note.tittle}','${note.textarea}')" class="item1"  ">
        <div class="date1">
            <p id="currentlydate">${note.dates}</p>
        </div>
    </div>

    <div onClick="selectionNote(${index}, '${note.dates}', '${note.tittle}','${note.textarea}')" class="item2">
        <div class="contenttittle">
            <p id="notetittle">${note.tittle}</p>
        </div>
    </div>

    <div class="item3">
        <div class="noteicons" style>
            <button  onClick="updateNote(${index}, '${note.dates}', '${note.tittle}','${note.textarea}')" class="notebtns" id="noteupdate"><span id="noteupdate-icon" class="material-symbols-outlined">edit</span></button>
            <button  onClick="deleteNote(${index})" class="notebtns" id="notedelete"><span id="notedelete-icon"class="material-symbols-outlined">close</span></button>
        </div>
    </div>
</div>
        `
        notelist.insertAdjacentHTML("afterbegin", divTag)
    });
}
showNotes();





// Yeni not ekleme

document.querySelector("#btnNoteAdd").addEventListener("click", e => {
   tittleV= newTittle.value;
   textAreaV = newNoteArea.value;

    if (tittleV.trim()==="") {

        const info1 = document.getElementById("alertplease1");
        info1.style.display = "block";

    }
    else if (textAreaV.trim()==="" || newNoteArea.value===" ") {

        info2.style.display = "block";
        info1.style.display = "none";
    }
    else {

        
     

        info2.style.display = "none";

        e.preventDefault();

        let textdeneme = newNoteArea.value;
        let cleanedText2 = textdeneme.replace(/\s+/g, ' ');

        newNoteArea.value = cleanedText2;

        let noteTittle = newTittle.value,
            noteTextArea = newNoteArea.value;

        if (noteTittle || noteTextArea) {

            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}.${addLeadingZero(currentDate.getMonth() + 1)}.${addLeadingZero(currentDate.getFullYear())}  ${addLeadingZero(currentDate.getHours())}:${addLeadingZero(currentDate.getMinutes())}`;

            function addLeadingZero(number) {
                return number < 10 ? `0${number}` : number;
            }

            let noteInfo = {
                tittle: noteTittle,
                textarea: noteTextArea,
                dates: formattedDate,
            };

            notes.push(noteInfo)

            localStorage.setItem("notes", JSON.stringify(notes))

            showNotes();

            overlay.style.display = "block";
            successadd.style.display = 'block';
            setTimeout(() => {
                successadd.style.bottom = '40%';
                successadd.style.opacity = '1';
            }, 1);

            okaybtn.addEventListener("click", () => {
                successadd.style.display = "none";
                successadd.style.bottom = '35%';
                
                noteAddPannel.style.display = "none";
                menuPannel.style.display = "block";
                newTittle.value = "";
                newNoteArea.value = "";
                info1.style.display = "none";
                info2.style.display = "none"
                Denetim();
                overlay.style.display = "none";
            })
            


        }
    }

});



// Seçili Notu silme işlemi

function deleteNote(noteId) {
   

    
   
        const confirmation = confirm("Bu notu silmek istediğinize emin misiniz?");
        
        if (confirmation) {

          notes.splice(noteId, 1);
            localStorage.setItem("notes", JSON.stringify(notes));
            showNotes();
            Denetim();
        } else {
            
            console.log("Silme işlemi iptal edildi.");
        }
 }
    
    
    
    
    
    






// Seçilen notu göster

function selectionNote(noteId, dates, tittle, textarea) {


    const shownotediv = document.getElementById("shownotediv");
    const currentlyTittle = document.getElementById("currentlyTittle");
    const currentlyDate = document.getElementById("currentlyDate");
    const currentlyTextarea = document.getElementById("currentlyTextarea");
    const NoteClose = document.getElementById("NoteClose");

    menuPannel.style.display = "none";
    shownotediv.style.display = "grid";


    currentlyTittle.textContent = `${tittle}`;
    currentlyDate.textContent = `${dates}`;
    currentlyTextarea.textContent = `${textarea}`;

    NoteClose.addEventListener("click", () => {
        shownotediv.style.display = "none";
        menuPannel.style.display = "grid";
    })


}



// Notu Güncelle


function updateNote(noteId, dates, tittle, textarea) {

    noteEdit.style.display = "grid";
    menuPannel.style.display = "none";


    updateTitle.focus();
    updateTitle.value = tittle;
    updateTextArea.value = textarea;

    cancelNewNote.addEventListener("click", () => {
        updateTitle.value = "";
        updateTextArea.value = "";
        noteEdit.style.display = "none";
        menuPannel.style.display = "block";
        pleaseUpdateTextAreaAlert.style.display="none";
        pleaseUpdateTittleAlert.style.display="none";
    })

    saveNewNote.addEventListener("click", () => {

        
       

         let updatedTittleV = updateTitle.value
         let updatedTextAreaV = updateTextArea.value



        if (updatedTittleV.trim() === "") {

            pleaseUpdateTittleAlert.style.display="block";
        }
        else if (updatedTextAreaV.trim()==="") {

            pleaseUpdateTextAreaAlert.style.display= "block" ;
        }

        else {

            

            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}.${addLeadingZero(currentDate.getMonth() + 1)}.${addLeadingZero(currentDate.getFullYear())}  ${addLeadingZero(currentDate.getHours())}:${addLeadingZero(currentDate.getMinutes())}`;

            function addLeadingZero(number) {
                return number < 10 ? `0${number}` : number;
            }

            let noteAreaV = updatedTextAreaV;
            let cleanedText3 = noteAreaV.replace(/\s+/g, ' ');
    
            newNoteArea.value = cleanedText3;


            let noteInfo = {
                tittle: updateTitle.value,
                textarea: newNoteArea.value,
                dates: formattedDate,
            };

            if (noteId >= 0 && noteId < notes.length) {
                notes[noteId] = noteInfo;
                localStorage.setItem("notes", JSON.stringify(notes))
                showNotes();
                

                updatedAlert.style.display = 'block';

                setTimeout(() => {
                    updatedAlert.style.bottom = '40%';
                    updatedAlert.style.opacity = '1';
                }, 1);

                overlay.style.display = "block";
                updatesuccessbtn.addEventListener("click", () => {
                    updatedAlert.style.display = "none";
                    updatedAlert.style.bottom = '35%';
                    overlay.style.display = "none";
        
                    noteEdit.style.display = "none";
                    menuPannel.style.display = "block";
                    updateTitle.value = "";
                    updateTextArea.value = "";
                    pleaseUpdateTextAreaAlert.style.display = "none";
                    pleaseUpdateTittleAlert.style.display = "none";
                })

               

                noteId="";
            }


        }
    })
    Denetim();
}



// Bütün notları sil.

clearbutton.addEventListener("click", verileriSil)



function verileriSil() {
   
    const thereIsnoNoteAlert = document.getElementById("thereIsnoNoteAlert");
    const notenull = document.getElementById("notenull");
    overlay.style.display = "block";
    
    if(notes.length===0){
        
        thereIsnoNoteAlert.style.display = 'flex';
        

                setTimeout(() => {
                    thereIsnoNoteAlert.style.bottom = '40%';
                    thereIsnoNoteAlert.style.opacity = '1';
                }, 1);

        notenull.addEventListener("click",()=>{
            thereIsnoNoteAlert.style.bottom = '35%';
                    thereIsnoNoteAlert.style.display="none";
                    overlay.style.display = "none";
        })
        
    }
    else{
        overlay.style.display = "block";
        infodiv1.style.display = "grid";

        btnNo.addEventListener("click", () => {
            infodiv1.style.display = "none";
            overlay.style.display = "none";
          
        })
    
        btnYes.addEventListener("click", () => {
            localStorage.clear();
            notes.length = 0;
            notelist.innerHTML = ``;
            infodiv1.style.display = "none";
            overlay.style.display = "none";
            Denetim();
        })
    }

    

    

}




function checkScreenWidth() {
    if (window.matchMedia("(min-width: 710px) and (max-width: 4000px)").matches) {
       
       
    
        const kaydirDiv = document.getElementById("kaydirDiv");
        const appname = document.getElementById("appname");
        let isToggle = true; // Başlangıçta toggle kapalı
        
        showAllNotes.addEventListener("click", () => {
          
            if (isToggle) {
               
                appname.style.opacity = 0;
                appname.style.transform = "translateY(-60%)"; 
                setTimeout(() => {
                  appname.style.display = "none"; // Div'i gizle
                  showlistbutton.innerHTML=`<span class="material-symbols-outlined"
                  id="iconlist">text_snippet</span>Notları Gizle`
                }, 500); 
              
                setTimeout(() => {
                  
                  menuPannel.style.height="600px"
                 menuPannel.style.border="3px solid rgba(74, 74, 74, 0.841)"; 
               menuPannel.style.boxShadow="0px 0px 30px 3px rgba(175, 175, 175, 0.673)";
                 showAllNotes.style.width="200px";
                 newNoteAdd.style.display="flex";
                 clearbutton.style.display="flex";
                 menuPannel.style.backgroundColor="#fff";
                 menuPannel.style.backgroundImage="#fff";
         
                 
                }, 510); 
              
                setTimeout(() => {
                  const hr1 = document.getElementById("hr1");
                  hr1.style.display="block";
                  hr1.style.opacity=1;
                  notelist.style.height="420px"
                  notelist.style.opacity = 1;
                  newNoteAdd.style.opacity=1;
                 clearbutton.style.opacity=1;
                }, 1300); 
               
              } else {
               
                appname.style.opacity = 1;
                appname.style.transform = "translateY(0)"; 
                setTimeout(() => {
                  appname.style.display = "grid"; 
                  showlistbutton.innerHTML=`<span class="material-symbols-outlined"
                  id="iconlist">text_snippet</span>Notları göster`
                }, 500); 
              
                setTimeout(() => {
                  
                  menuPannel.style.height="0"
                 
               
                 showAllNotes.style.width="260px";
                 newNoteAdd.style.display="none";
                 clearbutton.style.display="none";
                 menuPannel.style.border=0; 
                 menuPannel.style.boxShadow="";
                 
                }, 500); 
              
                setTimeout(() => {
        
                  hr1.style.display="none";
                  hr1.style.opacity=0;
                  notelist.style.height="0"
                  notelist.style.opacity = 0;
                  newNoteAdd.style.opacity=0;
                 clearbutton.style.opacity=0;
                }, 500); 
                
              }
              isToggle = !isToggle; 
            });
           
            


    }

    
}


checkScreenWidth();



// Ek Özellikler

//Animasyonlar


    
    
    



// Menü arka plan denetimi


function Denetim(){


    appname.style.top= "-10%"; 
    appname.style.opacity=1


    if(notes.length===0 || notes.length===null){
        notelist.style.backgroundImage= "url(img/aktifnotyok.png)";
    }
    else{
        notelist.style.backgroundImage= "none";
    }

}

Denetim();