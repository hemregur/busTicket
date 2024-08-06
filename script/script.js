
let busContainerDom = document.querySelector(".busContainer"),
    ticketDOm = document.querySelector(".ticket"),
    ticketPriceDom = document.querySelector(".ticketPrice"),
    selectGenderDom = document.querySelector(".selectGender"),
    genderManDom = document.querySelector(".genderMan"),
    genderWomanDom = document.querySelector(".genderWoman"),
    seatSelected=0,
    seatAllDom=[];

let selected= 0,
    ticketPrice = 560,
    counter=0,
    carpan=4;


 
 
document.addEventListener("click", (x=>{ 
    seatAllDom = document.querySelectorAll(".seat");
    if(x.target.classList.contains("seat")){ // Cinsiyet seçin kutusunu aktif eder.
        seatSelected=x.target.dataset.no;
        console.log("Seçilen Koltuk: "+seatSelected)
        opanGenderPop(x); 
    }
    
    if(x.target.classList.contains("genderMan") || x.target.classList.contains("genderWoman")){
        addSeat(x);
    }
})) 
 
let opanGenderPop = (x) => {
    seatAllDom.forEach(x=>{
        x.classList.remove("seatSelected")
    })
    if(x.target.classList.contains("seatMan") || x.target.classList.contains("seatWoman")){
        alert("Seçtiğiniz koltuk dolu. Lütfen, farklı bir koltuk seçiniz.");
        selectGenderDom.classList.remove("selectGenderActive");
    }else{
        x.target.classList.toggle("seatSelected");
        genderManDom.classList.remove("genderHidden");
        genderWomanDom.classList.remove("genderHidden");
        selectGenderDom.classList.add("selectGenderActive");
        selectGenderDom.style.left= x.clientX-70 + "px";
        selectGenderDom.style.top= x.clientY-100 + "px";
        let dataNo = x.target.dataset.no;

        /* Yan koltuk cinsiyet tespiti */
        if((dataNo % 4) == 0 ||  dataNo == 30){ 
            if(seatAllDom[dataNo-2].dataset.gender == "man"){
                genderWomanDom.classList.add("genderHidden");
            }else if(seatAllDom[dataNo-2].dataset.gender == "woman"){
                genderManDom.classList.add("genderHidden");
            } 
        }else if((dataNo % 2) == 1 ){  
            if(seatAllDom[dataNo].dataset.gender == "man"){
                genderWomanDom.classList.add("genderHidden");
            }else if(seatAllDom[dataNo].dataset.gender == "woman"){
                genderManDom.classList.add("genderHidden");
            }
            
        }else{ 
            if(seatAllDom[dataNo-2].dataset.gender == "man"){
                genderWomanDom.classList.add("genderHidden");
            }else if(seatAllDom[dataNo-2].dataset.gender == "woman"){
                genderManDom.classList.add("genderHidden");
            } 
        } 
    }
}

let addSeat = (x) => {
    selected++;
    if(selected>0){ 
        if(x.target.classList.contains("genderMan")){
            selectGenderDom.classList.remove("selectGenderActive");
            seatAllDom[seatSelected-1].classList.remove("seatSelected");
            seatAllDom[seatSelected-1].classList.add("seatMan");
            ticketSeat(seatSelected,"seatMan")
        }else if(x.target.classList.contains("genderWoman")){
            selectGenderDom.classList.remove("selectGenderActive");
            seatAllDom[seatSelected-1].classList.remove("seatSelected");
            seatAllDom[seatSelected-1].classList.add("seatWoman");
            ticketSeat(seatSelected,"seatWoman")
        }
        ticketDOm.classList.add("ticketActive");
        ticketPriceDom.innerHTML=`${selected} x ${ticketPrice} = ${selected*ticketPrice} ₺`;
    }else{
        ticketDOm.classList.remove("ticketActive");
    }

}

let ticketSeat = (num,gender)=>{
    let ticketSeatDom = document.querySelector(".selectedSeat ul");
    ticketSeatDom.innerHTML+=`<li class="seat ${gender}">${num}</li>`;
}