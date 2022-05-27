
$(document).ready(function () {

    $(document).mouseup(function(event){
        event.preventDefault()
        console.log(event.which)
    })
   
    

    // console.log('CLASSES---')
    // class human {
    //     constructor(gender, name, age, eyecolor, favfood) {
    //         console.log('you have created a human named ' + name)
    //         this.name = name;
    //         this.age = age;
    //         this.eyecolor = eyecolor;
    //         this.favfood = favfood;
    //         this.gender = gender;
    //     }
    //     sex() {
    //         console.log(`${this.name} is a ${this.gender}`)
    //     }

    //     agenum() {
    //         console.log(`${this.name} is ${this.age} yrs old`)
    //     }
    //     corneacolor() {
    //         console.log(`${this.name} has ${this.eyecolor} colored eyes`)
    //     }
    //     eat() {
    //         console.log(`${this.name} loves to eat ${this.favfood} `)
    //     }

    // }




    // class male extends human{
    //     constructor( gender,name, age, eyecolor, favfood,flirtRate){
    //     super(gender, name, age, eyecolor, favfood)
    //     this.flirtRate= flirtRate

    // }
    //     flirting(){
    //         if(this.flirtRate <= 40){
    //             console.log('ew')
    //         }else{
    //             console.log('wow')
    //         }
    //     }

    // }
    // const austin = new male("male","austin", 20, "dark brown", "chicken",70)
    // austin.flirting()


    // var el = document.getElementById('btn')
    console.log('drop down menu----')
    $('[data-trigger="dropdown"]').mouseenter( function () {
        var submenu = $(this).parent().find('.submenu')
        submenu.fadeIn(400)
        $('#trigger').mouseleave(function () {
            submenu.fadeOut(400)
        })


    })
    console.log('append ,prepend ,replace----')
    $('#append, #prepend, #replace').on('click',function(e){
            //.current target?
        //attr(gets attribute of a html element)
        var el=$(e.currentTarget)
        var action=el.attr('id')
        var content= $(".text").val()
        if(action=='append'){
            console.log('appending....')
            $(".article-container").append(content)
        }else if(action=='prepend'){
            console.log('prepending....')
            $(".article-container").prepend(content)
        }else if(action=="replace"){
            console.log('replacing...')
            $(".article-container").html(content)
        }
        $(".text").val('')
    
    })
//console.log('preventDefault-------------')//prevents the default behaviour of any html element
//traget the doccument 
//finding elements within other elements in jquery
    $('.article-container').find('p').addClass('dexter')//gives all the p tag in the section tag a 'dexter' class
    //finding the first and last elements 
    console.log($('.submenu a').first().text())
    console.log($('.submenu a').last().text())

    $('p:contains("black")').html('this had lorem in it')//this containes attribute found the paragragh that had the word 'black in it and replaced it
    console.log($('.text').is('textarea'))//the IS attr checks the type of tag that a class or id has
    //each method wwhich loops over an array of jquery objects
    $("p").each(function(){
        console.log($(this).text())
    })
    //css in javascipt & jquery
    $('#append').css({
        color:'blue',
        padding:'10px',
        backgroundColor:'transparent',
        border:'none'
    })












































})//document.ready function
